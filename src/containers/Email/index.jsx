import React from "react";
import { Route } from "react-router";
import { Col, Container, Row } from "reactstrap";
import List from "./Subscriber/list/Index";
import Create from "./Subscriber/create/Index";
import Edit from "./Subscriber/edit/Index";
import ChatList from "./Chat/list/Index";
import ChatDetail from "./Chat/detail/Index";

const IndexProduct = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Email</h3>
      </Col>
    </Row>
    <Row>
      <Route exact path="/email/list" component={List} />
      <Route exact path="/email/create" component={Create} />
      <Route exact path="/email/edit/:id" component={Edit} />
      <Route exact path="/email/chat/list" component={ChatList} />
      <Route exact path="/email/chat/detail/:id" component={ChatDetail} />
    </Row>
  </Container>
);

export default IndexProduct;
