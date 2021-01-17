import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useDataApi from "../../utils/useDataApi";

import { capitalizeFirstChart, deleteSlashChart } from "../../utils/helper";
import SearchBar from "../SearchBar";

import DataView from "./viewComponent/DataView";
import Items from "./viewComponent/AccordionView";

const showSelectedData = {
  Categorias: ["nombre"],
  Proveedores: ["nombre", "direecion", "telefono", "telefono 2", "website_url"],
  Usuarios: ["nombre", "direccion", "telefono", "telefono 2"],
  Clientes: ["nombre", "direccion", "telefono", "telefono 2", "website_url"],
  Lugares: ["direccion", "tipo"],
  Logs: ["descripcion"],
};

const NoExiste = () => <h3>No existe</h3>;

export default function FetchDataContainer() {
  const { pathname } = useLocation();
  const [dataState, setDataState, error] = useDataApi(pathname);

  let path = deleteSlashChart(pathname);
  path = capitalizeFirstChart(path);

  console.log(dataState);
  return (
    <>
      <SearchBar setResData={setDataState} />
      {dataState.toString().length > 0 ? (
        <DataView dataState={dataState} path={path} />
      ) : (
        <NoExiste />
      )}
    </>
  );
}
