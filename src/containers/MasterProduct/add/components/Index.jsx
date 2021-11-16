import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Row,
  Spinner,
} from "reactstrap";
import API from "../../../../services";
import InputComponent from "../../../Layout/components/InputComponent";
import SelectComponent from "../../../Layout/components/SelectComponent";
import SnackbarComponent from "../../../Layout/components/SnackbarComponent";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryParent, setCategoryParent] = useState(0);
  const [category, setCategory] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  function onChangeCategoryParent(val) {
    setCategoryParent(val);
  }

  function onChangeCategory(val) {
    setCategory(val);
  }

  function save() {
    setIsLoading(true);
    let payload = new FormData({
      category_parent: categoryParent,
      category_name: category,
    });
    API.post(
      `product-category/store?category_parent=${categoryParent}&category_name=${category}`,
      payload
    ).then((result) => {
      if (result.message === "success") {
        setIsLoading(false);
        setAlert(true);
        setMessage("Data Saved");
        document.getElementById("form").reset();
      } else {
        setIsLoading(false);
        setAlert(true);
        setMessage("Data Saved");
      }
    });
  }

  const Index = (
    <Col md={12}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Add Data Master Product</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
          </Row>
          <SnackbarComponent
            openAlert={alert}
            message={message}
            onHide={() => setAlert(false)}
          />
          <Form id="form">
            <SelectComponent
              label="Category Parent"
              type="text"
              placeholder="Input the Category Parent"
              onChangeValue={(val) => onChangeCategoryParent(val)}
            />
            <InputComponent
              label="Category Name"
              type="text"
              placeholder="Input the Category Name"
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
              <Button
                className="btn btn-primary text-white"
                onClick={save}
                // disabled={isLoading}
              >
                Save
                {isLoading ? (
                  <>
                    &nbsp; <Spinner size="sm" />{" "}
                  </>
                ) : null}
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
