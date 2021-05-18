import { useState } from "react";
import SelectsOptions from "../../../components/SelectsOptions";
import SelectClientes from '../../components/SelectClientes'
import { Paper } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { addClienteId } from "../../../../../redux/features/recibo/reciboSlice";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useStyle } from "../../../useStyle";

export default function HeaderTable({ creditState, clienteState }) {
  const classes = useStyle();
  const [isCredit, setIsCredit] = creditState;
  const [client, setClient] = clienteState;
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setClient(e.target.value);
    const header = {
      empresa_cliente_id: e.target.value,
      tipo: 'venta'
    }
    dispatch(addClienteId(header));
  };
  return (
    <Paper>
      <SelectClientes
        className={classes.selects}
        onChange={onChangeHandler}
        url={"clientes"}
        value={client}
        setClient={setClient}
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
