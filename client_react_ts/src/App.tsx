import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

//redux
import store from "./redux/stores";
import { Provider } from "react-redux";
import {
  setAuthenticated,
  setUserCredential,
  signOut,
} from "./redux/features/user/userSlice";

// Components
import NavBar from "./components/NavBar";
import AuthRouth from "./utils/AuthRouth";
import OrderTableContainer from "./components/orderTable/OrderTableContainer";
import ShowData from "./components/ShowData";

import ErrorHandler from "./components/ErrorHandler";
//pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

axios.defaults.baseURL = "http://localhost:5050/api/v1";

const token = localStorage.token;
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(signOut);
    window.location.href = "/signin"; //en logOutUser esta esta linea borrar una de las 2?
  } else {
    store.dispatch(setAuthenticated());
    store.dispatch(setUserCredential({ ...decodedToken }));
    axios.defaults.headers.common["Authorization"] = token;
    //setting authorize token to header in axios
    // store.dispatch(getUserData())
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <AuthRouth exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/table" component={OrderTableContainer} />
          <Route path="/showData" component={ShowData} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
