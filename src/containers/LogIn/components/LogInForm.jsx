import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import renderCheckBoxField from "../../../shared/components/form/CheckBox";
import API from "../../../services";
import { Button } from "reactstrap";
import MuiAlert from "@material-ui/lab/Alert";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

const LogInForm = ({ handleSubmit }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

  useEffect(() => {
    localStorage.clear();
  });

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const make = () => {
    let payload = JSON.stringify({
      email: email,
      password: pass,
    });
    login(payload);
  };

  const login = (payload) => {
    API.post(`login`, payload).then((result) => {
      handleMessage(result);
    });
  };

  const handleMessage = (result) => {
    if (result.message === "success") {
      localStorage.setItem("token", result.token);
      window.window.location.href = "/home";
    } else if (result.status === 500) {
      setAlert({ open: true, message: result.message, status: "error" });
    } else {
      setError({
        ...error,
        email: result.data.email,
        password: result.data.password,
      });
    }
  };

  return (
    <>
      <SnackbarComponent
        openAlert={alert.open}
        message={alert.message}
        status={alert.status}
        onHide={() => setAlert({ ...alert, open: false })}
      />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <span className="text-danger">{error.email}</span>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component="input"
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              className={`form__form-group-button${
                isPasswordShown ? " active" : ""
              }`}
              onClick={() => showPassword()}
              type="button"
            >
              <EyeIcon />
            </button>
          </div>
          <span className="text-danger">{error.password}</span>
          {/* <div className="account__forgot-password">
            <a href="/">Forgot a password?</a>
          </div> */}
        </div>
        <br />
        <Button
          className="btn btn-primary account__btn account__btn--small text-white"
          onClick={make}
        >
          Sign In
        </Button>
        <Link
          className="btn btn-outline-primary account__btn account__btn--small"
          to="/register"
        >
          Create Account
        </Link>
      </form>
    </>
  );
};

LogInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: "log_in_form",
})(LogInForm);
