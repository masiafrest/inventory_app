import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: Recibo = {
  empresa_cliente_id: null,
  usuario_id: null,
  lineas: [],
};

const reciboSlice = createSlice({
  name: "recibos",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usuario_id = action.payload;
    },
    addCliente: (state, action) => {
      state.empresa_cliente_id = action.payload;
    },
    pushLinea: (state, action: PayloadAction<Lineas>) => {
      //TODO: revisar si existe o no el item pusheado, si qty del payload es mayor actualizar la qty

      state.lineas.push(action.payload);
    },
    addRecibo: (state, action: PayloadAction<Recibo>) => {
      state = action.payload;
    },
    deleteLinea: (state, action: PayloadAction<number>) => {
      state.lineas.map((linea) => linea.inventario_id !== action.payload);
    },
  },
});

export const {
  addUser,
  addCliente,
  pushLinea,
  addRecibo,
  deleteLinea,
} = reciboSlice.actions;

export default reciboSlice.reducer;
