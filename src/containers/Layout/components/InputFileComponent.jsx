import React, { useEffect, useState } from "react";
import { Col, FormGroup, FormText, Input, Label } from "reactstrap";
require("../../../public/styles.css");
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

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
      <Col sm={2}>
        <div className="mr-2" style={styles}>
          <label className="custom-file-upload w-100">
            <input
              type="file"
              id="file1"
              onChange={onChangeValue}
              accept="image/*"
              multiple
            />
            Choose
          </label>
        </div>
        <FormText>{props?.caption}</FormText>
        {value && <FormText>{value.length} File(s) Selected</FormText>}
      </Col>
    </FormGroup>
  );

  return Index;
}

export default InputFileComponent;
