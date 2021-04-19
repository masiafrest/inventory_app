import { TextField, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { useDispatch } from "react-redux";
import {
  deleteLinea,
  modQty,
} from "../../../../redux/features/recibo/reciboSlice";

export default function ModQty({ item, reciboTipo, idx }) {
  const dispatch = useDispatch();

  const DelRow = ({ reciboTipo }) => {
    const handleClick = () => {
      const tipoAndId = { tipo: reciboTipo, item_id: item.id };
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
      qty: item.qty + num,
    };
    if (payload.qty < 1) payload.qty = 1
    dispatch(modQty(payload));
  };

  const onChangeHandle = e => {
    const payload = {
      idx,
      tipo: reciboTipo,
      qty: e.target.value,
    };
    dispatch(modQty(payload));

  }

  return (
    <>
      <DelRow reciboTipo={reciboTipo} />
      <TextField style={{ width: 30 }} value={item.qty} onChange={onChangeHandle} />
      <IconButton size="small" onClick={() => handleArrowClick(1)}>
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton size="small" onClick={() => handleArrowClick(-1)}>
        <KeyboardArrowDownIcon />
      </IconButton>
    </>
  );
}
