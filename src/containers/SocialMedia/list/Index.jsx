import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import API from "../../../services";
import ModalDelete from "./modal/delete";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

function List() {
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });
  const [deleteData, setDeleteData] = useState({ open: false, data: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  const deleteCategory = () => {
    API.deleteData(`social-media/${deleteData.data.id}/delete`).then(
      (result) => {
        if (result.message === "success") {
          setAlert({
            open: true,
            message: `${deleteData.data.link} was deleted`,
            status: "success",
          });
          setDeleteData({ open: false, data: "", status: "error" });
        }
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    API.get(`social-media/list`).then((result) => {
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
      name: "Icon",
      cell: (row) => row.icon==='faFacebook'?
          (<FontAwesomeIcon icon={faFacebook}/>):
        row.icon==='faInstagram'?
          (<FontAwesomeIcon icon={faInstagram}/>):
        row.icon==='faTwitter'?
          (<FontAwesomeIcon icon={faTwitter}/>):null,
    },
    {
      name: "Link",
      cell: (row) => (<a href={row.link} target="_blank">{row.link}</a>),
    },
    {
      name: "",
      width: "150px",
      cell: (row) => (
        <>
          <NavLink
            to={`/social-media/edit/${row.id}`}
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
                  <h5 className="bold-text">Data Social Media</h5>
                  {/* <h5 className="subhead">Example subhead</h5> */}
                </div>
              </Col>
              <Col>
                <NavLink to="/social-media/add">
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
