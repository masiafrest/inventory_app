import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useDataApi from "../customHooks/useDataApi";

import { CleanParamsToString } from "../../utils/helper";
import SearchBar from "../SearchBar";

import Categorias from "./Categorias";
import Proveedores from "./Proveedores";
import Usuarios from "./Usuarios";
import Items from "./Items";

const components = {
  Categorias,
  Proveedores,
  Usuarios,
  Items,
};

const NoExiste = () => <h3>No existe</h3>;

export default function ProveedorContainer() {
  const { pathname } = useLocation();
  const [dataState, setDataState, error] = useDataApi(pathname);

  const path = CleanParamsToString(pathname);

  const TagName = components[path];
  console.log(dataState);
  return (
    <>
      <SearchBar setResData={setDataState} />
      {dataState.toString().length > 0 ? (
        <TagName dataState={dataState} />
      ) : (
        <NoExiste />
      )}
    </>
  );
}
