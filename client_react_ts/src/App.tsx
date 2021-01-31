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

//pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AddItem from "./pages/AddItem";

import { Container } from "@material-ui/core";
// Components
import NavBar from "./components/NavBar";
import AuthRouth from "./utils/AuthRouth";
import OrderTableContainer from "./components/orderTable/OrderTableContainer";
import FetchDataContainer from "./components/FetchData/FetchDataContainer";
import ErrorHandler from "./components/ErrorHandler";

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

const paths = [
  "/items",
  "/usuarios",
  "/categorias",
  "/lugares",
  "/clientes",
  "/proveedores",
  "/roles",
  "/defectuosos",
];

const addPaths = paths.map((path) => "/add" + path);
const invPaths = ["/logs"].map((e) => "/items/inventarios" + e);
const reciboPaths = [
  "/venta",
  "/transferencia",
  "/devolucion",
  "/garantia",
  "/nota_credito",
  "/cotizacion",
].map((e) => "/recibos" + e);

// TODO: add other post path
// TODO: add other put path
// TODO: add recibo fetch and post
function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Container maxWidth="sm">
            <ErrorHandler>
              <Route exact path="/addItem" component={AddItem} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/table" component={OrderTableContainer} />
              <Route exact path={paths} component={FetchDataContainer} />
              <Route exact path={invPaths} component={FetchDataContainer} />
              <Route exact path={reciboPaths} component={FetchDataContainer} />
              <AuthRouth exact path="/" component={Home} />
            </ErrorHandler>
          </Container>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
