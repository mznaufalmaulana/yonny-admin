import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";
import LogIn from "../LogIn/index";
import ExamplePageOne from "../Example/index";
import ExamplePageTwo from "../ExampleTwo/index";
import MasterProduct from "../MasterProduct/list";
import AddMasterProduct from "../MasterProduct/add";
import Type from "../Type/list";
import AddType from "../Type/add";
import AddProduct from "../Product/add";
import ListProduct from "../Product/list";
import AddProject from "../Project/add";
import ListProject from "../Project/list";

const Pages = () => (
  <Switch>
    <Route path="/pages/one" component={ExamplePageOne} />
    <Route path="/pages/two" component={ExamplePageTwo} />
  </Switch>
);

const Master = () => (
  <Switch>
    <Route path="/master/product/add" component={AddMasterProduct} />
    <Route path="/master/product" component={MasterProduct} />
    <Route path="/master/type/add" component={AddType} />
    <Route path="/master/type" component={Type} />
  </Switch>
);

const Product = () => (
  <Switch>
    <Route path="/product/add" component={AddProduct} />
    <Route path="/product/list" component={ListProduct} />
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
      <Route path="/master" component={Master} />
      <Route path="/product" component={Product} />
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
