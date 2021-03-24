import AddItem from "./AddItem";
import AddCategoria from "./AddCategoria";
import AddLugar from "./AddLugar";
import AddProveedor from "./AddProveedor";
import AddUser from "./AddUser";
import AddRol from "./AddRol";
import AddCliente from "./AddCliente";
import AddDefectuoso from "./AddDefectuoso";
import useDynamicComponent from "../../utils/hooks/useDynamicComponent";

export default function AddData() {
  const components = {
    item: AddItem,
    categoria: AddCategoria,
    lugar: AddLugar,
    proveedor: AddProveedor,
    usuario: AddUser,
    rol: AddRol,
    cliente: AddCliente,
    defectuoso: AddDefectuoso,
  };

  const DynamicComponent: (props: any) => JSX.Element = useDynamicComponent(
    components
  );
  return <DynamicComponent />;
}
