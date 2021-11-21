import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

function Edit(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [listParent, setListParent] = useState([]);
  const [categoryParent, setCategoryParent] = useState("");
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  function onChangeCategoryParent(val) {
    setCategoryParent(val);
  }

  function onChangeCategory(val) {
    setCategory(val);
  }

  function save() {
    let payload = JSON.stringify({
      category_name: category,
      category_parent: categoryParent,
    });
    setIsLoading(true);
    API.put(`product-category/${id}/update`, payload).then((result) => {
      if (result.message === "success") {
        setIsLoading(false);
        setAlert(true);
        setMessage("Data Saved");
        document.getElementById("form").reset();
      } else {
        setIsLoading(false);
        setAlert(true);
        setMessage(result.message);
      }
    });
  }

  useEffect(() => {
    API.get(`product-category/${id}`).then((result) => {
      if (result.message === "success") {
        setCategory(result.data.category_name);
        setCategoryParent(result.data.category_parent);
      }
    });
  }, []);

  useEffect(() => {
    API.get(`product-category/list`).then((result) => {
      if (result.message === "success") {
        setListParent(result.data);
      }
    });
  }, []);

  const Index = (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Edit Data Master Product</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <SnackbarComponent
            openAlert={alert}
            message={message}
            onHide={() => setAlert(false)}
          />
          <Form id="form">
            <FormGroup row>
              <Label sm={2}>Category Parent</Label>
              <Col sm={10}>
                <Input
                  name="category_parent"
                  type="select"
                  defaultValue={categoryParent}
                  onChange={(e) => {
                    setCategoryParent(e.target.value);
                  }}
                >
                  <option value={0}>Nothing Parent Category</option>
                  {listParent.map((data, index) => (
                    <option value={data.id}>{data.category_name}</option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Category Name</Label>
              <Col sm={10}>
                <Input
                  name="category_name"
                  placeholder="Input the Category Name"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                onClick={save}
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

export default Edit;
