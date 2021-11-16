import React from "react";
import { Col, Container, Row } from "reactstrap";
import IndexList from "./components/Index";

const MasterProduct = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Master Product</h3>
      </Col>
    </Row>
    <Row>
      <IndexList />
    </Row>
  </Container>
);

export default MasterProduct;
