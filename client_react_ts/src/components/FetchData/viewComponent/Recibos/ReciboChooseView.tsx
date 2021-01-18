import React from "react";
import { useLocation } from "react-router-dom";
import Venta from "./Venta";
import Devolucion from "./Devolucion";

export default function ReciboChooseView() {
  const { pathname } = useLocation();
  console.log(pathname);
  let view;
  if (pathname.includes("venta")) {
    view = <Venta />;
  } else if (pathname.includes("devolucion")) {
    view = <Devolucion />;
  }
  return view;
}
