import React from "react";
import Items from "./Items";

import useDataApi from "../../customHooks/useDataApi";

export default function UsuariosContainer() {
  const [dataState, error] = useDataApi("items");
  console.log(dataState);
  return <Items dataState={dataState} />;
}
