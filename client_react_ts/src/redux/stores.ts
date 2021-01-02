import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import uiReducers from "./reducers/uiReducers";
import userReducer from "./reducers/userReducers";
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducers,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
  // applyMiddleware(...middleware),
  //quitar el codigo de abajo compose cuando va a deploy en firebase y agregar el codigo arriba applymiddelware
  //si no va a salir pag en blanco porque los navegadores necesitan el redux dextool instalado
  // compose(
  //   applyMiddleware(...middleware),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;
