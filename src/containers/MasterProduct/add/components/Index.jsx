import React, { useState } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from "reactstrap";
import API from "../../../../services";
import InputComponent from "../../../Layout/components/InputComponent";
import SelectComponent from "../../../Layout/components/SelectComponent";

function Index(props) {
  const [categoryParent, setCategoryParent] = useState("");
  const [category, setCategory] = useState("");

  function onChangeCategoryParent(val) {
    setCategoryParent(val);
  }

  function onChangeCategory(val) {
    setCategory(val);
  }

  function save() {
    API.post("product/save").then((result) => {});
    console.log(`${categoryParent} === ${category}`);
  }

  const Index = (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Add Data Master Product</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form>
            <SelectComponent
              label="Category Parent"
              type="text"
              placeholder="Input the Category Parent"
              onChangeValue={(val) => onChangeCategoryParent(val)}
            />
            <InputComponent
              label="Category Name"
              type="text"
              placeholder="Input the Category Name"
              onChangeValue={(val) => onChangeCategory(val)}
            />
          </Form>
          <FormGroup row>
            <Col
              sm={{
                offset: 2,
                size: 10,
              }}
            >
              <Button className="btn btn-primary text-white" onClick={save}>
                Save
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
