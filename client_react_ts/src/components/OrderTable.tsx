import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const TAX_RATE = 0.07;
const itemData: any = {
  id: 35,
  nombre: "dos",
  descripcion: "hello",
  modelo: "world",
  barcode: null,
  image_url:
    '["images-1609800290381-555.3852096919965.png","images-1609800290388-708.3983539599237.png"]',
  categoria_id: 1,
  categoria_2_id: null,
  categoria: {
    id: 1,
    nombre: "audifono",
  },
  inventarios: [
    {
      id: 66,
      item_id: 35,
      qty: 10,
      lugar_id: 1,
      basura: null,
      color: "red",
      precio_id: 65,
      sku: "dos-red",
      lugares: {
        id: 1,
        tipo: "tienda",
        direccion: "dorado",
      },
      precio: {
        id: 65,
        precio: 2.99,
        oferta: null,
        oferta_precio: null,
        costo: 0.99,
        precio_min: 1.99,
        proveedor_id: 1,
      },
    },
    {
      id: 68,
      item_id: 35,
      qty: 10,
      lugar_id: 1,
      basura: null,
      color: "bl",
      precio_id: 67,
      sku: "dos-bl",
      lugares: {
        id: 1,
        tipo: "tienda",
        direccion: "dorado",
      },
      precio: {
        id: 67,
        precio: 2.99,
        oferta: null,
        oferta_precio: null,
        costo: 0.99,
        precio_min: 1.99,
        proveedor_id: 1,
      },
    },
  ],
};
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, price: number) {
  return qty * price;
}

function createRow(
  sku: string,
  marca: string,
  modelo: string,
  qty: number,
  price: number
) {
  const total = priceRow(qty, price);
  return { sku, marca, modelo, qty, price, total };
}

interface Row {
  sku: string;
  marca: string;
  modelo: string;
  qty: number;
  price: number;
}

function subtotal(items: Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("pap-box", "Paperclips (Box)", "ab", 100, 1.15),
  createRow("pap-cas", "Paper (Case)", "ab", 10, 45.99),
  createRow("was-bas", "Waste Basket", "ec", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function OrderTable() {
  const classes = useStyles();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {}, [itemList]);

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
          {rows.map((row) => (
            <TableRow key={row.sku}>
              <TableCell align="left">{row.sku}</TableCell>
              <TableCell align="left">{row.marca}</TableCell>
              <TableCell align="left">{row.modelo}</TableCell>
              <TableCell align="left">{row.qty}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
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
