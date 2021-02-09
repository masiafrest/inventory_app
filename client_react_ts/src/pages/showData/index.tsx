import useDynamicComponent from "../../utils/hooks/useDynamicComponent";
import ShowCategorias from "./ShowCategorias";
import ShowLugares from "./ShowLugares";
import ShowItems from "./ShowItems";
import ShowRoles from "./ShowRoles";

export default function ShowData() {
  const components = {
    categorias: ShowCategorias,
    lugares: ShowLugares,
    items: ShowItems,
    roles: ShowRoles,
  };

  const DynamicComponent: (props: any) => JSX.Element = useDynamicComponent(
    components
  );
  return <DynamicComponent />;
}
