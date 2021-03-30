import { TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { RootState } from "../../../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLinea,
  modQty,
} from "../../../redux/features/recibo/reciboSlice";

export default function ModQty({ row, reciboTipo, idx }) {
  const dispatch = useDispatch();
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);

  const DelRow = () => {
    const handleClick = () => {
      const tipoAndId = { tipo: "venta", item_id: row.id };
      dispatch(deleteLinea(tipoAndId));
    };
    return (
      <IconButton size="small" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    );
  };

  const handleArrowClick = (num) => {
    const payload = {
      idx,
      tipo: reciboTipo,
      qty: row.qty + num,
    };
    dispatch(modQty(payload));
  };

  return (
    <>
      <DelRow />
      <TextField style={{ width: 30 }} value={row.qty} />
      <IconButton size="small" onClick={() => handleArrowClick(1)}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton size="small" onClick={() => handleArrowClick(-1)}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </>
  );
}
