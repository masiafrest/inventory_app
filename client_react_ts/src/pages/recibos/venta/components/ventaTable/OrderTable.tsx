import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import AddBoxIcon from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch } from "react-redux";
import { deleteLinea } from "../../../../../redux/features/recibo/reciboSlice";

const DelRow = ({ item_id }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(item_id);
    const tipoAndId = { tipo: "venta", item_id };
    dispatch(deleteLinea(tipoAndId));
    window.location.reload();
  };
  return (
    <IconButton size="small" onClick={handleClick}>
      <DeleteIcon />
    </IconButton>
  );
};

const ShowRows = ({ rows }) => {
  console.log(rows);
  return rows.map((row) => (
    <TableRow key={row.id}>
      <TableCell align="left">
        <DelRow item_id={row.id} />
        {row.qty}
      </TableCell>
      <TableCell align="left">{`${row.marca} ${row.modelo} ${row.color} ${row.descripcion} `}</TableCell>
      <TableCell align="right">{row.precio.precio.toFixed(2)}</TableCell>
      <TableCell align="right">
        {(row.precio.precio * row.qty).toFixed(2)}
      </TableCell>
    </TableRow>
  ));
};

function OrderTable({ items, invoice, tax, onClickHandler }) {
  console.log(invoice);
  const [Subtotal, Taxes, Total] = invoice;
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 300 }} padding="default" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {<ShowRows rows={items} />}
          <TableRow>
            <IconButton size="small" onClick={onClickHandler}>
              <AddBoxIcon />
            </IconButton>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{Subtotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={1}>Tax</TableCell>
            <TableCell align="right">{`${(tax * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{Taxes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{Total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
