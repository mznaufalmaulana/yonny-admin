import React, { useState, useEffect } from "react";
import { Button, Col, Form, FormGroup, Label, Row, Spinner } from "reactstrap";
import API from "../../../../services";
import SnackbarComponent from "../../../Layout/components/SnackbarComponent";
import { useParams } from "react-router";
import { render } from "@testing-library/react";

require("../../../../public/styles.css");
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataFile, setDataFile] = useState([]);
  const [files, setFiles] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getPhoto();
  }, []);

  const getPhoto = () => {
    API.get(`project/${id}/project-photo-list`).then((result) => {
      if (result.message === "success") {
        let photo = [];
        let length = result.data.length >= 3 ? result.data.length : 3;
        for (let i = 0; i < length; i++) {
          if (result.data[i]) {
            photo.push({
              id: result.data[i].id,
              photo_name: `${API.urlStorage}${result.data[i].photo_name}`,
            });
          } else {
            photo.push({
              id: `x${i}`,
              photo_name: "",
            });
          }
        }
        setDataFile(photo);
      }
    });
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

  const onChangeFiles = (e, id) => {
    var idx = files.findIndex((x) => x.id === id);
    if (idx > -1) {
      let updateValue = files[idx];
      updateValue["photo_name"] = e.target.files[0];

      setFiles([...files.slice(0, idx), updateValue, ...files.slice(idx + 1)]);
    } else {
      let file = {
        id: id,
        photo_name: e.target.files[0],
      };
      setFiles([...files, file]);
    }

    idx = dataFile.findIndex((x) => x.id === id);
    let updateValue = dataFile[idx];
    updateValue["photo_name"] = URL.createObjectURL(e.target.files[0]);

    setDataFile([
      ...dataFile.slice(0, idx),
      updateValue,
      ...dataFile.slice(idx + 1),
    ]);
  };

  const uploadImage = async () => {
    try {
      let resp = "";
      for (let i = 0; i < files.length; i++) {
        let payload = new FormData();
        payload.append("photo", files[i].photo_name);
        if (files[i].id.indexOf("x") > -1) {
          resp = await API.uploadFile(
            `project/${id}/store-project-photo`,
            payload,
            "POST"
          );
        } else {
          resp = await API.uploadFile(
            `project/${files[i].id}/update-project-photo`,
            payload,
            "POST"
          );
        }
      }
      handleMessage(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = (id) => {
    let resp = API.deleteData(`project/${id}/delete-project-photo`);
    getPhoto();
    handleMessage(resp);
  };

  const form = (
    <Col md={12}>
      <SnackbarComponent
        openAlert={alert.open}
        message={alert.message}
        onHide={() => setAlert({ ...alert, open: false })}
        status={alert.status}
      />
      <Form id="form" className="mt-3">
        <FormGroup row>
          <Label sm={2}>Project Photo</Label>
          <Col sm={10}>
            <Row className="d-flex align-items-end">
              {/* {renderImage} */}
              {dataFile.map((item) => (
                <Col sm={4}>
                  <div>
                    <img
                      className="img-preview mb-2"
                      src={`${item.photo_name}`}
                      alt=""
                    />
                    <div className="d-flex justify-content-center">
                      <div className="mr-2" style={styles}>
                        <label className="custom-file-upload w-100">
                          <input
                            type="file"
                            id="file1"
                            onChange={(e) => onChangeFiles(e, item.id)}
                            accept="image/*"
                          />
                          {item.photo_name ? <>Edit</> : <>Add</>}
                        </label>
                      </div>
                      {item.photo_name && (
                        <a
                          href="#"
                          className="btn btn-danger text-white"
                          onClick={() => deleteImage(item.id)}
                        >
                          Remove
                        </a>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
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
            onClick={uploadImage}
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
    </Col>
  );

  return form;
}

export default Index;
