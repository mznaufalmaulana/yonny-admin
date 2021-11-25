import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";
import LogIn from "../LogIn/index";
import ExamplePageOne from "../Example/index";
import ExamplePageTwo from "../ExampleTwo/index";
import AddProject from "../Project/add";
import ListProject from "../Project/list";
import IndexMasterProduct from "../MasterProduct";
import IndexMasterType from "../MasterType";
import IndexProduct from "../Product/";

const Pages = () => (
  <Switch>
    <Route path="/pages/one" component={ExamplePageOne} />
    <Route path="/pages/two" component={ExamplePageTwo} />
  </Switch>
);

const Project = () => (
  <Switch>
    <Route path="/project/add" component={AddProject} />
    <Route path="/project/list" component={ListProject} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/pages" component={Pages} />
      <Route path="/master/product" component={IndexMasterProduct} />
      <Route path="/master/type" component={IndexMasterType} />
      <Route path="/product" component={IndexProduct} />
      <Route path="/project" component={Project} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
