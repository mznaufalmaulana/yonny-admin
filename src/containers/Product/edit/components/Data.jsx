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
import API from "../../../../services";
import SnackbarComponent from "../../../Layout/components/SnackbarComponent";
import { useParams } from "react-router";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import TextEditorTwo from "../../../../shared/components/text-editor/TextEditor";

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
  const { id } = useParams();

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
    API.get(`product/${id}`).then((result) => {
      if (result.message === "success") {
        let list = [];
        result.data[0].product_category.map((item) =>
          list.push({
            value: item.id,
            label: item.category_name,
          })
        );
        setCategory(list);
        setData(result.data[0]);
      }
    });
    console.log(category);
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
    let resp = await API.post(`product/${id}/update`, payload);
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
      <Form id="form" className="mt-3">
        <FormGroup row>
          <Label sm={2}>Product Name</Label>
          <Col sm={10}>
            <Input
              name="text"
              placeholder="Input the Product's Name"
              type="text"
              value={data?.product_name}
              onChange={(e) =>
                setData({ ...data, product_name: e.target.value })
              }
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Description</Label>
          <Col sm={10}>
            {data.description && (
              <TextEditorTwo
                onChange={(val) => setData({ ...data, description: val })}
                initVal={data.description}
              />
            )}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Type</Label>
          <Col sm={10}>
            <Input
              name="select"
              type="select"
              value={data.type_id}
              onChange={(e) => setData({ ...data, type_id: e.target.value })}
            >
              <option value={0}>Select</option>
              {listType.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Category Product</Label>
          <Col sm={10}>
            <Select
              value={category}
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={(e) => setCategory(e)}
              options={listCategory}
              className="basic-multi-select"
              classNamePrefix="select"
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
    </Col>
  );

  return form;
}

export default Index;
