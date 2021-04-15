import {
  IconButton,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

import ModQty from "../../components/ModQty";

const ShowRows = ({ rows }) => {
  console.log(rows);
  return rows.map((row, idx) => (
    <TableRow key={row.id}>
      <TableCell align="left">
        <ModQty row={row} reciboTipo="venta" idx={idx} />
      </TableCell>
      <TableCell align="left">{`${row.marca} ${row.modelo} ${row.color} ${row.descripcion} id: ${row.id} `}</TableCell>
      <TableCell align="right">{row.precio.precio.toFixed(2)}</TableCell>
      <TableCell align="right">
        {(row.precio.precio * row.qty).toFixed(2)}
      </TableCell>
    </TableRow>
  ));
};

export default function DevolucionTable({ items }) {
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
          {<ShowRows rows={[]} />}
          <TableRow>
            <TableCell colSpan={4}>
              <IconButton size="small" onClick={() => "hello"}>
                <AddBoxIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
