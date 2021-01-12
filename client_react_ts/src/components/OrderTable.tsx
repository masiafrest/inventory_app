import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import AddBoxIcon from "@material-ui/icons/AddBox";

//redux
import { RootState } from "../redux/rootReducer";
import { useSelector } from "react-redux";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num: number) {
  return num ? `${num.toFixed(2)}` : 0.0;
}

function priceRow(qty: number, price: number) {
  return qty * price;
}

interface ItemRow {
  sku: string;
  marca: string;
  modelo: string;
  qty: number;
  price: number;
  total?: number;
}
function createRow(
  sku: string | any,
  marca: string | any,
  modelo: string | any,
  qty: number | any,
  price: number | any
): ItemRow {
  const total = priceRow(qty, price);
  return { sku, marca, modelo, qty, price, total };
}

const ShowRows = ({ rows }) => {
  return rows.map((row) => (
    <TableRow key={row.sku}>
      <TableCell align="left">{row.sku}</TableCell>
      <TableCell align="left">{row.marca}</TableCell>
      <TableCell align="left">{row.modelo}</TableCell>
      <TableCell align="left">{row.qty}</TableCell>
      <TableCell align="left">{row.price}</TableCell>
      <TableCell align="left">{ccyFormat(row.price)}</TableCell>
    </TableRow>
  ));
};

let rows: ItemRow[] = [];

function subtotal(items: ItemRow[]) {
  console.log("function subtotal: ", items);
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

let invoiceSubtotal;
let invoiceTaxes;
let invoiceTotal;

function OrderTable() {
  const recibo: Recibo = useSelector((state: RootState) => state.recibo);
  const [item, setItem] = useState<ItemRow[]>([]);
  const { lineas } = recibo;
  const classes = useStyles();

  useEffect(() => {
    if (lineas.length > 0) {
      lineas.map((linea) => {
        const { sku, marca, modelo, qty, precio } = linea;
        const row = createRow(sku, marca, modelo, qty, precio);
        rows.push(row);
        setItem(rows);
        invoiceSubtotal = subtotal(rows);
        invoiceTaxes = TAX_RATE * invoiceSubtotal;
        invoiceTotal = invoiceTaxes + invoiceSubtotal;
        console.log("subtotal; ", invoiceSubtotal, invoiceTaxes, invoiceTotal);
        console.log("set item: ", item);
      });
    }
  }, [lineas]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="spanning table" padding="none" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right" colSpan={2}>
              Price
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Sku</TableCell>
            <TableCell align="left">Marca</TableCell>
            <TableCell align="left">Modelo</TableCell>
            <TableCell align="left">Qty.</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {<ShowRows rows={item} />}
          <TableRow>
            <IconButton onClick={() => {}}>
              <AddBoxIcon />
            </IconButton>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
