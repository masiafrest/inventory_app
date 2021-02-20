import React from "react";
import { Paper, Grid } from "@material-ui/core";

export default function WithPaperView({ children, dataArr }) {
  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };
  return (
    <Paper
      key={dataArr.id}
      style={paperStyle}
      variant="elevation"
      elevation={12}
    >
      <Grid key={dataArr.id} container spacing={1}>
        {children}
      </Grid>
    </Paper>
  );
}
