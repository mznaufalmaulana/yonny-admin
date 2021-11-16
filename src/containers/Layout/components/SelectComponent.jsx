import React, { useState, useEffect } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";

function SelectComponent(props) {
  const [value, setValue] = useState(0);
  useEffect(() => props.onChangeValue(value));

  function onChangeValue(e) {
    setValue(e.target.value);
  }

  const Index = (
    <FormGroup row>
      <Label sm={2}>{props.label}</Label>
      <Col sm={10}>
        <Input name="select" type="select" onChange={(e) => onChangeValue(e)}>
          <option value={0} disabled selected>
            {props.placeholder}
          </option>
          <option value={0}>Parent A</option>
          <option value={1}>Parent B</option>
          <option value={2}>Parent C</option>
        </Input>
      </Col>
    </FormGroup>
  );

  return Index;
}
export default SelectComponent;
