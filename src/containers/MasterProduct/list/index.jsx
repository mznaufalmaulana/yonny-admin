import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import API from "../../../services";
import ModalDelete from "./modal/delete";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

function List() {
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [dataModal, setDataModal] = useState("");
  const [openModalDelete, setOpenModalDelete] = useState(
    dataModal ? true : false
  );

  const deleteCategory = () => {
    API.deleteData(`product-category/${dataModal.id}/delete`).then((result) => {
      if (result.message === "success") {
        setAlert(true);
        setMessage(`${dataModal.category_name} was deleted`);
        setOpenModalDelete(false);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    API.get(`product-category/list`).then((result) => {
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
      name: "Category Product Name",
      cell: (row) => row.category_name,
    },
    {
      name: "",
      width: "150px",
      cell: (row) => (
        <>
          <NavLink
            to={`/master/product/edit/${row.id}`}
            className="btn-sm btn-primary mr-1"
          >
            Edit
          </NavLink>

          <a
            href="#"
            className="btn-sm btn-danger mr-1"
            onClick={() => (setOpenModalDelete(true), setDataModal(row))}
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
          open={openModalDelete}
          data={dataModal}
          onHide={() => setOpenModalDelete(false)}
          onDeleted={() => deleteCategory()}
        />
        <SnackbarComponent
          openAlert={alert}
          message={message}
          onHide={() => setAlert(false)}
        />
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
                <NavLink to="/master/product/add">
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
              // paginationServer
              paginationTotalRows={data.length}
              paginationPerPage={5}
              highlightOnHover
              progressPending={isLoading}
              paginationComponentOptions={{
                noRowsPerPage: true,
              }}
              progressComponent={
                <div className="text-center p-5">
                  <p>Memuat Data</p>
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
