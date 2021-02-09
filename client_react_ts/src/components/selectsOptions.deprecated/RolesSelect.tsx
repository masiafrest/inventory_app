import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";
interface Rol {
  id: number;
  tipo: string;
}
export default function RolesSelect({ onChange }) {
  const [roles, setRoles] = useState<Rol[]>([]);
  useEffect(() => {
    axios
      .get("/usuarios/roles")
      .then((res) => {
        setRoles(res.data);
        console.log(res.data);
        console.log(roles);
      })
      .catch((err) => console.log(err));
  }, []);

  const rolMenuItem = roles.map((rol) => (
    <MenuItem key={rol.id} value={rol.id}>
      {`${rol.tipo}`}
    </MenuItem>
  ));

  return (
    <Grid item key="rol-select">
      <InputLabel id="rol_id">Roles</InputLabel>
      <Select onChange={onChange} labelId="rol_id" id="rol_id" value="">
        {rolMenuItem}
      </Select>
    </Grid>
  );
}
