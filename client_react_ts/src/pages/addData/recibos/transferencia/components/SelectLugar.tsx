import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router";
import useFetchData from "../../../../../utils/hooks/useFetchData";

export default function SelectLugar({ destinoId, name, onChange, currLugarId }) {
  const history = useHistory();
  const { data } = useFetchData("lugares");
  const dataFiltered = data.filter(data => data.id !== currLugarId)
  const dataMenuItem = dataFiltered.map((data) => (
    <MenuItem key={data.id} value={data.id}>
      {`${data.direccion}, ${data.tipo}`}
    </MenuItem>
  ));

  return (
    <form>
      <InputLabel>Destino</InputLabel>
      <Select value={destinoId} onChange={onChange}>
        {dataMenuItem}{" "}
        <MenuItem
          key={`add_${name}`}
          onClick={() => history.push(`/add/${name}`)}
        >
          agregar otro {name}
        </MenuItem>
      </Select>
    </form>
  );
}
