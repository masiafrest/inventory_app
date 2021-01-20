import React from "react";
import { useLocation } from "react-router-dom";
import Venta from "./Venta";
import Devolucion from "./Devolucion";
import Garantia from "./Garantia";
import NotaCredito from "./NotaCredito";
import Transferencia from "./Transferencia";

export default function ReciboChooseView() {
  const { pathname } = useLocation();
  console.log(pathname);

  const components = {
    Venta,
    Devolucion,
    Garantia,
    NotaCredito,
    Transferencia,
  };

  const View = pathname.split("/")[1].toUpperCase();
  //TODO: check if work
  return <View />;
}
