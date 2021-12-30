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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

function Index() {  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [alert, setAlert] = useState({
    open: true,
    message: "",
    status: "",
  });
  const labelInstgram = <FontAwesomeIcon icon={faInstagram}/>
  const optionIcon = [
    { value: 'fa fa-facebook', label: labelInstgram },
    { value: 'fa fa-instagram', label: 'fa fa-instagram' },
    { value: 'fa fa-twitter', label: 'fa fa-twitter' },
  ];
  const { id } = useParams();

  const makePayload = () => {
    let payload = JSON.stringify({
      icon: data.icon,
      link: data.link,
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
                <h5 className="bold-text">Edit Data Social Media</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Icon Social Media</Label>
              <Col sm={10}>
                <Input
                  name="select"
                  type="select"
                  value={data?.icon}
                  onChange={(e) =>
                    setData({...data, icon: e.target.value})
                  }
                >
                  <option value={-1} disabled>Select Icon</option>
                  {optionIcon.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}                  
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Link Social Media</Label>
              <Col sm={10}>
                <Input
                  placeholder="Input the Link"
                  type="text"
                  value={data?.link}
                  onChange={(e) => 
                    setData({...data, link: e.target.value})}
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
