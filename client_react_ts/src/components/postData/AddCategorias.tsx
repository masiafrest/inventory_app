import React from "react";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

export default function AddCategorias() {
  const { register, handleSubmit, watch, errors, control } = useForm();
  const location = useLocation();
  console.log(location);

  const onSubmit = (data) => console.log(data);

  console.log(watch("nombre")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="nombre"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <TextField label="nombre" onChange={onChange} value={value} />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
    </form>
  );
}
