import { useState } from "react";
import SelectsOptions from "../../../../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../redux/rootReducer";
import { addClienteId } from "../../../../../../redux/features/recibo/reciboSlice";
import {
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

export default function HeaderTable({ creditState }) {
  const [isCredit, setIsCredit] = creditState
  const dispatch = useDispatch();
  const [cliente] = useState([]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    dispatch(addClienteId(e.target.value));
    // setCliente(e.target.value);
    console.log(cliente);
  };
  return (
    <Paper>
      <SelectsOptions
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
