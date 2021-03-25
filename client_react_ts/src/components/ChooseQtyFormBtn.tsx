import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { pushLinea, addRecibo } from "../redux/features/recibo/reciboSlice";

export default function ChooseQtyFormBtn({ item }) {
  console.log("choosebtnform, ", item);
  const recibo = useSelector((state: RootState) => state.recibo);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);

  const handleChange = (e) => {
    setQty(e.target.value);
  };

  const addToCartHandler = (item) => {
    const { lineas } = recibo.venta;
    console.log(qty);
    console.log("lineas ", lineas);
    const newLinea = { ...item };
    newLinea.tipo = "venta";
    newLinea.qty = qty;
    dispatch(pushLinea(newLinea));
  };
  return (
    <>
      <TextField label="qty" onChange={handleChange} />
      <Button onClick={() => addToCartHandler(item)}>agregar al recibo</Button>
    </>
  );
}
