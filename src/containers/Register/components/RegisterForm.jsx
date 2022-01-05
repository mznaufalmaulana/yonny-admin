import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import MailIcon from "mdi-react/MailIcon";
import renderCheckBoxField from "../../../shared/components/form/CheckBox";
import API from "../../../services";
import { Button } from "reactstrap";
import SnackbarComponent from "../../Layout/components/SnackbarComponent";

const RegisterForm = ({ handleSubmit }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [uname, setUname] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const make = () => {
    let payload = JSON.stringify({
      username: uname,
      email: email,
      password: pass,
      password_confirmation: passConfirmation,
    });
    login(payload);
  };

  const login = (payload) => {
    API.post(`register`, payload).then((result) => {
      handleMessage(result);
    });
  };

  const handleMessage = (result) => {
    if (result.message === "success") {
      window.window.location.href = "/log_in";
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
          <span className="form__form-group-label">Username</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="username"
              component="input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUname(e.target.value)}
            />
          </div>
          <span className="text-danger">{error.email}</span>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <MailIcon />
            </div>
            <Field
              name="email"
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
            {/* <button
              className={`form__form-group-button${
                isPasswordShown ? " active" : ""
              }`}
              onClick={() => showPassword()}
              type="button"
            >
              <EyeIcon />
            </button> */}
          </div>
          <span className="text-danger">{error.password}</span>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Repeat Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="passwordConfirm"
              component="input"
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassConfirmation(e.target.value)}
            />
            {/* <button
              className={`form__form-group-button${
                isPasswordShown ? " active" : ""
              }`}
              onClick={() => showPassword()}
              type="button"
            >
              <EyeIcon />
            </button> */}
          </div>
          <span className="text-danger">{error.password}</span>
        </div>
        <Button
          className="btn btn-primary account__btn account__btn--small text-white"
          onClick={make}
        >
          Create Account
        </Button>
        <Link
          className="btn btn-outline-primary account__btn account__btn--small"
          to="/log_in"
        >
          Log In
        </Link>
      </form>
    </>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: "register_form",
})(RegisterForm);
