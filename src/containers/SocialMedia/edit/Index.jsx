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
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: true,
    message: "",
    status: "",
  });
  const { id } = useParams();

  const makePayload = () => {
    let payload = JSON.stringify({
      icon: icon,
      link: link,
    });

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    await API.put(`social-media/${id}/update`, payload).then((result) => {
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
    API.get(`social-media/${id}`).then((result) => {
      if (result.message === "success") {
        setLink(result.data[0].link);
        setIcon(result.data[0].icon);
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
                <h5 className="bold-text">Edit Data Social Media</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Icon Name</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Icon Name"
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Link Social Media</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Link"
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
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
                onClick={makePayload}
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
