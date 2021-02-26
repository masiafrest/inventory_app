import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";

export default function SelectsOptions({ onChange, name, url, form }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log("url ", url);
    axios
      .get("/" + url)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  let menuItemToShow = [];
  switch (url) {
    case "categorias":
    case "proveedores":
      menuItemToShow.push("nombre");
      break;
    case "items":
    case "inventarios":
      menuItemToShow.push("marca");
      menuItemToShow.push("modelo");
      break;
    case "roles":
      menuItemToShow.push("tipo");
      break;
    case "lugares":
      menuItemToShow.push("direccion");
      menuItemToShow.push("tipo");
      break;
    case "clientes":
      menuItemToShow.push("nombre");
      menuItemToShow.push("direccion");
      break;
  }

  console.log(name, url, data[0]);
  const dataMenuItem = data.map((data) => (
    <MenuItem key={data.id} value={data.id}>
      {menuItemToShow.length > 1
        ? `${data[menuItemToShow[0]]}, ${data[menuItemToShow[1]]}`
        : `${data[menuItemToShow[0]]}`}
    </MenuItem>
  ));

  const name_id = `${name}_id`;

  return (
    <Grid item key={`${name}-select`}>
      <InputLabel id={name_id}>{name}</InputLabel>
      <Select
        onChange={onChange}
        labelId={name_id}
        id={name_id}
        name={name_id}
        value={form[name_id]}
        fullWidth
      >
        {dataMenuItem}
      </Select>
    </Grid>
  );
}
