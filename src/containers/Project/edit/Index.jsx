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
import makeAnimated from "react-select/animated";
import Select from "react-select";
import TextEditorTwo from "../../../shared/components/text-editor/TextEditor";

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const { id } = useParams();

  useEffect(() => {
    API.get(`project/${id}`).then((result) => {
      if (result.message === "success") {
        setData(result.data[0]);
      }
    });
    console.log(data);
  }, []);

  const makePayload = () => {
    let payload = JSON.stringify({
      project_name: data.project_name,
      description: data.description,
      share_count: data.share_count,
      seen_count: data.seen_count,
      is_active: 1,
    });

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    let resp = await API.put(`project/${id}/update`, payload);
    handleMessage(resp);
  };

  const handleMessage = (resp) => {
    console.log(resp);
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
                <h5 className="bold-text">Edit Data Project</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Project Name</Label>
              <Col sm={10}>
                <Input
                  name="text"
                  placeholder="Input the Product's Name"
                  type="text"
                  value={data?.project_name}
                  onChange={(e) =>
                    setData({ ...data, project_name: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Description</Label>
              <Col sm={10}>
                <TextEditorTwo
                  onChange={(val) => setData({ ...data, description: val })}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Share Count</Label>
              <Col sm={10}>
                <Input
                  name="text"
                  placeholder="Input the Share Count"
                  type="text"
                  value={data?.share_count}
                  onChange={(e) =>
                    setData({ ...data, product_name: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={2}>Seen Count</Label>
              <Col sm={10}>
                <Input
                  name="text"
                  placeholder="Input the Seen Count"
                  type="text"
                  value={data?.seen_count}
                  onChange={(e) =>
                    setData({ ...data, product_name: e.target.value })
                  }
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
