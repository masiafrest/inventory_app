import { useState } from "react";
import SelectsOptions from "../../../../../components/SelectsOptions";
import { Typography, Paper } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { addClienteId } from "../../../../../redux/features/recibo/reciboSlice";

export default function HeaderTable() {
  const dispatch = useDispatch();
  const recibo = useSelector((state: RootState) => state.recibo);
  const [cliente, setCliente] = useState([]);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    const clienteReciboTipo = {
      tipo: "venta",
      empresa_cliente_id: e.target.value,
    };
    dispatch(addClienteId(clienteReciboTipo));
    setCliente(e.target.value);
  };
  return (
    <Paper>
      <SelectsOptions
        form={cliente}
        onChange={onChangeHandler}
        name="cliente"
        url={"clientes"}
      />
    </Paper>
  );
}
