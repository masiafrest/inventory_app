import { useState } from "react";
import SelectsOptions from "../../../../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../../redux/rootReducer";
import { addClienteId } from "../../../../../../redux/features/recibo/reciboSlice";

export default function HeaderTable() {
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
      <form>
        <SelectsOptions
          form={cliente}
          onChange={onChangeHandler}
          name="cliente"
          url={"clientes"}
        />
      </form>
    </Paper>
  );
}