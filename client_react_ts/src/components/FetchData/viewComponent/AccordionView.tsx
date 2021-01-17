import React from "react";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Paper,
  Box,
  Typography,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PostAddIcon from "@material-ui/icons/PostAdd";

export default function AccordionView({ dataState, details }) {
  const history = useHistory();

  let { data } = dataState;
  if (!data) {
    data = dataState;
  }

  const accordionSumary = data.map((e) => {
    let image;
    if (e.image_url) {
      //algo pasa con el useDataApi, q hace varias request q regresa vacio dando problema al Json.parse(undefined) y al ultimo regresa con dato
      image = JSON.parse(e.image_url)[0];
    }

    const onClickHandler = () => history.push("/items");

    const accordionDetails = e.inventarios.map((inv: any) => {
      return (
        <Grid key={inv.id} container spacing={1} direction="column">
          <Box border={2}>
            {details(inv)}
            <Typography>{`Precio: ${inv.precio.precio}`}</Typography>
            <Grid container direction="row">
              <IconButton onClick={onClickHandler}>
                <PostAddIcon />
              </IconButton>
              <IconButton>
                <ReceiptIcon />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      );
    });

    return (
      <Accordion key={e.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={8}>
              {details(e)}
            </Grid>
            <Grid item sm={4} container alignContent="center" justify="center">
              <img
                style={{ height: 100, width: 100 }}
                src={`http://localhost:5050/uploads/${image}`}
              />
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>{accordionDetails}</AccordionDetails>
      </Accordion>
    );
  });
  return (
    <>
      <Typography variant="h3" style={{ margin: 20, textAlign: "center" }}>
        Items
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
