import { useState } from "react";
import SelectsOptions from "../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { addClienteId } from "../../../../../redux/features/recibo/reciboSlice";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useStyle } from "../../../useStyle";

export default function HeaderTable({ creditState, clienteState }) {
  const classes = useStyle();
  const [isCredit, setIsCredit] = creditState;
  const [clientId, setClientId] = clienteState;
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setClientId(e.target.value);
    dispatch(addClienteId(e.target.value));
  };
  return (
    <Paper>
      <SelectsOptions
        className={classes.selects}
        onChange={onChangeHandler}
        name="cliente"
        url={"clientes"}
        value={clientId}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={isCredit}
            onChange={(e) => setIsCredit(!isCredit)}
            name="checkedB"
            color="primary"
          />
        }
        label="Credito"
      />
    </Paper>
  );
}
