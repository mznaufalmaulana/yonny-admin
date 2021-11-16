import React from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";

const Index = () => (
  <Col md={12}>
    <Card>
      <CardBody>
        <Row>
          <Col>
            <div className="card__title">
              <h5 className="bold-text">List Data</h5>
              <h5 className="subhead">Example subhead</h5>
            </div>
          </Col>
          <Col>
            <NavLink to="/project/add">
              <Button className="btn btn-primary text-white float-right">
                + Add Data
              </Button>
            </NavLink>
          </Col>
        </Row>
        <DataTable />
      </CardBody>
    </Card>
  </Col>
);

export default Index;
