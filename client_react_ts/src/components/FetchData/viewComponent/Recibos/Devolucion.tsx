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
// TODO: mejorar la forma en como muestra la informacion
export default function Devolucion() {
  const { dataState } = useContext(DataContext);
  const { data } = dataState;
  console.log("devolucion", data);
  const accordionSumary = data.map((e) => {
    console.log(e);
    const accordionDetails = (lineas: any) => {
      return lineas.map((linea) => {
        console.log(linea);
        return (
          <TableRow>
            <TableCell align="left">{linea.invEntrada.sku}</TableCell>
            <TableCell align="left">{linea.invEntrada.marca}</TableCell>
            <TableCell align="left">{linea.invEntrada.modelo}</TableCell>
            <TableCell align="left">{linea.invEntrada.color}</TableCell>
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
                <TableCell align="left">item devuelto</TableCell>
                <TableCell align="left">marca</TableCell>
                <TableCell align="left">modelo</TableCell>
                <TableCell align="left">color</TableCell>
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
        Recibos Devolucion
      </Typography>
      {accordionSumary}
    </>
  );
}
