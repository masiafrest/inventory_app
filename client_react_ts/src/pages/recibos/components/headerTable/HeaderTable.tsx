import { useState } from "react";
import SelectsOptions from "../../../../components/SelectsOptions";
import { Typography, Paper } from "@material-ui/core";

export default function HeaderTable() {
  const [selectForm, setSelectForm] = useState();

  const onChangeHandler = (e) => {};
  return (
    <Paper>
      <Typography>Cliente: </Typography>
      <SelectsOptions
        form={setSelectForm}
        onChange={onChangeHandler}
        name="cliente"
        url={"empresa_cliente"}
      />
    </Paper>
  );
}
