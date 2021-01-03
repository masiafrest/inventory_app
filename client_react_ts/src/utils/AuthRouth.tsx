import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import userReducers from "../redux/reducers/userReducers";

interface IAuthProps {
  Component: React.FC<RouteComponentProps>; //maybe work on funcion component and not class component
  authenticated: boolean;
  rest: any;
}

const AuthRouth = ({ Component, authenticated, ...rest }: IAuthProps) => {
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? (
        <Component {...props} />
      ) : (
        <Component {...props} />
      )
    }
  />;
};
