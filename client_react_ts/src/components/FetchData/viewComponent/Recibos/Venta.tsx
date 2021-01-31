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

export default function Venta() {
  const { dataState } = useContext(DataContext);
  const { data } = dataState;
  console.log("venta", data);
  const accordionSumary = data.map((e) => {
    console.log(e);
    const accordionDetails = (lineas: any) => {
      return lineas.map((linea) => {
        console.log(linea);
        return (
          <TableRow>
            <TableCell align="left">{linea.inventario.sku}</TableCell>
            <TableCell align="left">{linea.inventario.marca}</TableCell>
            <TableCell align="left">{linea.inventario.modelo}</TableCell>
            <TableCell align="left">{linea.qty}</TableCell>
            <TableCell align="left">{linea.precio}</TableCell>
            <TableCell align="left">{linea.qty * linea.precio}</TableCell>
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
              <Typography>{`Sub total: ${e.sub_total}`}</Typography>
              <Typography>{`Tax: ${e.tax}`}</Typography>
              <Typography>{`Total: ${e.total}`}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Table padding="none">
            <TableHead>
              <TableRow>
                <TableCell align="left">Sku</TableCell>
                <TableCell align="left">Marca</TableCell>
                <TableCell align="left">Modelo</TableCell>
                <TableCell align="left">Qty.</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Sum</TableCell>
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
        Recibos Ventas
      </Typography>
      {accordionSumary}
    </>
  );
}
