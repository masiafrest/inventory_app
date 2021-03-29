import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//TODO: agregar recibo venta transferencia
const initialState: Recibos = {
  empresa_cliente_id: null,
  usuario_id: null,
  venta: {
    lineas: [],
  },
  transferencia: {
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
    //TODO: add change qty reducer
    addUserId: (state, action) => {
      state.usuario_id = action.payload;
    },
    delUserId: (state) => {
      state.usuario_id = null;
    },
    addClienteId: (state, action) => {
      console.log(action.payload);
      state.empresa_cliente_id = action.payload;
    },
    pushLinea: (state, action: PayloadAction<Lineas & Tipo>) => {
      //TODO: revisar si existe o no el item pusheado, si qty del payload es mayor actualizar la qty
      const tipoRecibo = action.payload.tipo;
      const hasId = state[tipoRecibo].lineas.some(
        (linea, idx) => linea.id === action.payload.id
      );
      if (hasId) {
        state[tipoRecibo].lineas.filter((linea, idx) => {
          if (linea.id === action.payload.id) {
            state[tipoRecibo].lineas[idx] = action.payload;
          }
        });
      } else {
        state[tipoRecibo].lineas.push(action.payload);
      }
    },
    addRecibo: (state, action: PayloadAction<Recibos & Tipo>) => {
      const tipoRecibo = action.payload.tipo;
      state[tipoRecibo] = action.payload;
    },
    deleteLinea: (state, action: PayloadAction<Tipo & { item_id: number }>) => {
      const tipoRecibo = action.payload.tipo;
      console.log(action.payload);
      const newArr = state[tipoRecibo].lineas.filter(
        (linea) => linea.id !== action.payload.item_id
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
