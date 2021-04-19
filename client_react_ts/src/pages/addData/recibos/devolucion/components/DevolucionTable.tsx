import {
  IconButton,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

import ModQty from "../../components/ModQty";

export default function DevolucionTable({ items }: { items: Item[] }) {
  const showRows = items.map((item, idx) => (
    <TableRow key={item.id}>
      <TableCell align="left">
        <ModQty item={item} reciboTipo="venta" idx={idx} />
      </TableCell>
      <TableCell align="left">{`${item.marca} ${item.modelo} ${item.color} ${item.descripcion} id: ${item.id} `}</TableCell>
      <TableCell align="right">elegir tipo de devolucion</TableCell>
      <TableCell align="right">motivo...</TableCell>
    </TableRow>
  ));
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 300 }} padding="default" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="right">tipo de Devolucion</TableCell>
            <TableCell align="right">Motivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showRows}
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
