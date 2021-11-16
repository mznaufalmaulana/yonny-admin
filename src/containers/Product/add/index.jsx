import React from "react";
import { Col, Container, Row } from "reactstrap";
import Index from "./components/Index";

const AddProduct = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Product</h3>
      </Col>
    </Row>
    <Row>
      <Index />
    </Row>
  </Container>
);

export default AddProduct;
