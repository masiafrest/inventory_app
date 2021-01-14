import React from "react";
import Usuarios from "./Usuarios";

import useDataApi from "../../customHooks/useDataApi";

export default function UsuariosContainer() {
  const [dataState, error] = useDataApi("usuarios");
  return <Usuarios dataState={dataState} />;
}
