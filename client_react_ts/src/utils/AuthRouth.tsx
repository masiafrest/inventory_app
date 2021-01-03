import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import userReducers from "../redux/reducers/userReducers";

interface IAuthProps {
  Component: React.FC<RouteComponentProps>; //maybe work on funcion component and not class component
  authenticated: boolean;
  rest: any;
}

// interface RootState {
//   authenticated: boolean;
// }
// const selectAuth = (state: RootState) => state.authenticated;

export const AuthRouth = ({
  Component,
  authenticated,
  ...rest
}: IAuthProps) => {
  // const authenticated = useSelector(selectAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

function mapStatetoProps(state: IAuthProps) {
  return {
    authenticated: state.user.authenticated,
  };
}
