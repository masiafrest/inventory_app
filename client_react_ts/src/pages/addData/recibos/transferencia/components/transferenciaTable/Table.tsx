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
import { deleteLinea } from "../../../../../../redux/features/recibo/reciboSlice";

import ModQty from '../../../components/ModQty'
import SelectLugar from "../SelectLugar";


function OrderTable({ items, onClickHandler, destinoId, onSelectHandler }) {

  const showRows = items.map((row, idx) => (
    <TableRow key={row.id}>
      <TableCell align="left">
        {/* <DelRow item_id={row.id} /> */}
        {/* {row.qty} */}
        <ModQty item={row} reciboTipo="transferencia" idx={idx} />
      </TableCell>
      <TableCell align="left">{`${row.marca} ${row.modelo} ${row.color} ${row.descripcion} `}</TableCell>
      <TableCell align="center">
        {row.lugar.direccion}, {row.lugar.tipo}
      </TableCell>
      <TableCell align="center">

        <SelectLugar
          destinoId={destinoId}
          onChange={onSelectHandler}
          name="lugar"
          currLugarId={row.lugar.id}
        />
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 425 }} padding="default" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Qty</TableCell>
            <TableCell align="center">Descripcion</TableCell>
            <TableCell align="center">Origen</TableCell>
            <TableCell align="center">Destino</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showRows}
          <TableRow>
            <IconButton size="small" onClick={onClickHandler}>
              <AddBoxIcon />
            </IconButton>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
