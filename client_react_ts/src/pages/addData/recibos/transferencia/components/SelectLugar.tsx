import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router";
import useFetchData from "../../../../../utils/hooks/useFetchData";

export default function SelectLugar({ destinoId, name, onChange }) {
  const history = useHistory();
  const { data } = useFetchData("lugares");

  const dataMenuItem = data.map((data) => (
    <MenuItem key={data.id} value={data.id}>
      {`${data.dirrecion}, ${data.tipo}`}
    </MenuItem>
  ));

  return (
    <FormControl>
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
    </FormControl>
  );
}
