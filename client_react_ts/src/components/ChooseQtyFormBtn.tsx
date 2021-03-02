import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { pushLinea, addRecibo } from "../redux/features/recibo/reciboSlice";

export default function ChooseQtyFormBtn({ inv }) {
  console.log("choosebtnform, ", inv);
  const recibo = useSelector((state: RootState) => state.recibo);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);

  const handleChange = (e) => {
    setQty(e.target.value);
  };

  const addToCartHandler = (inv) => {
    const { lineas } = recibo;
    console.log(qty);
    console.log("lineas ", lineas);
    const newLinea = { ...inv };
    newLinea.qty = qty;
    dispatch(pushLinea(newLinea));
  };
  return (
    <>
      <TextField label="qty" onChange={handleChange} />
      <Button onClick={() => addToCartHandler(inv)}>agregar al recibo</Button>
    </>
  );
}
