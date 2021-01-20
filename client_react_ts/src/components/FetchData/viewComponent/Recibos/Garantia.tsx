import React, { useContext } from "react";
import { DataContext } from "../../FetchDataContainer";
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
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PostAddIcon from "@material-ui/icons/PostAdd";

export default function Garantia() {
  const { dataState, setDataState } = useContext(DataContext);
  const { data } = dataState;
  console.log("devolucion", data);
  const accordionSumary = data.map((e) => {
    console.log(e);
    const accordionDetails = (lineas: any) => {
      return lineas.map((linea) => {
        console.log(linea);
        return (
          <TableRow>
            <TableCell align="left">{linea.inventario.sku}</TableCell>
            <TableCell align="left">{linea.qty}</TableCell>
            <TableCell align="left">{linea.descripcion}</TableCell>
          </TableRow>
        );
      });
    };
    // const date = format(e.created_at, "dd/MM/yyyy");
    // console.log("date: ", date);
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={8}>
              <Typography>{`N. Recibo: ${e.id}`}</Typography>
              <Typography>{`Fecha: ${e.created_at}`}</Typography>
              <Typography>{`Vendedor: ${e.usuario.nombre}`}</Typography>
              <Typography>{`Cliente: ${e.cliente.nombre}`}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Table padding="none">
            <TableHead>
              <TableRow>
                <TableCell align="left">Sku</TableCell>
                <TableCell align="left">Qty</TableCell>
                <TableCell align="left">Descripcion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{accordionDetails(e.lineas)}</TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <>
      <Typography variant="h3" style={{ margin: 20, textAlign: "center" }}>
        Recibos Garantia
      </Typography>
      {accordionSumary}
    </>
  );
}
