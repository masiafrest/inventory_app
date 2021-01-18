import React, { useContext } from "react";
import { DataContext } from "../FetchDataContainer";
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

export default function InvLogs({ details }) {
  const { dataState, setDataState } = useContext(DataContext);
  const { data } = dataState;
  console.log("INV", data);

  const accordionSumary = data.map((e) => {
    const accordionDetails = (inv: any) => {
      console.log("inv map ", inv);
      return (
        <Grid key={inv.id} container spacing={1} direction="column">
          <Box border={2}>{details(inv)}</Box>
        </Grid>
      );
    };
    // const date = format(e.created_at, "dd/MM/yyyy");
    // console.log("date: ", date);
    return (
      <Accordion key={e.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={8}>
              <Typography>{`Fecha: ${e.created_at}`}</Typography>
              <Typography>{`Usuario: ${e.usuario.nombre}`}</Typography>
              {e.cliente ? (
                <Typography>{`Cliente: ${e.cliente.nombre}`}</Typography>
              ) : null}
              {e.proveedor ? (
                <Typography>{`Proveedor: ${e.proveedor.nombre}`}</Typography>
              ) : null}
              {details(e, "evento ajuste")}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>{accordionDetails(e.inventario)}</AccordionDetails>
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
