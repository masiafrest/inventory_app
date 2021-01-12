import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";

export default function BodyAccordion({ data }) {
  const { pathname } = useLocation();

  const dataType = {
    usuarios: ["nombre", "rol", "telefono"],
    items: ["marca", "modelo", "descripcion"],
    proveedores: ["nombre", "pais", "telefono"],
  };
  const type = dataType[pathname.substring(1)];
  console.log("type: ", type);
  return (
    <>
      <Grid item direction="row" container>
        <Grid item xs>
          <Typography>{`${type[0]}: ${data[type[0]]} `}</Typography>
        </Grid>
        <Grid item xs>
          <Typography>{`${type[1]}: ${data[type[1]]}`}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid item>
        <Typography>{`${type[2]}: ${data[type[2]]}`}</Typography>
      </Grid>
    </>
  );
}
