import React from "react";
import { Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Add from "./add/index";
import List from "./list/index";
import Edit from "./edit/Index";

const Index = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Category</h3>
      </Col>
    </Row>
    <Row>
      <Route exact path="/master/product/edit/:id" component={Edit} />
      <Route exact path="/master/product/add" component={Add} />
      <Route exact path="/master/product" component={List} />
    </Row>
  </Container>
);

export default Index;
