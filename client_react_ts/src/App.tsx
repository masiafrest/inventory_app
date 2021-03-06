import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { localIp } from "./localIp";
import jwtDecode from "jwt-decode";
import { addPaths, showPaths } from "./paths";

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

import { Container } from "@material-ui/core";
// Components
import NavBar from "./components/NavBar";
import AuthRouth from "./components/AuthRouth";
import ErrorHandler from "./components/ErrorHandler";

//material ui
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

console.log("http://" + localIp + ":5050/api/v1");
axios.defaults.baseURL = "http://" + localIp + ":5050/api/v1";

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
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const Theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Router>
            <NavBar
              handleThemeChange={handleThemeChange}
              darkState={darkState}
            />
            <Container>
              <ErrorHandler>
                <Switch>
                  <ErrorHandler>
                    <Route exact path="/signin" component={SignIn} />
                    <AuthRouth exact path={addPaths} component={AddData} />
                    <AuthRouth exact path={showPaths} component={ShowData} />
                    <AuthRouth exact path="/" component={Home} />
                  </ErrorHandler>
                </Switch>
              </ErrorHandler>
            </Container>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
