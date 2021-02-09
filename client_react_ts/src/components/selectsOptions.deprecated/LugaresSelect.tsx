import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

interface Lugares {
  id: number;
  nombre: string;
  [type: string]: string | null | number;
}
export default function LugaresSelect({ onChange }) {
  const [lugares, setLugares] = useState<Lugares[]>([]);
  useEffect(() => {
    axios
      .get("/lugares")
      .then((res) => {
        setLugares(res.data);
        console.log(res.data);
        console.log(lugares);
      })
      .catch((err) => console.log(err));
  }, []);

  const lugarMenuItem = lugares.map((lugar) => (
    <MenuItem key={lugar.id} value={lugar.id}>
      {lugar.direccion}, {lugar.tipo}
    </MenuItem>
  ));

  return (
    <Grid item key="lugar-select">
      <FormControl fullWidth>
        <InputLabel id="lugar_id">Lugares</InputLabel>
        <Select onChange={onChange} labelId="lugar_id" id="lugar_id" value="">
          {lugarMenuItem}
        </Select>
      </FormControl>
    </Grid>
  );
}
