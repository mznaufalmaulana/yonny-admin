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
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listRegion, setListRegion] = useState([]);
  const [alert, setAlert] = useState({
    open: true,
    message: "",
    status: "",
  });
  const { id } = useParams();

  useEffect(() => {
    API.get(`region/list`).then((result) => {
      if (result.message === "success") {
        let list = [];
        result.data.map((item) =>
          list.push({
            value: item.id,
            label: item.region,
          })
        );
        setListRegion(list);
      }
    });
    console.log(listRegion);
  }, []);

  const makePayload = () => {
    let payload = JSON.stringify({
      region_id: region,
      address: address,
      phone: phone,
      email: email,
    });

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    await API.put(`contact/${id}/update`, payload).then((result) => {
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
    API.get(`contact/${id}`).then((result) => {
      if (result.message === "success") {
        setRegion(result.data[0].region_id);
        setAddress(result.data[0].address);
        setEmail(result.data[0].email);
        setPhone(result.data[0].phone);
      }
    });
  }, []);

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
                <h5 className="bold-text">Edit Data Contact</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Type</Label>
              <Col sm={10}>
                <Input
                  name="select"
                  type="select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value={0}>Select</option>
                  {listRegion.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Address</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Address"
                  type="textarea"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Phone</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Email</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
