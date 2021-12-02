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
        <h3 className="page-title">Social Media</h3>
      </Col>
    </Row>
    <Row>
      <Route exact path="/social-media/edit/:id" component={Edit} />
      <Route exact path="/social-media/add" component={Add} />
      <Route exact path="/social-media" component={List} />
    </Row>
  </Container>
);

export default Index;
