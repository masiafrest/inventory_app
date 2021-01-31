import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Recibo = {
  usuario_id: 0,
  lineas: [],
};

const reciboSlice = createSlice({
  name: "recibos",
  initialState,
  reducers: {
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

export const { pushLinea, addRecibo, deleteLinea } = reciboSlice.actions;

export default reciboSlice.reducer;
