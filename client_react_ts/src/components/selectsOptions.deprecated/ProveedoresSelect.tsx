import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";

interface Proveedores {
  id: number;
  nombre: string;
  [type: string]: string | null | number;
}
export default function ProveedoresSelect({ onChange }) {
  const [proveedores, setProveedores] = useState<Proveedores[]>([]);
  useEffect(() => {
    axios
      .get("/proveedores")
      .then((res) => {
        setProveedores(res.data);
        console.log(res.data);
        console.log(proveedores);
      })
      .catch((err) => console.log(err));
  }, []);

  const proveedorMenuItem = proveedores.map((proveedor) => (
    <MenuItem key={proveedor.id} value={proveedor.id}>
      {proveedor.nombre}
    </MenuItem>
  ));

  return (
    <Grid item key="proveedor-select">
      <InputLabel id="proveedor_id">Proveedores</InputLabel>
      <Select
        onChange={onChange}
        labelId="proveedor_id"
        id="proveedor_id"
        value=""
      >
        {proveedorMenuItem}
      </Select>
    </Grid>
  );
}
