import React, { useContext } from "react";
import { Paper, Typography, Fab, Grid } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function PaperView({ key, details, images, path }) {
  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };

  return (
    <>
      <Paper key={key} style={paperStyle} variant="elevation" elevation={12}>
        <Grid key={key} container spacing={3} justify="center">
          <Grid key={key} item xs={12} sm={8}>
            {details}
          </Grid>
          {images && (
            <Grid key={key} item sm={4} container alignContent="center">
              <img
                alt=""
                style={{ height: 100, width: 100 }}
                src={`http://localhost:5050/uploads/${images}`}
              />
            </Grid>
          )}
        </Grid>
      </Paper>
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
