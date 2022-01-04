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
import SelectComponent from "../../Layout/components/SelectComponent";

function Index() {
  const [icon, setIcon] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });
  const optionIcon = [
    { value: "fa fa-facebook", label: "Facebook" },
    { value: "fa fa-instagram", label: "Instagram" },
    { value: "fa fa-twitter", label: "Twitter" },
  ];

  const makePayload = () => {
    let payload = JSON.stringify({
      icon: icon,
      link: link,
    });

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    await API.post(`social-media/store`, payload).then((result) => {
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
                <h5 className="bold-text">Add Data Social Media</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            {/* <InputComponent
              label="Icon Name"
              type="text"
              placeholder="Input the Icon Name"
              onChangeValue={(val) => setIcon(val)}
            /> */}
            <SelectComponent
              label="Icon Social Media"
              placeholder="Select Icon"
              data={optionIcon}
              onChangeValue={(val) => setIcon(val)}
            />
            <InputComponent
              label="Link Social Media"
              type="text"
              placeholder="Input the Social Media"
              onChangeValue={(val) => setLink(val)}
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
