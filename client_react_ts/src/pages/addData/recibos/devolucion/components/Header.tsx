import { useState } from "react";
import SelectsOptions from "../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { addClienteId } from "../../../../../redux/features/recibo/reciboSlice";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useStyle } from "../../../useStyle";
import axios from "axios";

export default function Header({ useStates }) {
  const classes = useStyle();
  const [clientId, setClientId] = useStates;

  return (
    <Paper>
      <SelectsOptions
        className={classes.selects}
        onChange={(e) => setClientId(e.target.value)}
        name="cliente"
        url={"clientes"}
        value={clientId}
      />
      {clientId ? clientId : "selecciona un cliente"}
    </Paper>
  );
}
