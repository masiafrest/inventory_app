import { useEffect, useState } from "react";
import SelectsOptions from "../../../components/SelectsOptions";
import { Paper } from "@material-ui/core";

import {
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { useStyle } from "../../../useStyle";
export interface VentaYDevoluciones {
  ventas?: VentasEntity[] | null;
  devoluciones?: null[] | null;
}
export interface VentasEntity {
  id: number;
  venta_id: number;
  item_id: number;
  qty: number;
  precio: number;
  tax?: null;
  total?: null;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  item: Item;
}
export interface Item {
  id: number;
  marca: string;
  modelo: string;
  color: string;
  stock: number;
  descripcion: string;
  barcode: string;
  sku: string;
  precio_id: number;
  categoria_id: number;
  categoria_2_id?: null;
  lugar_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
}
interface UseStates {
  clientId: any;
  setClientId: any;
  selectedItemId: any;
  setSelectedItemId: any;
  hasLineas: any;
  setHasLineas: any;
  lineas: VentaYDevoluciones;
  setLineas: any;
}

export default function Header({ useStates }) {
  const classes = useStyle();
  const [
    clientId,
    setClientId,
    selectedItems,
    setSelectedItems,
    hasLineas,
    setHasLineas,
    lineas,
    setLineas,
  ] = useStates;

  const menuItems = lineas?.ventas?.map((linea) => (
    <MenuItem
      value={[linea.item, linea.id]}
    >{`${linea.item.marca} ${linea.item.modelo} ${linea.item.descripcion}, recibo N° ${linea.venta_id}`}</MenuItem>
  ));

  return (
    <Paper>
      <SelectsOptions
        className={classes.selects}
        onChange={(e) => {
          setClientId(e.target.value);
        }}
        name="cliente"
        url={"clientes"}
        value={clientId}
      />

      {hasLineas ? (
        <>
          <InputLabel id={"lineas"}>Item a devolver</InputLabel>
          <Select
            onChange={(e) => {
              const { value } = e.target;
              const item = value[0];
              const lineaId = value[1];
              setSelectedItems(selectedItems.concat(item));

              const newVentas = lineas.ventas.filter(
                (lineaVenta) => lineaVenta.id !== lineaId
              );

              setLineas((prevState) => {
                return { ...prevState, ventas: newVentas };
              });
              // if (lineas.ventas.length === 1) setHasLineas(false);
            }}
            labelId={"lineas"}
            id={"lineas"}
            name={"lineas"}
            fullWidth
          >
            {menuItems}
          </Select>
        </>
      ) : (
        "aqui aparece un select item a devolver"
      )}
    </Paper>
  );
}
