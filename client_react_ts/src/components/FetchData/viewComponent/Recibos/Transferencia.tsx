import React, { useContext } from "react";
import { DataContext } from "../../FetchDataContainer";

import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function Transferencia() {
  const { data } = useContext(DataContext);

  console.log("devolucion", data);
  const accordionSumary = data.map((e) => {
    console.log(e);
    const accordionDetails = (lineas: any) => {
      return lineas.map((linea) => {
        console.log(linea);
        return (
          <TableRow>
            <TableCell align="left">{linea.sku}</TableCell>
            <TableCell align="left">{linea.qty}</TableCell>
            <TableCell align="left">{linea.origen.tipo}</TableCell>
            <TableCell align="left">{linea.destino.tipo}</TableCell>
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
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Table padding="none">
            <TableHead>
              <TableRow>
                <TableCell align="left">Sku </TableCell>
                <TableCell align="left">Qty</TableCell>
                <TableCell align="left">Origen</TableCell>
                <TableCell align="left">Destino</TableCell>
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
        Recibos Transferencia
      </Typography>
      {accordionSumary}
    </>
  );
}
