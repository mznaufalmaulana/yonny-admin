import React, { useEffect, useState } from "react";
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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [valid, setValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

  useEffect(() => {
    if (pass === repeatPass) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [pass, repeatPass]);

  function save() {
    let body = JSON.stringify({
      username: username,
      email: email,
      password: pass,
      password_confirmation: repeatPass,
    });
    setIsLoading(true);
    API.post(`user/store`, body).then((result) => {
      if (result.message === "success") {
        setIsLoading(false);
        setAlert({ open: true, message: "Data Saved", status: "success" });
        document.getElementById("form").reset();
      } else {
        setIsLoading(false);
        setAlert({
          open: true,
          message: result.data.password ? result.data.password : result.message,
          status: "error",
        });
      }
    });
  }

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
                <h5 className="bold-text">Add Data User</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <InputComponent
              label="Username"
              type="text"
              placeholder="Input the Username"
              onChangeValue={(val) => setUsername(val)}
            />

            <InputComponent
              label="Email"
              type="email"
              placeholder="Input the Email"
              onChangeValue={(val) => setEmail(val)}
            />

            <InputComponent
              label="Password"
              type="password"
              placeholder="Input the Password"
              onChangeValue={(val) => setPass(val)}
            />

            <InputComponent
              label="Repeat Password"
              type="password"
              placeholder="Repeat Password"
              onChangeValue={(val) => setRepeatPass(val)}
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
