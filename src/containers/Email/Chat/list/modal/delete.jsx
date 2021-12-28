import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

class ModalDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.onHide}>
        <ModalHeader>Delete Data {this.props.data?.email_address}</ModalHeader>
        <ModalBody>
          <p>Are you sure to delete this Email Address?</p>
          <div className="mt-3 float-right">
            <Button
              className="btn-sm"
              color="secondary"
              onClick={this.props.onHide}
            >
              No
            </Button>
            <Button
              className="btn-sm"
              color="primary"
              onClick={this.props.onDeleted}
            >
              Yes
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalDelete;
