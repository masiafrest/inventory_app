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
import { VentaYDevoluciones, Item } from '../'

const ShowRows = ({ items }) => {
  console.log(items);
  return items.map((item, idx) => (
    <TableRow key={item.id}>
      <TableCell align="left">
        <ModQty item={item} reciboTipo="venta" idx={idx} />
      </TableCell>
      <TableCell align="left">{`${item.marca} ${item.modelo} ${item.color} ${item.descripcion} id: ${item.id} `}</TableCell>
      <TableCell align="right">{item.precio.precio.toFixed(2)}</TableCell>
      <TableCell align="right">
        {(item.precio.precio * item.qty).toFixed(2)}
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
          {<ShowRows items={[]} />}
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
