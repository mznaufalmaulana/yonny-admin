import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import API from "../../../services";
import InputComponent from "../../Layout/components/InputComponent";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

function Index(props) {
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  function onChangeType(val) {
    setType(val);
  }

  function save() {
    let payload = JSON.stringify({ type_name: type });
    setIsLoading(true);
    API.put(`product-type/${id}/update`, payload).then((result) => {
      if (result.message === "success") {
        setIsLoading(false);
        setAlert(true);
        setMessage("Data Saved");
        document.getElementById("form").reset();
      } else {
        setIsLoading(false);
        setAlert(true);
        setMessage(result.message);
      }
    });
  }

  useEffect(() => {
    API.get(`product-type/${id}`).then((result) => {
      if (result.message === "success") {
        setType(result.data[0].type_name);
      }
    });
  }, []);

  const Index = (
    <Col md={12}>
      <SnackbarComponent
        openAlert={alert}
        message={message}
        onHide={() => setAlert(false)}
      />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Add Data Type</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Type Name</Label>
              <Col sm={10}>
                <Input
                  name="type_name"
                  placeholder="Input the Type Name"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Col>
            </FormGroup>
          </Form>
          <FormGroup row>
            <Col
              sm={{
                offset: 2,
                size: 10,
              }}
            >
              <Button
                className="btn btn-primary text-white"
                onClick={save}
                disabled={isLoading}
              >
                Save
                {isLoading ? (
                  <>
                    &nbsp; <Spinner size="sm" />{" "}
                  </>
                ) : null}
              </Button>
            </Col>
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  );

  return Index;
}

export default Index;
