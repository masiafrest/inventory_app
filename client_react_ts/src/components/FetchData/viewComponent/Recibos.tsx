import React from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

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

export default function InvLogs({ dataState, details }) {
  const history = useHistory();
  let { data } = dataState;
  console.log("INV", data);
  if (!data) {
    data = dataState;
  }
  const accordionSumary = data.map((e) => {
    const accordionDetails = (linea: any) => {
      console.log("linea map ", linea);
      return (
        <Grid key={linea.id} container spacing={1} direction="column">
          <Box border={2}>
            {details(linea, "qty precio tax total".split(" "))}
          </Box>
        </Grid>
      );
    };
    // const date = format(e.created_at, "dd/MM/yyyy");
    // console.log("date: ", date);
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={8}>
              <Typography>{`Fecha: ${e.created_at}`}</Typography>
              {details(
                e,
                "usuario cliente fecha total sub_total tax".split(" ")
              )}
              <Typography>{`Usuario: ${e.usuario.nombre}`}</Typography>
              {e.cliente == null ? null : (
                <Typography>{`Cliente: ${e.cliente?.nombre}`}</Typography>
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>{accordionDetails(e.lineas)}</AccordionDetails>
      </Accordion>
    );
  });

  return (
    <>
      <Typography variant="h3" style={{ margin: 20, textAlign: "center" }}>
        Items Logs
      </Typography>
      {accordionSumary}
    </>
  );
}
