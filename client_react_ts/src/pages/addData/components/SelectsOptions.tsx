import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";
import Modal from "./Modal";

export default function SelectsOptions({
  className,
  onChange,
  name,
  url,
  value = 0,
}) {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const fetchData = () => {
    axios
      .get("/" + url)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  let menuItemToShow = [];
  switch (url) {
    case "categorias":
    case "proveedores":
      menuItemToShow.push("nombre");
      break;
    case "items":
      menuItemToShow.push("marca");
      menuItemToShow.push("modelo");
      break;
    case "usuarios/roles":
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

  console.log(name, url, data);
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
        className={className}
        onChange={onChange}
        labelId={name_id}
        id={name_id}
        name={name_id}
        value={value}
        fullWidth
      >
        {dataMenuItem}
        <MenuItem key={`add_${name}`} onClick={() => setOpenModal(true)}>
          agregar otra {name}
        </MenuItem>
      </Select>
      <Modal state={[openModal, setOpenModal]} fetch={fetchData} url={url} />
    </Grid>
  );
}
