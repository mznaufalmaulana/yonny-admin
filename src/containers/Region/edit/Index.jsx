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
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

function Index() {
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const save = async () => {
    let payload = JSON.stringify({ region: region });
    setIsLoading(true);
    await API.put(`region/${id}/update`, payload).then((result) => {
      handleMessage(result);
    });
  };

  const handleMessage = (result) => {
    if (result.message === "success") {
      setIsLoading(false);
      setAlert({ open: true, message: "Data was Added", status: "success" });
      document.getElementById("form").reset();
    } else {
      setIsLoading(false);
      setAlert({ open: true, message: result.message, status: "error" });
    }
  };

  useEffect(() => {
    API.get(`region/${id}`).then((result) => {
      if (result.message === "success") {
        setRegion(result.data[0].region);
      }
    });
  }, []);

  const Index = (
    <Col md={12}>
      <SnackbarComponent
        openAlert={alert.open}
        message={alert.message}
        status={alert.status}
        onHide={() => setAlert(false)}
      />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Edit Data Region</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Type Name</Label>
              <Col sm={10}>
                <Input
                  name="region_name"
                  placeholder="Input the Region Name"
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
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
