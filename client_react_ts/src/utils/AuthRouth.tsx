import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

export const AuthRouth: React.FC<any> = ({
  Component,
  authenticated,
  ...rest
}) => {
  const user = useSelector((state: RootState) => state.user);

  return user.authenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: "/signin" }} />
  );
};

export default AuthRouth;
