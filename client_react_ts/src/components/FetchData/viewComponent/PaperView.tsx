import React, { useContext } from "react";
import { DataContext } from "../FetchDataContainer";
import { Paper, Typography, Fab, Grid } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function PaperView({ details, images, path }) {
  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };
  const { dataState, setDataState } = useContext(DataContext);
  const { data } = dataState;
  console.log(data);
  const accordionSumary = data.map((e) => {
    return (
      <Paper key={e.id} style={paperStyle} variant="elevation" elevation={12}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={8}>
            {details(e)}
          </Grid>
          {images(e) && (
            <Grid item sm={4} container alignContent="center">
              <img
                style={{ height: 100, width: 100 }}
                src={`http://localhost:5050/uploads/${images}`}
              />
            </Grid>
          )}
        </Grid>
      </Paper>
    );
  });
  return (
    <>
      <Typography variant="h3" style={{ margin: 20, textAlign: "center" }}>
        {path}
      </Typography>
      {accordionSumary}
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
