import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";
import { useForm, Controller } from "react-hook-form";

export default function AddCategorias() {
  const { register, handleSubmit, watch, errors, control } = useForm();
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
