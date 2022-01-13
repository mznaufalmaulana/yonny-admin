import { Link } from "react-router-dom";
import React from "react";
import { Card, CardBody, Col, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useEffect } from "react";
import API from "../../../services";

function TopTable() {
  const [dataSeen, setDataSeen] = useState([]);
  const [dataShare, setDataShare] = useState([]);

  useEffect(() => {
    API.get(`dashboard/top/seen`).then((result) => {
      if (result.message === "success") {
        setDataSeen(result.data);
      }
    });
    API.get(`dashboard/top/share`).then((result) => {
      if (result.message === "success") {
        setDataShare(result.data);
      }
    });
  }, []);

  const colsSeen = [
    {
      name: "No",
      width: "55px",
      cell: (row, index) => index + 1,
    },
    {
      name: "Name",
      cell: (row) => row.type_name,
    },
    {
      name: "Total",
      cell: (row) => row.seen_count,
    },
  ];

  const colsShare = [
    {
      name: "No",
      width: "55px",
      cell: (row, index) => index + 1,
    },
    {
      name: "Name",
      cell: (row) => row.type_name,
    },
    {
      name: "Total",
      cell: (row) => row.share_count,
    },
  ];
  return (
    <>
      <Col md={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Top 5 Product Seen</h5>
            </div>
            <DataTable
              columns={colsSeen}
              data={dataSeen}
              highlightOnHover
              // progressPending={isLoading}
              progressComponent={
                <div className="text-center p-5">
                  <p>Loading Data</p>
                  <Spinner animation="border" size="lg" />
                </div>
              }
            />
          </CardBody>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Top 5 Product Share</h5>
            </div>
            <DataTable
              columns={colsShare}
              data={dataShare}
              highlightOnHover
              // progressPending={isLoading}
              progressComponent={
                <div className="text-center p-5">
                  <p>Loading Data</p>
                  <Spinner animation="border" size="lg" />
                </div>
              }
            />
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default TopTable;
