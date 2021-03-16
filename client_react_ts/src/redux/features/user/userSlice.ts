import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { addUserId, delUserId } from "../recibo/reciboSlice";
import { History } from "history";

interface SignIn {
  nombre: string;
  password: string;
}

interface UserDataAndToken {
  usuario: UserCredential;
  token: string;
}

interface UserCredential {
  nombre?: string;
  rol?: string;
  id?: number;
}

const initialState: User = {
  authenticated: false,
  credentials: {},
  loading: false,
  errors: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserCredential: (state, action: PayloadAction<UserCredential>) => {
      state.credentials = action.payload;
    },
    setAuthenticated: (state) => {
      state.authenticated = true;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    doneLoading: (state) => {
      state.loading = false;
    },
    signinSucess: (state, action: PayloadAction<UserDataAndToken>) => {
      state.authenticated = true;
      state.credentials = action.payload.usuario;
      setAuthorizationHeader(action.payload.token);
    },
    signoutSucess: (state) => {
      state.authenticated = false;
      state.credentials = {};
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    setErrors: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = null;
    },
  },
});

const {
  startLoading,
  doneLoading,
  signinSucess,
  signoutSucess,
  setErrors,
  clearErrors,
} = userSlice.actions;
export const { setAuthenticated, setUserCredential } = userSlice.actions;

export default userSlice.reducer;

export const signIn = (userData: SignIn, history: History) => async (
  dispatch: any
) => {
  let res;
  try {
    dispatch(clearErrors());
    dispatch(startLoading());
    res = await axios.post("auth/signin", userData);
  } catch (err) {
    console.log(err);
    dispatch(doneLoading());
    dispatch(setErrors(err.response.data));
    return;
  }
  dispatch(signinSucess(res.data));
  dispatch(addUserId(res.data.usuario.id));
  dispatch(doneLoading());
  history.push("/");
};

export const signOut = () => (dispatch: any) => {
  dispatch(signoutSucess());
  dispatch(delUserId());
  window.location.href = "/signin";
};

const setAuthorizationHeader = (token: string) => {
  const tokenStr = `Bearer ${token}`;
  localStorage.setItem("token", tokenStr); // setting token to local storage
  axios.defaults.headers.common["Authorization"] = tokenStr; //setting authorize token to header in axios
};
