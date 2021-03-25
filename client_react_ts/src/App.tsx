import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

//redux
import store, { persistor } from "./redux/stores";
import { Provider } from "react-redux";
import {
  setAuthenticated,
  setUserCredential,
  signOut,
} from "./redux/features/user/userSlice";
import { PersistGate } from "redux-persist/integration/react";

//pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AddData from "./pages/addData";
import ShowData from "./pages/showData";
import Recibo from './pages/recibos'

import { Container } from "@material-ui/core";
// Components
import NavBar from "./components/NavBar";
import AuthRouth from "./components/AuthRouth";
import OrderTableContainer from "./pages/recibos/venta/components/ventaTable/OrderTableContainer";
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
  "/item",
  "/inventario",
  "/usuario",
  "/categoria",
  "/lugar",
  "/cliente",
  "/proveedor",
  "/rol",
  "/defectuoso",
];
const pluralPaths = [
  "/items",
  "/inventarios",
  "/usuarios",
  "/categorias",
  "/lugares",
  "/clientes",
  "/proveedores",
  "/roles",
  "/defectuosos",
];

const addPaths = paths.map((path) => "/add" + path);
const showPaths = pluralPaths.map((path) => "/show" + path);
const reciboPaths = [
  "/venta",
  "/transferencia",
  "/devolucion",
  "/garantia",
  "/nota_credito",
  "/cotizacion",
].map((e) => "/recibo" + e);

// TODO: add other post path
// TODO: add other put path
// TODO: add recibo fetch and post
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <Switch>
            <Container>
              <ErrorHandler>
                <Route exact path="/signin" component={SignIn} />
                <AuthRouth exact path={reciboPaths} component={Recibo} />
                <AuthRouth exact path={addPaths} component={AddData} />
                <AuthRouth exact path={showPaths} component={ShowData} />
                <AuthRouth exact path="/" component={Home} />
              </ErrorHandler>
            </Container>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
