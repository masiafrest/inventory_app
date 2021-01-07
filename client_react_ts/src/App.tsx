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
import OrderTable from "./components/OrderTable";
import ItemCard from "./components/ItemCard";
import ItemAccordion from "./components/ItemAccordion";

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
    console.log("token: ", token);
    console.log("decodedtoken: ", decodedToken);
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
          <Route exact path="/table" component={OrderTable} />
          <Route exact path="/card" component={ItemCard} />
          <Route exact path="/accordion" component={ItemAccordion} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
