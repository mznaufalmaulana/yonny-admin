import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import API from "../../../services";
import ModalDelete from "./modal/delete";
import ModalConfirmation from "../../../shared/components/modal/modalConfirmation";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

function List() {
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });
  const [deleteData, setDeleteData] = useState({ open: false, data: "" });
  const [onHeaderFooter, seOnHeaderFooter] = useState({ open: false, data: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const deleteCategory = () => {
    API.deleteData(`contact/${deleteData.data.id}/delete`).then((result) => {
      if (result.message === "success") {
        setAlert({
          open: true,
          message: `Contact ${deleteData.data.region} was deleted`,
          status: "success",
        });
        setDeleteData({ open: false, data: "", status: "error" });
      }
    });
  };

  const changeHeaderFooter = () => {
    API.post(`contact/${onHeaderFooter.data}/update-on-footer`).then((result) => {
      if (result.message === "success") {
        setAlert({
          open: true,
          message: `Contact was saved`,
          status: "success",
        });
        seOnHeaderFooter({ open: false, data: "", status: "error" });
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    API.get(`contact/list`).then((result) => {
      if (result.message === "success") {
        setData(result.data);
        setIsLoading(false);
      }
    });
  }, [alert]);

  const cols = [
    {
      name: "No",
      width: "55px",
      cell: (row, index) => index + 1,
    },
    {
      name: "Region",
      cell: (row) => row.region,
    },
    {
      name: "First Address",
      cell: (row) => row.first_address,
    },
    {
      name: "Second Address",
      cell: (row) => row.second_address,
    },
    {
      name: "Phone",
      cell: (row) => row.phone,
    },
    {
      name: "Email",
      cell: (row) => row.email,
    },
    {
      name: "On Header Footer",
      cell: (row) => row.is_on_footer? (
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
      width: "250px",
      cell: (row) => (
        <>        
         <a
            href="#"
            className="btn-sm btn-info mr-1"
            onClick={() => seOnHeaderFooter({ open: true, title: `Change this data`, question: 'Are You sure change this data ?', data: row.id })}
          >
            Header Footer
          </a>

          <NavLink
            to={`/contact/edit/${row.id}`}
            className="btn-sm btn-primary mr-1"
          >
            Edit
          </NavLink>

          <a
            href="#"
            className="btn-sm btn-danger mr-1"
            onClick={() => setDeleteData({ open: true, data: row })}
          >
            Delete
          </a>          
        </>
      ),
    },
  ];

  const index = (
    <>
      <Col md={12}>
        <ModalConfirmation
          open={onHeaderFooter.open}
          data={onHeaderFooter.data}
          title={onHeaderFooter.title}          
          question={onHeaderFooter.question}        
          onHide={() => seOnHeaderFooter({ ...onHeaderFooter, open: false })}
          onAccept={() => changeHeaderFooter()}
        />
        <ModalDelete
          open={deleteData.open}
          data={deleteData.data}
          onHide={() => setDeleteData({ ...deleteData, open: false })}
          onDeleted={() => deleteCategory()}
        />
        <SnackbarComponent
          openAlert={alert.open}
          message={alert.message}
          onHide={() => setAlert(false)}
        />
        <Card>
          <CardBody>
            <Row>
              <Col>
                <div className="card__title">
                  <h5 className="bold-text">Data Contact</h5>
                  {/* <h5 className="subhead">Example subhead</h5> */}
                </div>
              </Col>
              <Col>
                <NavLink to="/contact/add">
                  <Button className="btn btn-primary text-white float-right">
                    + Add Data
                  </Button>
                </NavLink>
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
    </>
  );

  return index;
}

export default List;
