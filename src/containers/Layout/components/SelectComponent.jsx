import React, { useState, useEffect } from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";

function SelectComponent(props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    props.onChangeValue(value);
  }, [value]);

  function onChangeValue(e) {
    setValue(e.target.value);
  }

  const Index = (
    <FormGroup row>
      <Label sm={2}>{props.label}</Label>
      <Col sm={10}>
        <Input
          name="select"
          type="select"
          defaultValue={0}
          onChange={(e) => onChangeValue(e)}
        >
          <option value={0}>{props.placeholder}</option>
          {props.data.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </Input>
      </Col>
    </FormGroup>
  );

  return Index;
}
export default SelectComponent;
