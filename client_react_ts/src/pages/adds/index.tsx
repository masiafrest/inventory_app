import AddItem from "./AddItem";
import AddCategoria from "./AddCategoria";
import AddLugar from "./AddLugar";
import AddProveedor from "./AddProveedor";
import AddUser from "./AddUser";
import AddRol from "./AddRol";
import AddCliente from "./AddCliente";
import AddDefectuoso from "./AddDefectuoso";
import { useRouteMatch } from "react-router-dom";

export default function Adds() {
  const { path, url } = useRouteMatch();

  const components = {
    item: AddItem,
    categoria: AddCategoria,
    lugare: AddLugar,
    proveedore: AddProveedor,
    usuario: AddUser,
    rol: AddRol,
    cliente: AddCliente,
    defectuoso: AddDefectuoso,
  };

  const strSplited = path.split("/");
  const componentName = strSplited[2];
  console.log(path, strSplited, componentName);
  const DynamicComponent = components[componentName];
  return <DynamicComponent />;
}
