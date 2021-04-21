import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";
// import Modal from "./Modal";

export default function SelectsClientes({
  className,
  onChange,
  url,
  value,
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

  const dataMenuItem = data.map((data) => (
    <MenuItem key={data.id} value={data.id}>
      nombre: {data.nombre}
    </MenuItem>
  ));

  return (
    <Grid item key={`cliente-grid`}>
      <InputLabel id={'cliente-input'}>Clientes</InputLabel>
      <Select
        className={className}
        onChange={onChange}
        labelId={'cliente'}
        id={'clienteSelect'}
        name={'cliente'}
        value={value}
        fullWidth
      >
        {dataMenuItem}
        {/* <MenuItem key={`add_cliente`} onClick={() => setOpenModal(true)}>
          agregar otra {cliente}
        </MenuItem> */}
      </Select>
      {/* <Modal state={[openModal, setOpenModal]} fetch={fetchData} url={url} /> */}
    </Grid>
  );
}
