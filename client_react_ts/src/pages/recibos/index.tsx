import Venta from './venta'
import Transferencia from './transferencia'

import useDynamicComponent from "../../utils/hooks/useDynamicComponent";

export default function AddData() {
  const components = {
    venta: Venta,
    transferencia: Transferencia
  };

  const DynamicComponent: (props: any) => JSX.Element = useDynamicComponent(
    components
  );
  return <DynamicComponent />;
}
