import React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import API from "../../../../../services";
import SnackbarComponent from "../../../../Layout/components/SnackbarComponent";

class ModalEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //data
      typeName: props.data.type_name,

      //alert
      message: "",
      alert: false,
    };
    this.save = this.save.bind(this);
  }

  save() {
    var param = new FormData();
    param.append("type_name", this.state.typeName);

    API.put(`product-type/${this.props.data.id}/update`, param).then(
      (result) => {
        if (result.message === "success") {
          console.log(param);
        }
      }
    );
  }

  render() {
    return (
      <>
        <SnackbarComponent
          openAlert={this.state.alert}
          message={this.state.message}
          onHide={() => this.setState({ alert: false })}
        />
        <Modal isOpen={this.props.open} toggle={this.props.onHide} size="lg">
          <ModalHeader>
            Edit Data {this.props.data ? this.props.data.category_name : ""}
          </ModalHeader>
          <ModalBody>
            <Form id="form">
              <FormGroup row>
                <Label sm={2}>Type Name</Label>
                <Col sm={10}>
                  <Input
                    name="type_name"
                    placeholder="Input the Type Name"
                    type="text"
                    value={this.state.categoryName}
                    onChange={(e) =>
                      this.setState(
                        { categoryName: e.target.value },
                        function () {
                          console.log(e.target.value);
                        }
                      )
                    }
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.onHide}>
              Cancel
            </Button>
            <Button color="primary" onClick={() => this.save()}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ModalEdit;
