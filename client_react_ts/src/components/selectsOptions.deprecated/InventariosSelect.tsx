import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";

export default function InventariosSelect({ onChange }) {
  const [inventarios, setInventarios] = useState<Item[]>([]);
  useEffect(() => {
    axios
      .get("/items/inventarios")
      .then((res) => {
        setInventarios(res.data);
        console.log(res.data);
        console.log(inventarios);
      })
      .catch((err) => console.log(err));
  }, []);

  const itemMenuItem = inventarios.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {`${item.marca}, ${item.modelo}`}
    </MenuItem>
  ));

  return (
    <Grid item key="item-select">
      <InputLabel id="item_id">Inventarios</InputLabel>
      <Select onChange={onChange} labelId="item_id" id="item_id" value="">
        {itemMenuItem}
      </Select>
    </Grid>
  );
}
