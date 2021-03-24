import { useState } from "react";
import SelectsOptions from "../../../../components/SelectsOptions";
import { Typography, Paper } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { addClienteId } from "../../../../redux/features/recibo/reciboSlice";

export default function HeaderTable() {
  const dispatch = useDispatch();
  const recibo = useSelector((state: RootState) => state.recibo);
  const [selectForm, setSelectForm] = useState();

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    dispatch(addClienteId(e.target.value));
    setSelectForm(e.target.value);
  };
  return (
    <Paper>
      <SelectsOptions
        form={setSelectForm}
        onChange={onChangeHandler}
        name="cliente"
        url={"clientes"}
      />
    </Paper>
  );
}
