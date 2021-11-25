import React from "react";

import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
        <Alert severity={this.props.status}>{this.props.message}</Alert>
      </Snackbar>
    );
  }
}

export default SnackbarComponent;
