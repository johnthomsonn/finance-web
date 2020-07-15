import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isSignedIn } from "../../js/methods";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isSignedIn() ? (
        <Component {...props} />
    ) : (
            <Redirect to={{ pathname: "/signin", state: { from: props.location, redirectError: "You must be logged in to view this profile" } }} />
        )}
    />

);

export default PrivateRoute;
