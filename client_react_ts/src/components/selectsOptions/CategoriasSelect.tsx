import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";

interface Categorias {
  id: number;
  nombre: string;
  [type: string]: string | null | number;
}
export default function CategoriasSelect({ onChange }) {
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  useEffect(() => {
    axios
      .get("/categorias")
      .then((res) => {
        setCategorias(res.data);
        console.log(res.data);
        console.log(categorias);
      })
      .catch((err) => console.log(err));
  }, []);

  const categoriaMenuItem = categorias.map((categoria) => (
    <MenuItem key={categoria.id} value={categoria.id}>
      {categoria.nombre}
    </MenuItem>
  ));

  return (
    <Grid item key="categoria-select">
      <InputLabel id="categoria_id">Categorias</InputLabel>
      <Select
        onChange={onChange}
        labelId="categoria_id"
        id="categoria_id"
        name="categoria_id"
      >
        {categoriaMenuItem}
      </Select>
    </Grid>
  );
}
