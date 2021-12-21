import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";
import LogIn from "../LogIn/index";
import ExamplePageOne from "../Example/index";
import ExamplePageTwo from "../ExampleTwo/index";
import IndexMasterProduct from "../MasterProduct";
import IndexMasterType from "../MasterType";
import IndexProduct from "../Product/";
import IndexProject from "../Project/";
import IndexRegion from "../Region/";
import IndexSocialMedia from "../SocialMedia/";
import IndexContact from "../Contact/";
import Register from "../Register";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Home";
import IndexEmail from "../Email";
import IndexPromo from "../Promo";

const Pages = () => (
  <Switch>
    <Route path="/pages/one" component={ExamplePageOne} />
    <Route path="/pages/two" component={ExamplePageTwo} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/pages" component={Pages} />

      {/* master */}
      <ProtectedRoute path="/master/product" component={IndexMasterProduct} />
      <ProtectedRoute path="/master/type" component={IndexMasterType} />
      <ProtectedRoute path="/master/region" component={IndexRegion} />
      <ProtectedRoute path="/product" component={IndexProduct} />
      <ProtectedRoute path="/project" component={IndexProject} />
      <ProtectedRoute path="/social-media" component={IndexSocialMedia} />
      <ProtectedRoute path="/contact" component={IndexContact} />
      <ProtectedRoute path="/home" component={Home} />
      <ProtectedRoute path="/email" component={IndexEmail} />
      <ProtectedRoute path="/promo" component={IndexPromo} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
