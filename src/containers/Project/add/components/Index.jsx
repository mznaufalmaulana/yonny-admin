import React, { useState } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from "reactstrap";
import InputComponent from "../../../Layout/components/InputComponent";
import MultipleSelectComponent from "../../../Layout/components/MultipleSelectComponent";
import InputFileComponent from "../../../Layout/components/InputFileComponent";

function Index(props) {
  const [listCategory, setListCategory] = useState([
    { value: 1, label: "category 1" },
    { value: 2, label: "category 2" },
    { value: 3, label: "category 3" },
    { value: 4, label: "category 4" },
  ]);
  const [category, setCategory] = useState("");

  function onChangeListCategory(val) {
    setListCategory(val);
  }

  function onChangeCategory(val) {
    setCategory(val);
  }

  function save() {
    console.log(`${listCategory} === ${category}`);
  }

  const Index = (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Add Data Project</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form>
            <InputComponent
              label="Project Name"
              type="text"
              placeholder="Input the Category Name"
              onChangeValue={(val) => onChangeCategory(val)}
            />

            <InputComponent
              label="Description"
              type="textarea"
              placeholder="Input the Description of Product"
              onChangeValue={(val) => onChangeCategory(val)}
            />

            <InputFileComponent
              label="Photo Project"
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
