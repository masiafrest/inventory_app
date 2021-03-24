import Venta from './venta'

import useDynamicComponent from "../../utils/hooks/useDynamicComponent";

export default function AddData() {
  const components = {
    venta: Venta
  };

  const DynamicComponent: (props: any) => JSX.Element = useDynamicComponent(
    components
  );
  return <DynamicComponent />;
}
