import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import API from "../../../services";
import ModalDelete from "./modal/delete";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

function Index() {
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [deleteData, setDeleteData] = useState({ open: false, data: "" });

  useEffect(() => {
    setIsLoading(true);
    API.get(`product/list`).then((result) => {
      if (result.message === "success") {
        setData(result.data);
        setIsLoading(false);
      }
    });
  }, [alert]);

  const deleteProduct = () => {
    API.deleteData(`product/${deleteData.data.id}/delete`).then((result) => {
      if (result.message === "success") {
        setAlert({
          open: true,
          message: `${deleteData.data.project_name} was deleted`,
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
      name: "Product Name",
      cell: (row) => row.product_name,
    },
    {
      name: "Type",
      cell: (row) => row.type_name,
    },
    {
      name: "Category Product",
      cell: (row) =>
        row.product_category.map((item) => (
          <span className="badge badge-pill badge-warning p-2 mr-1">
            {item.category_name}
          </span>
        )),
    },
    {
      name: "",
      width: "150px",
      cell: (row) => (
        <>
          <NavLink
            to={`/product/edit/${row.id}`}
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

  const List = (
    <Col md={12}>
      <ModalDelete
        open={deleteData.open}
        onHide={() => setDeleteData({ open: false })}
        data={deleteData.data}
        onDeleted={deleteProduct}
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
                <h5 className="bold-text">List Data</h5>
                <h5 className="subhead">Example subhead</h5>
              </div>
            </Col>
            <Col>
              <NavLink to="/product/add">
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
                <p>Memuat Data</p>
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
