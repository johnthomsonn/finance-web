import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";

import PrivateRoute from "./PrivateRoute";
import User from "./User";
import Page404 from "./404Page";

const MainRouter = props => {
  return (<>

    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} {...props} />
        <Route path="/signin" exact component={Signin} {...props} />
        <Route path="/signup" exact component={Signup} {...props} />
        <PrivateRoute path="/:user" exact component={User} {...props} />
        <Page404 {...props} />
      </Switch>

    </BrowserRouter>
  </>);
};

export default MainRouter;
