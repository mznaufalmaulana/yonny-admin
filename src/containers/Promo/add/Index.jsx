import React, { useState, useEffect } from "react";
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
import InputComponent from "../../Layout/components/InputComponent";
import InputFileComponent from "../../Layout/components/InputFileComponent";
import SelectComponent from "../../Layout/components/SelectComponent";
import API from "../../../services";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [order, setOrder] = useState("");
  const [link, setLink] = useState("");
  const [isHeadline, setIsHeadline] = useState("");
  const type = [
    { value: 0, label: "Non Headline" },
    { value: 1, label: "Headline" },
  ];

  const makePayload = () => {
    let payload = new FormData();
    payload.append("order", order);
    payload.append("link", link);
    payload.append("photo_name", files[0]);
    payload.append("is_headline", isHeadline);

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    let resp = await API.uploadFile(`promo/store`, payload, "POST");
    handleMessage(resp);
  };

  const handleMessage = (resp) => {
    if (resp.message === "success") {
      setIsLoading(false);
      setAlert({
        open: true,
        message: "Data was Added",
        status: "success",
      });
    } else {
      setIsLoading(false);
      setAlert({
        open: true,
        message: resp.message,
        status: "error",
      });
    }
  };

  const form = (
    <Col md={12}>
      <SnackbarComponent
        openAlert={alert.open}
        message={alert.message}
        onHide={() => setAlert({ ...alert, open: false })}
        status={alert.status}
      />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Add Data Promo</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <InputComponent
              label="Order"
              type="text"
              placeholder="Input the Promo's Order"
              onChangeValue={(val) => setOrder(val)}
            />

            <InputComponent
              label="Link"
              type="text"
              placeholder="Input the Promo's Link"
              onChangeValue={(val) => setLink(val)}
            />

            <SelectComponent
              label="Type"
              placeholder="Select Type"
              data={type}
              onChangeValue={(val) => setIsHeadline(val)}
            />

            <InputFileComponent
              label="Photo Project"
              onChangeValue={(val) => setFiles(val)}
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
                {isLoading && (
                  <>
                    &nbsp; <Spinner size="sm" />{" "}
                  </>
                )}
              </Button>
            </Col>
          </FormGroup>
        </CardBody>
      </Card>
    </Col>
  );

  return form;
}

export default Index;
