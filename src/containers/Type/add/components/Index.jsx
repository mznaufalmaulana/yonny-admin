import React, { useState } from "react";
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from "reactstrap";
import InputComponent from "../../../Layout/components/InputComponent";

function Index(props) {
  const [type, setType] = useState("");

  function onChangeType(val) {
    setType(val);
  }

  function save() {
    console.log(`${type}`);
  }

  const Index = (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Add Data Type</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <Form>
            <InputComponent
              label="Type Name"
              type="text"
              placeholder="Input the Type Name"
              onChangeValue={(val) => onChangeType(val)}
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
