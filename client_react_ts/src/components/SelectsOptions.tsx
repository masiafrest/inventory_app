import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";

export default function SelectsOptions({ onChange, name, url = name }) {
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
  switch (name) {
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
    default:
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

  return (
    <Grid item key={`${name}-select`}>
      <InputLabel id={`${name}_id`}>{name}</InputLabel>
      <Select
        onChange={onChange}
        labelId={`${name}_id`}
        id={`${name}_id`}
        value=""
        fullWidth
      >
        {dataMenuItem}
      </Select>
    </Grid>
  );
}
