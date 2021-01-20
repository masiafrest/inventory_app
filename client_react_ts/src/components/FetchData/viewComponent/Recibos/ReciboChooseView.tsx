import React from "react";
import { useLocation } from "react-router-dom";
import Venta from "./Venta";
import Devolucion from "./Devolucion";
import Garantia from "./Garantia";
import NotaCredito from "./NotaCredito";
import Transferencia from "./Transferencia";
import Cotizacion from "./Cotizacion";

export default function ReciboChooseView() {
  const { pathname } = useLocation();
  console.log(pathname);

  const components = {
    Venta,
    Devolucion,
    Garantia,
    Nota_credito: NotaCredito,
    Transferencia,
    Cotizacion,
  };

  const reciboTipo = pathname.split("/")[2];
  const View = reciboTipo[0].toUpperCase() + reciboTipo.slice(1);
  const TagName = components[View];
  //TODO: check if work
  return <TagName />;
}
