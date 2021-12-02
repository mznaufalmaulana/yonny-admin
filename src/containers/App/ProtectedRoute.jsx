import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Col, Row } from "reactstrap";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          const page = <Component {...props} />;
          return page;
        } else {
          return <Redirect to="/log_in" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
