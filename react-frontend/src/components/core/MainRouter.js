import React from "react";
import {Switch, BrowserRouter, Route} from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";

const MainRouter = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} {...props} />
        <Route path="/signin" exact component={Signin} {...props} />
        <Route path="/signup" exact component={Signup} {...props} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRouter;