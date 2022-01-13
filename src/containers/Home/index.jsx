import React from "react";
import { Col, Container, Row } from "reactstrap";
import ChartCategory from "./components/ChartCategory";
import TopTable from "./components/TopTable";

const Home = () => (
  <Container className="dashboard">
    <Row>
      <Col md={12}>
        <h3 className="page-title">Dashboard</h3>
      </Col>
    </Row>
    <Row>
      <ChartCategory />
      <TopTable />
    </Row>
  </Container>
);

export default Home;
