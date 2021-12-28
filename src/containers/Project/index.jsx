import React from "react";
import { Route } from "react-router";
import { Col, Container, Row } from "reactstrap";
import List from "./list/index";
import Add from "./add/index";
import Edit from "./edit/Index";

const IndexProduct = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Project</h3>
      </Col>
    </Row>
    <Row>
      <Route exact path="/project/list" component={List} />
      <Route exact path="/project/add" component={Add} />
      <Route exact path="/project/edit/:id" component={Edit} />
    </Row>
  </Container>
);

export default IndexProduct;
