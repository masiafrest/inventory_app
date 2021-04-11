import { useState } from "react";
import SelectsOptions from "../../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { addClienteId } from "../../../../../../redux/features/recibo/reciboSlice";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useStyle } from "../../../../useStyle";

export default function HeaderTable({ creditState, clienteState }) {
  const classes = useStyle();
  const [isCredit, setIsCredit] = creditState;
  const [clienteId, setClienteId] = clienteState;
  const dispatch = useDispatch();
  const [cliente] = useState([]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setClienteId(e.target.value);
    dispatch(addClienteId(e.target.value));
    console.log(cliente);
  };
  return (
    <Paper>
      <SelectsOptions
        className={classes.selects}
        form={cliente}
        onChange={onChangeHandler}
        name="cliente"
        url={"clientes"}
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
