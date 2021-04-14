import { useState } from "react";
import SelectsOptions from "../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import {
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useStyle } from "../../../useStyle";
import axios from "axios";

export default function Header({ useStates }) {
  const classes = useStyle();
  const [clientId, setClientId] = useStates;
  const [lineas, setLineas] = useState<{ ventas: any }>();
  const [itemIdSel, setItemIdSel] = useState<number>();
  const [selectedItem, setSelectedItem] = useState<any>();

  const getLineasVentaYDevolucion = () => {
    axios.post(`/devolucion/${clientId}`).then((res) => {
      setLineas(res.data);
    });
  };

  const menuItems = lineas.ventas.map((venta) => (
    <MenuItem key={venta.id} value={venta.item_id}>
      {`${venta.item.marca} ${venta.item.modelo}`}
    </MenuItem>
  ));

  return (
    <Paper>
      <SelectsOptions
        className={classes.selects}
        onChange={(e) => setClientId(e.target.value)}
        name="cliente"
        url={"clientes"}
        value={clientId}
      />
      <Select
        onChange={(e) => setSelectedItem(e.target.value)}
        labelId={"lineas"}
        id={"lineas"}
        name={"lineas"}
        value={1}
        fullWidth
      >
        {menuItems}
      </Select>
      {lineas ? null : "lineas"}
    </Paper>
  );
}
