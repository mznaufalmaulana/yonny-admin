import React from "react";
import { Route } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Add from "./add/Index";
import Edit from "./edit/Index";
import List from "./list/Index";

const MasterType = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Region</h3>
      </Col>
    </Row>
    <Row>
      <Route exact path="/master/region/edit/:id" component={Edit} />
      <Route exact path="/master/region/add" component={Add} />
      <Route exact path="/master/region" component={List} />
    </Row>
  </Container>
);

export default MasterType;