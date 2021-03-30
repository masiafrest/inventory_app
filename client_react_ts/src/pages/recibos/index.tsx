import Venta from "./venta";
import Transferencia from "./transferencia";

import useDynamicComponent from "../../utils/hooks/useDynamicComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { addUserId } from "../../redux/features/recibo/reciboSlice";

export default function Recibos() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  dispatch(addUserId(user.credentials.id));

  const components = {
    venta: Venta,
    transferencia: Transferencia,
  };

  const DynamicComponent: (props: any) => JSX.Element = useDynamicComponent(
    components
  );
  return <DynamicComponent />;
}
