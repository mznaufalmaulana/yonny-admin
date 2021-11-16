import React from "react";
import { Col, Container, Row } from "reactstrap";
import IndexList from "./components/Index";

const Type = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Type</h3>
      </Col>
    </Row>
    <Row>
      <IndexList />
    </Row>
  </Container>
);

export default Type;
