import React, { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import SignIn from "../pages/SignIn";

interface IAuthProps {
  Component: React.FC; //maybe work on funcion component and not class component or React.ComponentType<any>;
  authenticated: boolean;
  rest: any;
  [key: string]: any;
}

export const AuthRouth: React.FC<any> = ({
  Component,
  authenticated,
  ...rest
}) => {
  const user = useSelector((state: RootState) => state.user);
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

  return user.authenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: "/signin" }} />
  );
};

export default AuthRouth;
