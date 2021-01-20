import React from "react";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { capitalizeFirstChart, deleteSlashChart } from "../../../utils/helper";

import { Typography, TextField, Button, Grid } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const dataNeededPost = {
  Signin: ["nombre", "password"],
  "Add/categorias": ["nombre"],
  "Add/roles": ["tipo"],
  "Add/lugares": ["tipo", "direccion"],
  "Add/clientes": ["nombre", "telefono", "direccion"],
  "Add/proveedores": ["nombre", "telefono", "direccion"],
  //sku autogenerate, categoria, lugar, proveedor id
  "Add/items": [
    "marca",
    "modelo",
    "color",
    "barcode",
    "qty",
    "precio",
    "precio_min",
    "costo",
  ],
};

export default function PostData({ handleSubmit, control, onSubmit, error }) {
  const location = useLocation();
  const { pathname } = location;

  const path = capitalizeFirstChart(deleteSlashChart(pathname));

  function GridInput({ control, name }) {
    const label: string = name[0].toUpperCase() + name.slice(1);
    return (
      <Grid item>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ onChange, value }) => (
            <TextField
              label={label}
              onChange={onChange}
              value={value}
              error={error ? true : false}
              helperText={error}
            />
          )}
        />
      </Grid>
    );
  }
  const renderForm = dataNeededPost[path].map((e) => (
    <GridInput control={control} name={e} />
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        spacing={2}
      >
        <Typography variant="h3">{path}</Typography>
        {renderForm}
        {error && <Typography>{error}</Typography>}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
