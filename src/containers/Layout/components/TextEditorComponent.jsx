import React, { useEffect, useState } from "react";
import { Col, FormGroup, Label } from "reactstrap";
import TextEditorTwo from "../../../shared/components/text-editor/TextEditor";

function TextEditorComponent(props) {
  const [value, setValue] = useState();
  useEffect(() => props.onChangeValue(value), []);

  function onChangeValue(val) {
    setValue(val);
    props.onChangeValue(val);
  }
  const Index = (
    <FormGroup row>
      <Label sm={2}>{props.label}</Label>
      <Col sm={10}>
        <TextEditorTwo onChange={(val) => onChangeValue(val)} />
      </Col>
    </FormGroup>
  );

  return Index;
}

export default TextEditorComponent;
