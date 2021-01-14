import React from "react";

import {
  Grid,
  Paper,
  Typography,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function Items({ dataState }) {
  const { data } = dataState;

  const paperStyle = { margin: 20, padding: 20, paddingLeft: 50 };

  const elements = data.map((e) => {
    let image;
    if (e.image_url) {
      //algo pasa con el useDataApi, q hace varias request q regresa vacio dando problema al Json.parse(undefined) y al ultimo regresa con dato
      image = JSON.parse(e.image_url)[0];
    }
    return (
      <Accordion>
        <AccordionSummary>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={8}>
              <Typography>{`Marca: ${e.marca}`}</Typography>
              <Typography>{`Modelo: ${e.modelo}`}</Typography>
              <Typography>{`Descripcion: ${e.descripcion}`}</Typography>
            </Grid>
            <Grid item sm={4} container alignContent="center">
              <img
                style={{ height: 100, width: 100 }}
                src={`http://localhost:5050/uploads/${image}`}
              />
            </Grid>
          </Grid>
        </AccordionSummary>
      </Accordion>
    );
  });
  return (
    <>
      <Typography variant="h3" style={{ margin: 20, textAlign: "center" }}>
        Items
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
