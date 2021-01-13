import React from "react";
import Categorias from "./Categorias";

import useDataApi from "../../customHooks/useDataApi";

export default function CategoriaContainer() {
  const [dataState, error] = useDataApi("categorias");
  return <Categorias dataState={dataState} />;
}
