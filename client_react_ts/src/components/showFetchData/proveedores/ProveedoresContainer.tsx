import React from "react";
import Proveedores from "./Proveedores";

import useDataApi from "../../customHooks/useDataApi";

export default function ProveedorContainer() {
  const [dataState, error] = useDataApi("proveedores");
  return <Proveedores dataState={dataState} />;
}
