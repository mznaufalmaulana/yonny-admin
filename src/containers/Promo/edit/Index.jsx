import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router";

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [preview, setPreview] = useState();
  const { id } = useParams();
  const type = [
    { value: 0, label: "Non Headline" },
    { value: 1, label: "Headline" },
  ];

  useEffect(() => {
    API.get(`promo/${id}`).then((result) => {
      if (result.message === "success") {
        console.log(result);
        setData(result.data[0]);
      }
    });
    console.log(data);
  }, []);

  const makePayload = () => {
    console.log(data.photo_name);
    let payload = new FormData();
    payload.append("order", data.order);
    payload.append("link", data.link);
    payload.append("is_headline", data.is_headline);

    if (data.photo_name instanceof File) {
      payload.append("photo_name", data.photo_name);
    }

    // let payload = "";
    // if (data.photo_name instanceof File) {
    //   payload = JSON.stringify({
    //     link: data.link,
    //     order: data.order,
    //     is_headline: data.is_headline,
    //     photo_name: data.photo_name,
    //   });
    // } else {
    //   payload = JSON.stringify({
    //     link: data.link,
    //     order: data.order,
    //     is_headline: data.is_headline,
    //   });
    // }

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    let resp = await API.uploadFile(`promo/${id}/update`, payload, "POST");
    handleMessage(resp);
  };

  const handleMessage = (resp) => {
    console.log(resp);
    if (resp.message === "success") {
      setIsLoading(false);
      setAlert({
        open: true,
        message: "Data was Updated",
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

  const changeFile = (e) => {
    setData({ ...data, photo_name: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
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
                <h5 className="bold-text">Edit Data Project</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Order</Label>
              <Col sm={10}>
                <Input
                  name="text"
                  placeholder="Input the Order"
                  type="text"
                  value={data?.order}
                  onChange={(e) => setData({ ...data, order: e.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Link</Label>
              <Col sm={10}>
                <Input
                  name="text"
                  placeholder="Input the Link"
                  type="text"
                  value={data?.link}
                  onChange={(e) => setData({ ...data, link: e.target.value })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Type</Label>
              <Col sm={10}>
                <Input
                  name="select"
                  type="select"
                  value={data?.is_headline}
                  onChange={(e) =>
                    setData({ ...data, is_headline: e.target.value })
                  }
                >
                  <option value={-1}>Select Type</option>
                  {type.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Image</Label>
              <Col sm={10}>
                <img
                  className="w-50 mb-2"
                  src={
                    preview ? preview : `${API.urlStorage}${data?.photo_name}`
                  }
                  alt={data?.link}
                />
                <div>
                  <label className="custom-file-upload text-center">
                    <input
                      type="file"
                      id="file1"
                      onChange={(e) => changeFile(e)}
                      accept="image/*"
                    />
                    {data?.photo_name ? <>Edit</> : <>Add</>}
                  </label>
                </div>
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
