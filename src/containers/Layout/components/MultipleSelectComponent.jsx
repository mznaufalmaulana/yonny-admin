import React, { useState, useEffect } from "react";
import { Col, FormGroup, Label } from "reactstrap";
import makeAnimated from "react-select/animated";
import Select from "react-select";

function MultipleSelectComponent(props) {
  const animatedComponents = makeAnimated();
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
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={props.data}
        />
      </Col>
    </FormGroup>
  );

  return Index;
}
export default MultipleSelectComponent;
