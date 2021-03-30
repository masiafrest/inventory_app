import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushLinea } from "../../../../redux/features/recibo/reciboSlice";
import { RootState } from "../../../../redux/rootReducer";

export default function AddBtn({ obj, reciboTipo, children }) {
  const recibo = useSelector((state: RootState) => state.recibo);
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        const { lineas } = recibo[reciboTipo];
        const newLinea = { ...obj };
        newLinea.tipo = reciboTipo;
        newLinea.qty = 1;
        dispatch(pushLinea(newLinea));
      }}
    >
      {children}
    </Button>
  );
}
