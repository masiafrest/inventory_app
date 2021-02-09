import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";

export default function ItemsSelect({ onChange }) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    axios
      .get("/items")
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
        console.log(items);
      })
      .catch((err) => console.log(err));
  }, []);

  const itemMenuItem = items.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {`${item.marca}, ${item.modelo}`}
    </MenuItem>
  ));

  return (
    <Grid item key="item-select">
      <InputLabel id="item_id">Items</InputLabel>
      <Select onChange={onChange} labelId="item_id" id="item_id" value="">
        {itemMenuItem}
      </Select>
    </Grid>
  );
}
