import { useState } from "react";
import SelectsOptions from "../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { addClienteId } from "../../../../../redux/features/recibo/reciboSlice";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { useStyle } from "../../../useStyle";
import axios from "axios";

export default function Header() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [cliente] = useState([]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    dispatch(addClienteId(e.target.value));
    //enviar cliente id para buscar recibo venta_id

    // setCliente(e.target.value);
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
    </Paper>
  );
}
