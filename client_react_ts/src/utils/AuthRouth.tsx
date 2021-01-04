import React, { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "../pages/SignIn";

interface IAuthProps {
  Component: React.FC; //maybe work on funcion component and not class component or React.ComponentType<any>;
  authenticated: boolean;
  rest: any;
  [key: string]: any;
}

export const AuthRouth: React.FC<IAuthProps> = ({
  Component,
  authenticated,
  ...rest
}) => {
  // let redirectPath = "";
  // if (!authenticated) {
  //   redirectPath = "/signin";
  // }
  // if (redirectPath) {
  //   const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
  //   return <Route {...rest} component={renderComponent} render={undefined} />;
  // } else {
  //   return <Route {...rest} />;
  // }

  return authenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: "/signin" }} />
  );
};

function mapStatetoProps(state: IRootState) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStatetoProps)(AuthRouth);
