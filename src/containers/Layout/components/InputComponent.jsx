import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";

function InputComponent(props) {
  const [value, setValue] = useState();
  useEffect(() => props.onChangeValue(value));

  function onChangeValue(e) {
    setValue(e.target.value);
    props.onChangeValue(e.target.value);
  }
  const Index = (
    <FormGroup row>
      <Label sm={2}>{props.label}</Label>
      <Col sm={10}>
        <Input
          name="email"
          placeholder={props.placeholder}
          type={props.type}
          onChange={(e) => onChangeValue(e)}
        />
      </Col>
    </FormGroup>
  );

  return Index;
}

export default InputComponent;
