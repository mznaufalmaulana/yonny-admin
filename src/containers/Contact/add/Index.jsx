import React, { useEffect, useState } from "react";
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
import InputComponent from "../../Layout/components/InputComponent";
import SelectComponent from "../../Layout/components/SelectComponent";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

function Index() {
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [listRegion, setListRegion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

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
    await API.post(`contact/store`, payload).then((result) => {
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
                <h5 className="bold-text">Add Data Contact</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <SelectComponent
              label="Type"
              placeholder={"Select"}
              data={listRegion}
              onChangeValue={(val) => setRegion(val)}
            />
            <InputComponent
              label="Address"
              type="textarea"
              placeholder="Input the Address"
              onChangeValue={(val) => setAddress(val)}
            />
            <InputComponent
              label="Phone"
              type="text"
              placeholder="Input the Phone"
              onChangeValue={(val) => setPhone(val)}
            />
            <InputComponent
              label="Email"
              type="email"
              placeholder="Input the Email"
              onChangeValue={(val) => setEmail(val)}
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
