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
import makeAnimated from "react-select/animated";
import Select from "react-select";
import TextEditorTwo from "../../../shared/components/text-editor/TextEditor";
import FormData from "../../../containers/Product/edit/components/Data";
import ImageData from "../../../containers/Product/edit/components/Image";
import classnames from "classnames";

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const animatedComponents = makeAnimated();
  const [listCategory, setListCategory] = useState([]);
  const [listType, setListType] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { id } = useParams();

  useEffect(() => {
    API.get(`product-category/list`).then((result) => {
      if (result.message === "success") {
        let list = [];
        result.data.map((item) =>
          list.push({
            value: item.id,
            label: item.category_name,
          })
        );
        setListCategory(list);
      }
    });
    API.get(`product-type/list`).then((result) => {
      if (result.message === "success") {
        let list = [];
        result.data.map((item) =>
          list.push({
            value: item.id,
            label: item.type_name,
          })
        );
        setListType(list);
      }
    });
    API.get(`product/${id}`).then((result) => {
      if (result.message === "success") {
        setData(result.data[0]);
      }
    });
    console.log(data);
  }, []);

  const makePayload = () => {
    let cat = [];
    category.map((item) => cat.push(item.value));
    let payload = JSON.stringify({
      product_type_id: data.type_id,
      product_name: data.product_name,
      description: data.description,
      share_count: data.share_count,
      seen_count: data.seen_count,
      product_category_id: cat,
      is_active: 1,
    });

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    let resp = await API.put(`product/${id}/update`, payload);
    handleMessage(resp);
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
                <h5 className="bold-text">Edit Data Product</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
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
