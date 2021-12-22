import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
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

  function onChangeType(val) {
    setType(val);
  }

  function save() {
    setIsLoading(true);
    API.post(`product-type/store?type_name=${type}`).then((result) => {
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
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <InputComponent
              label="Type Name"
              type="text"
              placeholder="Input the Type Name"
              onChangeValue={(val) => onChangeType(val)}
            />
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
