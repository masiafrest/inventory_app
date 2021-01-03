import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import userReducers from "../redux/reducers/userReducers";

interface IAuthProps {
  Component: React.FC<RouteComponentProps>; //maybe work on funcion component and not class component
  authenticated: boolean;
  rest: any;
}

//another way to get the state using selector. part 1/2
// interface RootState {
//   authenticated: boolean;
// }
// const selectAuth = (state: RootState) => state.authenticated;

//interface of connect

export const AuthRouth = ({
  Component,
  authenticated,
  ...rest
}: IAuthProps) => {
  //another way to get the state using selector. part 2/2
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

function mapStatetoProps(state: IRootState) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStatetoProps)(AuthRouth);
