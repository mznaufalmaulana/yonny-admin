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
        <h3 className="page-title">Type</h3>
      </Col>
    </Row>
    <Row>
      {/* <Index /> */}
      <Route exact path="/master/type/edit/:id" component={Edit} />
      <Route exact path="/master/type/add" component={Add} />
      <Route exact path="/master/type" component={List} />
    </Row>
  </Container>
);

export default MasterType;
