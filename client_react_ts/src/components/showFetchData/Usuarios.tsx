import React from "react";

import { Grid, Paper, Typography, Fab } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function Categorias({ dataState }) {
  let { data } = dataState;
  if (!data) {
    data = dataState;
  }
  const paperStyle = { margin: 20, padding: 20, paddingLeft: 50 };

  const elements = data.map((e) => {
    return (
      <Paper style={paperStyle} variant="elevation" elevation={12}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={8}>
            <Typography>{`Nombre: ${e.nombre}`}</Typography>
            <Typography>{`Dirrecion: ${e.rol}`}</Typography>
            <Typography>{`Telefono: ${e.telefono}`}</Typography>
            <Typography>{`Telefono 2: ${e.telefono_2}`}</Typography>
          </Grid>
          <Grid item sm={4} container alignContent="center">
            <img
              style={{ height: 100, width: 100 }}
              src={`http://localhost:5050/uploads/${e.logo_url}`}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  });
  return (
    <>
      <Typography variant="h3" style={{ margin: 20, textAlign: "center" }}>
        Usuarios
      </Typography>
      {elements}
      <Fab
        style={{ right: 50, bottom: 30, position: "fixed" }}
        variant="extended"
      >
        <AddBoxIcon />
        <Typography>agregar</Typography>
      </Fab>
    </>
  );
}
