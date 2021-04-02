import useDynamicComponent from "../../utils/hooks/useDynamicComponent";
import ShowCategorias from "./ShowCategorias";
import ShowLugares from "./ShowLugares";
import ShowItems from "./ShowItems/ShowItems";
import ShowRoles from "./ShowRoles";
import ShowClientes from "./ShowClentes";
import ShowProveedores from "./ShowProveedores";
import Ventas from './recibos/ventas/ShowVentas'
import Transferencias from './recibos/transferencia/ShowTransferencia'

export default function ShowData() {
  const components = {
    categorias: ShowCategorias,
    clientes: ShowClientes,
    lugares: ShowLugares,
    items: ShowItems,
    roles: ShowRoles,
    proveedores: ShowProveedores,
    ventas: Ventas, 
    transferencias:Transferencias
  };

  const DynamicComponent: (props: any) => JSX.Element = useDynamicComponent(
    components
  );
  return <DynamicComponent />;
}
