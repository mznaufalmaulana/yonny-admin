import React from "react";
import { Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Add from "./add/Index";
import Edit from "./edit/Index";
import List from "./list/Index";

const Index = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Master User</h3>
      </Col>
    </Row>
    <Row>
      <Route exact path="/master/user/edit/:id" component={Edit} />
      <Route exact path="/master/user/add" component={Add} />
      <Route exact path="/master/user" component={List} />
    </Row>
  </Container>
);

export default Index;
