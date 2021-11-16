import React from "react";

import { Snackbar } from "@material-ui/core";

class SnackbarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vertical: "top",
      horizontal: "right",
    };
  }

  render() {
    const { vertical, horizontal } = this.state;

    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={this.props.openAlert}
        onClose={this.props.onHide}
        message={this.props.message}
        key={vertical + horizontal}
        autoHideDuration={5000}
      >
        {/* <Alert severity="{this.props.status}">{this.props.message}</Alert> */}
      </Snackbar>
    );
  }
}

export default SnackbarComponent;
