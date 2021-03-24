import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

//TODO: agregar recibo venta transferencia 
const initialState: Recibo = {
  empresa_cliente_id: null,
  usuario_id: null,
  lineas: [],
};

const reciboSlice = createSlice({
  name: "recibos",
  initialState,
  reducers: {
    addUserId: (state, action) => {
      state.usuario_id = action.payload;
    },
    delUserId: (state) => {
      state.usuario_id = null;
    },
    addClienteId: (state, action) => {
      state.empresa_cliente_id = action.payload;
    },
    pushLinea: (state, action: PayloadAction<Lineas>) => {
      //TODO: revisar si existe o no el item pusheado, si qty del payload es mayor actualizar la qty
      action.payload.id = action.payload.id;
      const hasId = state.lineas.some(
        (linea, idx) => linea.id === action.payload.id
      );
      if (hasId) {
        state.lineas.filter((linea, idx) => {
          if (linea.id === action.payload.id) {
            state.lineas[idx] = action.payload;
          }
        });
        console.log("hasId");
      } else {
        state.lineas.push(action.payload);
      }
    },
    addRecibo: (state, action: PayloadAction<Recibo>) => {
      state = action.payload;
    },
    deleteLinea: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      const newArr = state.lineas.filter(
        (linea) => linea.id !== action.payload
      );
      state.lineas = newArr;
    },
  },
});

export const {
  addUserId,
  delUserId,
  addClienteId,
  pushLinea,
  addRecibo,
  deleteLinea,
} = reciboSlice.actions;

export default reciboSlice.reducer;
