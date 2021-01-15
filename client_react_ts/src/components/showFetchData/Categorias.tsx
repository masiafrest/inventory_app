import React from "react";

import { Paper, Typography, Fab } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function Categorias({ dataState }) {
  const { data } = dataState;

  const paperStyle = { margin: 20, padding: 20, paddingLeft: 50 };

  const elements = data.map((e) => {
    return (
      <Paper style={paperStyle} variant="elevation" elevation={12}>
        <Typography>{`Nombre: ${e.nombre}`}</Typography>
      </Paper>
    );
  });
  return (
    <>
      <Typography variant="h3" style={{ margin: 20, textAlign: "center" }}>
        Categorias
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
