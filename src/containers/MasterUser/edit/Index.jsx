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

function Index(props) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });
  const { id } = useParams();

  function save() {
    let payload = JSON.stringify({
      email: data.email,
      password: pass,
      password_confirmation: repeatPass,
    });
    setIsLoading(true);
    API.put(`user/${id}/update`, payload).then((result) => {
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

  useEffect(() => {
    API.get(`user/${id}`).then((result) => {
      if (result.message === "success") {
        setData(result.data[0]);
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
                <h5 className="bold-text">Edit Data User</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Username</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Username"
                  type="text"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Email</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Email"
                  type="text"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Password</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Password"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Repeat Password</Label>
              <Col sm={10}>
                <Input
                  placeholder="Repeat Password"
                  type="password"
                  value={repeatPass}
                  onChange={(e) => setRepeatPass(e.target.value)}
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
