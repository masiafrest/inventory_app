import { SET_HEADER, SET_LINEAS, LOADING_ORDER } from "../types";

const initialState: ReduxOrder = {
  header: {
    empresa_cliente_id: null,
    usuario_id: null,
  },
  lineas: {
    inventario_id: null,
    sku: "",
    marca: "",
    modelo: "",
    precio: null,
    qty: null,
  },
};
//TODO: terminar order reducer y hacer el de itemData reducer
export default function orderReducers(
  state = initialState,
  action: Actions
): ReduxOrder {
  switch (action.type) {
    case SET_HEADER:
      return { ...state, header: action.payload.header };
    case SET_LINEAS:
      return { ...state, lineas: action.payload.lineas };
    default:
      return state;
  }
}
