import React from "react";
import { Col, Container, Row } from "reactstrap";
import ExampleCard from "./components/ExampleCard";

const Home = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Dashboard</h3>
      </Col>
    </Row>
    <Row>
      <ExampleCard />
    </Row>
  </Container>
);

export default Home;
