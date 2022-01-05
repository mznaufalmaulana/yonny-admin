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
import API from "../../../../services";
import SnackbarComponent from "../../../Layout/components/SnackbarComponent";
import TextEditorComponent from "../../../Layout/components/TextEditorComponent";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [data, setData] = useState({
    emailAddress: "",
    message: "",
    product_id: "",
    photo_name: "",
  });
  const [message, setMessage] = useState("");
  const [messageReply, setMessageReply] = useState("");
  const [alert, setAlert] = useState({
    open: true,
    message: "",
    status: "",
  });
  const { id } = useParams();

  useEffect(() => {
    API.get(`email/message/${id}`).then((result) => {
      if (result.message === "success") {
        setEmailAddress(result.data[0].email_address);
        setMessage(result.data[0].message);
        setData({
          emailAddress: result.data[0].email_address,
          message: result.data[0].message,
          product_id: result.data[0].product_id,
          photo_name: result.data[0].photo_name,
        });
      }
    });
  }, []);

  const makePayload = () => {
    let payload = JSON.stringify({
      email_id: id,
      message: messageReply,
    });

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    await API.post(`email/send`, payload).then((result) => {
      handleMessage(result);
    });
  };

  const handleMessage = (result) => {
    if (result.message === "success") {
      setIsLoading(false);
      setAlert({ open: true, message: "Email was Sent", status: "success" });
      document.getElementById("form").reset();
    } else {
      setIsLoading(false);
      setAlert({ open: true, message: result.message, status: "error" });
    }
  };

  const Index = (
    <Col md={12}>
      <SnackbarComponent
        openAlert={alert.open}
        message={alert.message}
        status={alert.status}
        onHide={() => setAlert({ ...alert, open: false })}
      />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Reply Email</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>From</Label>
              <Col sm={10}>
                <p>{data.emailAddress}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Message</Label>
              <Col sm={10}>
                <p>{data.message}</p>
              </Col>
            </FormGroup>
            {data.product_id ? (
              <>
                <FormGroup row>
                  <Label sm={2}>Link Product</Label>
                  <Col sm={10}>
                    <a
                      href={`${API.urlStore}product/detail?product=${data.product_id}`}
                      target="_blank"
                    >{`${API.urlStore}product/detail?product=${data.product_id}`}</a>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Photo Product</Label>
                  <Col sm={10}>
                    <img
                      className="w-50 mb-2"
                      src={`${API.urlStorage}/${data.photo_name}`}
                      alt=""
                    />
                  </Col>
                </FormGroup>
              </>
            ) : null}
            <TextEditorComponent
              label="Reply"
              onChangeValue={(val) => setMessageReply(val)}
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
                onClick={makePayload}
                disabled={isLoading}
              >
                Send
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
