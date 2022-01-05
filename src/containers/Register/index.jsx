import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "mdi-react/FacebookIcon";
import GooglePlusIcon from "mdi-react/GooglePlusIcon";
import RegisterForm from "./components/RegisterForm";

const Register = () => (
  <div className="account">
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">
            Welcome to
            <span className="account__logo">
              {" "}
              Batu
              <span className="account__logo-accent">Yonny</span>
            </span>
          </h3>
          <h4 className="account__subhead subhead">
            Start your business easily
          </h4>
        </div>
        <RegisterForm onSubmit />        
      </div>
    </div>
  </div>
);

export default Register;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
