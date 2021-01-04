import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

import axios from "axios";
interface ISignIn {
  nombre: string;
  password: string;
}

interface IpostItem {
  [key: string]: string | number;
}

interface Iusuario {
  id: number;
  nombre: string;
}

interface IResToken {
  usuario: {
    [key: string]: Iusuario;
  };
  token: string;
}
export const signInUser = (userData: ISignIn, history: any) => (
  dispatch: any
) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("auth/signin", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token); // TODO: should be res.body, need to test to get the token
      dispatch({ type: SET_USER, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
      // history maybe is react router rom redirect
      history.push("/"); //redirect to index page after login
    })
    .catch((err) => {
      console.log("signIn User error: ", err.response);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signOutUser = () => (dispatch: any) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = "/signin"; //redirect to index page after login
};

//helper
const setAuthorizationHeader = (token: string) => {
  const tokenStr = `Bearer ${token}`;
  localStorage.setItem("token", tokenStr); // setting token to local storage
  axios.defaults.headers.common["Authorization"] = tokenStr; //setting authorize token to header in axios
};
