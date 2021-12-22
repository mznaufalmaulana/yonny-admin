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
import MultipleSelectComponent from "../../Layout/components/MultipleSelectComponent";
import InputFileComponent from "../../Layout/components/InputFileComponent";
import TextEditorComponent from "../../Layout/components/TextEditorComponent";
import SelectComponent from "../../Layout/components/SelectComponent";
import API from "../../../services";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";
import axios from "axios";
import FileBase64 from "react-file-base64";

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState("");
  const [projectName, setProjectName] = useState("");
  const [desc, setDesc] = useState("");

  const makePayload = () => {
    let payload = new FormData();
    payload.append("project_name", projectName);
    payload.append("description", desc);
    payload.append("project_photo[]", "");
    payload.append("is_active", 1);

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    let resp = await API.uploadFile(`project/store`, payload, "POST");
    uploadImage(resp.data.project_id);
  };

  const uploadImage = async (id) => {
    try {
      let resp = "";
      for (let i = 0; i < files.length; i++) {
        let payload = new FormData();
        payload.append("photo", files[i]);
        resp = await API.uploadFile(
          `project/${id}/store-project-photo`,
          payload,
          "POST"
        );
      }
      handleMessage(resp);
    } catch (error) {
      console.log(error);
    }
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
                <h5 className="bold-text">Add Data Project</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <Form id="form">
            <InputComponent
              label="Project Name"
              type="text"
              placeholder="Input the Project Name"
              onChangeValue={(val) => setProjectName(val)}
            />

            <TextEditorComponent
              label="Description"
              onChangeValue={(val) => setDesc(val)}
            />

            <InputFileComponent
              label="Photo Project"
              onChangeValue={(val) => setFiles(val)}
              caption="Choose Max. 3 Files"
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
