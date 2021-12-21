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

function Index() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    status: "",
  });
  const [listCategory, setListCategory] = useState([]);
  const [listType, setListType] = useState([]);
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState("");
  const [productName, setProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    API.get(`product-category/list`).then((result) => {
      if (result.message === "success") {
        let list = [];
        result.data.map((item) =>
          list.push({
            value: item.id,
            label: `${
              item.category_parent ? item.category_parent + " - " : ""
            }${item.category_name}`,
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
  }, []);

  const makePayload = () => {
    let payload = new FormData();
    let cat = [];
    let file = [];
    category.map((item) => cat.push(item.value));
    payload.append("product_type_id", type);
    payload.append("product_name", productName);
    payload.append("description", desc);
    payload.append("product_category_id[]", cat);
    payload.append("product_photo[]", "");
    payload.append("is_active", 1);

    setIsLoading(true);
    save(payload);
  };

  const save = async (payload) => {
    let resp = await API.uploadFile(`product/store`, payload, "POST");
    uploadImage(resp.data.product_id);
  };

  const uploadImage = async (id) => {
    try {
      let resp = "";
      for (let i = 0; i < files.length; i++) {
        let payload = new FormData();
        payload.append("photo", files[i]);
        resp = await API.uploadFile(
          `product/${id}/store-product-photo`,
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
                <h5 className="bold-text">Add Data Product</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form id="form">
            <InputComponent
              label="Product Name"
              type="text"
              placeholder="Input the Category Name"
              onChangeValue={(val) => setProductName(val)}
            />

            <TextEditorComponent
              label="Description"
              onChangeValue={(val) => setDesc(val)}
            />

            <SelectComponent
              label="Type"
              placeholder={"Select Type of Product"}
              data={listType}
              onChangeValue={(val) => setType(val)}
            />

            <MultipleSelectComponent
              label="Category Product"
              data={listCategory}
              onChangeValue={(val) => setCategory(val)}
            />

            <InputFileComponent
              label="Photo Product"
              onChangeValue={(val) => setFiles(val)}
              caption="Choose Max. 5 Files"
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
