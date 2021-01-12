import React from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const ShowRows = ({ rows, ccyFormat }) => {
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

function OrderTable({ item, ccyFormat, invoice, tax, onClickHandler }) {
  const classes = useStyles();
  const { Subtotal, Taxes, Total } = invoice;

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
          {<ShowRows rows={item} ccyFormat={ccyFormat} />}
          <TableRow>
            <IconButton onClick={onClickHandler}>
              <AddBoxIcon />
            </IconButton>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(Subtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell align="right">{`${(tax * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(Taxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(Total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
