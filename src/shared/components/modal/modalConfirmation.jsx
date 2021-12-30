import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

class ModalConfoirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal isOpen={this.props.open} toggle={this.props.onHide}>
        <ModalHeader>
					{this.props.title}
        </ModalHeader>
        <ModalBody>
          <p>{this.props.question}</p>
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
              onClick={this.props.onAccept}
            >
              Yes
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalConfoirmation;
