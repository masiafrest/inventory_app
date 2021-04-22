import SelectsOptions from "../../../components/SelectsOptions";
import SelectClientes from '../../components/SelectClientes'
import { Paper } from "@material-ui/core";

import {
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { useStyle } from "../../../useStyle";

import { VentaYDevoluciones } from "../";
interface UseStates {
  clientId: any;
  setClientId: any;
  selectedItemId: any;
  setSelectedItemId: any;
  hasLineas: any;
  setHasLineas: any;
  lineas: VentaYDevoluciones;
  setLineas: any;
}

export default function Header({ useStates }) {
  const classes = useStyle();
  const [
    client,
    setClient,
    selectedItems,
    setSelectedItems,
    hasLineas,
    lineas,
    setLineas,
  ] = useStates;

  return (
    <Paper>
      <SelectClientes
        className={classes.selects}
        onChange={(e) => {
          setClient(e.target.value);
        }}
        url={"clientes"}
        value={client}
        setClient={setClient}
      />

      {hasLineas ? (
        <>
          <InputLabel id={"lineas"}>Item a devolver</InputLabel>
          <Select
            onChange={(e) => {
              const { value } = e.target;
              const item = value[0];
              const lineaId = value[1];
              setSelectedItems(selectedItems.concat(item));

              const newVentas = lineas.ventas.filter(
                (lineaVenta) => lineaVenta.id !== lineaId
              );

              setLineas((prevState) => {
                return { ...prevState, ventas: newVentas };
              });
              // if (lineas.ventas.length === 1) setHasLineas(false);
            }}
            labelId={"lineas"}
            id={"lineas"}
            name={"lineas"}
            fullWidth
          >
            {lineas?.ventas?.map((linea) => (
              <MenuItem
                value={[linea.item, linea.id]}
              >{`${linea.item.marca} ${linea.item.modelo} ${linea.item.descripcion}, recibo N° ${linea.venta_id}`}</MenuItem>
            ))}
          </Select>
        </>
      ) : (
        "aqui aparece un select item a devolver"
      )}
    </Paper>
  );
}
