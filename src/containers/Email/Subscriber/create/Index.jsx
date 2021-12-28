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
import SelectComponent from "../../../Layout/components/SelectComponent";
import MultipleSelectComponent from "../../../Layout/components/MultipleSelectComponent";
import InputFileComponent from "../../../Layout/components/InputFileComponent";
import TextEditorComponent from "../../../Layout/components/TextEditorComponent";
import API from "../../../../services";
import SnackbarComponent from "../../../Layout/components/SnackbarComponent";

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [listEmail, setListEmail] = useState("");
  const [emails, setEmails] = useState("");
  const [desc, setDesc] = useState("");
  const [isPromo, setIsPromo] = useState("");
  const [promoId, setPromoId] = useState("");
  const [listPromo, setListPromo] = useState([]);
  const type = [
    { value: 1, label: "Blast Promo" },
    { value: 2, label: "Broadcast" },
  ];

  useEffect(() => {
    API.get(`email/list`).then((result) => {
      if (result.message === "success") {
        let list = [];
        result.data.map((item) =>
          list.push({
            value: item.id,
            label: item.email_address,
          })
        );
        setListEmail(list);
      }
    });
    API.get(`promo/list/all`).then((result) => {
      if (result.message === "success") {
        let list = [];
        result.data.map((item) =>
          list.push({
            value: item.id,
            label: item.link,
          })
        );
        setListPromo(list);
      }
    });
  }, []);

  const makePayload = () => {
    let email_id_list = [];
    emails.map((item) => email_id_list.push(item.value));
    let payload = JSON.stringify({
      promo_id: isPromo === "2" ? "" : promoId,
      is_promo: isPromo === "1" ? 1 : 0,
      broadcast_message: isPromo === "2" ? desc : "",
      email_id_list: email_id_list,
    });

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    let resp = await API.post(`email/broadcast`, payload);
    handleMessage(resp);
  };

  const handleMessage = (resp) => {
    if (resp.message === "success") {
      setIsLoading(false);
      setAlert({
        open: true,
        message: "Email was Sent",
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
                <h5 className="bold-text">Create Email</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form id="form">
            <MultipleSelectComponent
              label="To"
              data={listEmail}
              onChangeValue={(val) => setEmails(val)}
            />

            <SelectComponent
              label="Type"
              placeholder="Select Type"
              data={type}
              onChangeValue={(val) => setIsPromo(val)}
            />

            {isPromo === "2" && (
              <TextEditorComponent
                label="Message"
                onChangeValue={(val) => setDesc(val)}
              />
            )}

            {isPromo === "1" && (
              <SelectComponent
                label="Promo"
                placeholder="Select Promo"
                data={listPromo}
                onChangeValue={(val) => setPromoId(val)}
              />
            )}
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
