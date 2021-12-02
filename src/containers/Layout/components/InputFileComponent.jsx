import React, { useEffect, useState } from "react";
import { Col, FormGroup, FormText, Input, Label } from "reactstrap";

function InputFileComponent(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    props.onChangeValue(value);
  }, [value]);

  function onChangeValue(e) {
    console.log(e);
    setValue(e.target.files);
  }
  const Index = (
    <FormGroup row>
      <Label sm={2}>{props.label}</Label>
      <Col sm={10}>
        <Input
          id="exampleFile"
          name="product_photo"
          type="file"
          onChange={onChangeValue}
          multiple
        />
        <FormText>Choose File Product</FormText>
      </Col>
    </FormGroup>
  );

  return Index;
}

export default InputFileComponent;
