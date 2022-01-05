import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import ModalDelete from "./modal/delete";
import API from "../../../../services";
import SnackbarComponent from "../../../Layout/components/SnackbarComponent";

function Index() {
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [deleteData, setDeleteData] = useState({ open: false, data: "" });

  useEffect(() => {
    setIsLoading(true);
    API.get(`email/message`).then((result) => {
      if (result.message === "success") {
        setData(result.data);
        setIsLoading(false);
      }
    });
  }, [alert]);

  const deleteProject = () => {
    API.deleteData(`email/${deleteData.data.id}/delete`).then((result) => {
      if (result.message === "success") {
        setAlert({
          open: true,
          message: `${deleteData.data.email_address} was deleted`,
          status: "success",
        });
        setDeleteData({ open: false });
      }
    });
  };

  const cols = [
    {
      name: "No",
      width: "55px",
      cell: (row, index) => index + 1,
    },
    {
      name: "Name",
      cell: (row) => row.name,
    },
    {
      name: "Email Address",
      cell: (row) => row.email_address,
    },
    {
      name: "With Product",
      cell: (row) => row.product_id? (
        <span className="badge badge-pill badge-info p-2 px-4 mr-1">
          Yes
        </span>
      ):(
        <span className="badge badge-pill badge-warning p-2 px-4 mr-1">
          No
        </span>
      ),
    },
    {
      name: "",
      width: "150px",
      cell: (row) => (
        <>
          <a
            href={`/email/chat/detail/${row.id}`}
            className="btn-sm btn-success mr-1"
          >
            Reply
          </a>
        </>
      ),
    },
  ];

  const List = (
    <Col md={12}>
      <ModalDelete
        open={deleteData.open}
        onHide={() => setDeleteData({ open: false })}
        data={deleteData.data}
        onDeleted={deleteProject}
      />
      <SnackbarComponent
        openAlert={alert.open}
        message={alert.message}
        onHide={() => setAlert({ open: false })}
      />
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="card__title">
                <h5 className="bold-text">Data Email Message</h5>
                {/* <h5 className="subhead">Example subhead</h5> */}
              </div>
            </Col>
          </Row>
          <DataTable
            columns={cols}
            data={data}
            pagination
            paginationTotalRows={data.length}
            paginationPerPage={10}
            highlightOnHover
            progressPending={isLoading}
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
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
  );

  return List;
}

export default Index;
