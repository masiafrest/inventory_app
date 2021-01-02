import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { connect } from "react-redux";

interface IAuthProps{
  component: any;
  authenticated: boolean;
  rest: any;
}

const AuthRoute  = ({
    component: Component, authenticated, ...rest 
}: IAuthProps )
