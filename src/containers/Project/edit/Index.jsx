import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import API from "../../../services";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";
import { useParams } from "react-router";
import TextEditorTwo from "../../../shared/components/text-editor/TextEditor";
import FormData from "../../../containers/Project/edit/components/Data";
import ImageData from "../../../containers/Project/edit/components/Image";
import classnames from "classnames";

require("../../../public/styles.css");
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
  const [data, setData] = useState("");
  const [dataFile, setDataFile] = useState([]);
  const [files, setFiles] = useState([]);
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    API.get(`project/${id}`).then((result) => {
      if (result.message === "success") {
        setData(result.data[0]);
      }
    });
    API.get(`project/${id}/project-photo-list`).then((result) => {
      if (result.message === "success") {
        let photo = [];
        result.data.map((item) =>
          photo.push({
            id: item.id,
            photo_name: `${API.urlStorage}${item.photo_name}`,
          })
        );
        setDataFile(photo);
      }
      console.log(dataFile);
    });
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

    console.log(files);
  };

  const uploadImage = async () => {
    try {
      let resp = "";
      for (let i = 0; i < files.length; i++) {
        let payload = new FormData();
        payload.append("photo", files[i].photo_name);
        resp = await API.uploadFile(
          `project/${files[i].id}/update-project-photo`,
          payload,
          "POST"
        );
      }
      handleMessage(resp);
    } catch (error) {
      console.log(error);
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
          <div className="tabs">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => toggle("1")}
                >
                  Data
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => toggle("2")}
                >
                  Media
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <FormData />
            </TabPane>
            <TabPane tabId="2">
              <ImageData />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Col>
  );

  return form;
}

export default Index;
