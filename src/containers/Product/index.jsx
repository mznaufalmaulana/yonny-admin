import React from "react";
import { Route } from "react-router";
import { Col, Container, Row } from "reactstrap";
import List from "./list/Index";
import Add from "./add/Index";
import Edit from "./edit/Index";

const IndexProduct = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Product</h3>
      </Col>
    </Row>
    <Row>
      <Route exact path="/product/list" component={List} />
      <Route exact path="/product/add" component={Add} />
      <Route exact path="/product/edit/:id" component={Edit} />
    </Row>
  </Container>
);

export default IndexProduct;
