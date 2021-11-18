import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import API from "../../../../services";
import SnackbarComponent from "../../../Layout/components/SnackbarComponent";
import ModalEdit from "./modal/edit";
import ModalDelete from "./modal/delete";

function Index() {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [dataModal, setDataModal] = useState("");
  const [openModalEdit, setOpenModalEdit] = useState(dataModal ? true : false);
  const [openModalDelete, setOpenModalDelete] = useState(
    dataModal ? true : false
  );

  const deleteType = () => {
    API.deleteData(`product-type/${dataModal.id}/delete`).then((result) => {
      if (result.message === "success") {
        setAlert(true);
        setMessage(`${dataModal.type_name} was deleted`);
        setOpenModalDelete(false);
      }
    });
  };

  useEffect(() => {
    API.get(`product-type/list`).then((result) => {
      if (result.message === "success") {
        setData(result.data);
      }
    });
  }, [alert]);

  const getDetail = (id) => {
    API.get(`product-category/${id}`).then((result) => {
      if (result.message === "success") {
        setDataModal(result.data);
        setOpenModalEdit(true);
      }
    });
  };

  const cols = [
    {
      name: "No",
      width: "55px",
      cell: (row) => row.id,
    },
    {
      name: "Type Name",
      cell: (row) => row.type_name,
    },
    {
      name: "",
      width: "150px",
      cell: (row) => (
        <>
          <a
            href="#"
            className="btn-sm btn-primary mr-1"
            onClick={() => getDetail(row.id)}
          >
            Edit
          </a>

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

  const component = (
    <Col md={12}>
      <ModalDelete
        open={openModalDelete}
        data={dataModal}
        onHide={() => setOpenModalDelete(false)}
        onDeleted={() => deleteType()}
      />
      <ModalEdit
        open={openModalEdit}
        data={dataModal}
        onHide={() => setOpenModalEdit(false)}
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
              <NavLink to="/master/type/add">
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
            paginationServer
            paginationTotalRows={20}
            paginationPerPage={10}
            highlightOnHover
            paginationComponentOptions={{
              noRowsPerPage: true,
            }}
          />
        </CardBody>
      </Card>
    </Col>
  );
  return component;
}

export default Index;
