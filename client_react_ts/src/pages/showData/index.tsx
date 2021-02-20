import useDynamicComponent from "../../utils/hooks/useDynamicComponent";
import ShowCategorias from "./ShowCategorias";
import ShowLugares from "./ShowLugares";
import ShowItems from "./ShowItems/ShowItems";
import ShowRoles from "./ShowRoles";
import ShowInv from "./ShowItems/ShowInventory";
import ShowClientes from "./ShowClentes";
import ShowProveedores from "./ShowProveedores";

export default function ShowData() {
  const components = {
    categorias: ShowCategorias,
    clientes: ShowClientes,
    lugares: ShowLugares,
    items: ShowItems,
    roles: ShowRoles,
    proveedores: ShowProveedores,
    inventarios: ShowInv,
  };

  const DynamicComponent: (props: any) => JSX.Element = useDynamicComponent(
    components
  );
  return <DynamicComponent />;
}
