import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

//TODO: agregar recibo venta transferencia
const initialState: Recibos = {
  venta: {
    empresa_cliente_id: null,
    usuario_id: null,
    //estado??
    lineas: [],
  },
  transferencia: {
    usuario_id: null,
    lineas: [],
  },
};

interface Tipo {
  tipo: string;
}

const reciboSlice = createSlice({
  name: "recibos",
  initialState,
  reducers: {
    addUserId: (state, action) => {
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo].usuario_id = action.payload.usuario_id;
    },
    delUserId: (state, action) => {
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo].usuario_id = null;
    },
    addClienteId: (state, action) => {
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo].empresa_cliente_id = action.payload.cliente_id;
    },
    pushLinea: (state, action: PayloadAction<Lineas & Tipo>) => {
      //TODO: revisar si existe o no el item pusheado, si qty del payload es mayor actualizar la qty
      const tipoRecibo = action.payload.tipo;
      action.payload.id = action.payload.id;
      const hasId = state[tipoRecibo].lineas.some(
        (linea, idx) => linea.id === action.payload.id
      );
      if (hasId) {
        state[tipoRecibo].lineas.filter((linea, idx) => {
          if (linea.id === action.payload.id) {
            state[tipoRecibo].lineas[idx] = action.payload;
          }
        });
        console.log("hasId");
      } else {
        state[tipoRecibo].lineas.push(action.payload);
      }
    },
    addRecibo: (state, action: PayloadAction<Recibos & Tipo>) => {
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo] = action.payload;
    },
    deleteLinea: (state, action: PayloadAction<number & Tipo>) => {
      const tipoRecibo = action.payload.tipo;
      console.log(action.payload);
      const newArr = state[tipoRecibo].lineas.filter(
        (linea) => linea.id !== action.payload
      );
      state[tipoRecibo].lineas = newArr;
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
