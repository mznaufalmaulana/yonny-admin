import React, { useEffect, useState } from "react";
import { Col, FormGroup, FormText, Input, Label } from "reactstrap";

function InputFileComponent(props) {
  const [value, setValue] = useState("");
  useEffect(() => props.onChangeValue(value));

  function onChangeValue(e) {
    setValue(e.target.value);
    props.onChangeValue(e.target.value);
  }
  const Index = (
    <FormGroup row>
      <Label sm={2}>{props.label}</Label>
      <Col sm={10}>
        <Input id="exampleFile" name="file" type="file" multiple />
        <FormText>Choose File Product</FormText>
      </Col>
    </FormGroup>
  );

  return Index;
}

export default InputFileComponent;
