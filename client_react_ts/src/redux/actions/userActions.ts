import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

import axios from "axios";

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

interface ISignIn {
  nombre: string;
  password: string;
}

export const signInUser = (userData: ISignIn, history: any) => (
  dispatch: any
) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signin", userData)
    .then((res) => {
      const token: string = `Bearer ${res.data.token}`; // TODO: should be res.body, need to test to get the token
      localStorage.setItem("token", token); // setting token to local storage
      axios.defaults.headers.common["Authorization"] = token; //setting authorize token to header in axios
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      console.log("succes");
      // history maybe is react router rom redirect
      history.push("/"); //redirect to index page after login
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logOutUser = () => (dispatch: any) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = "/login"; //redirect to index page after login
};
