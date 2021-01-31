import React, { createContext } from "react";
import { useLocation } from "react-router-dom";
import useDataApi from "../../utils/useDataApi";

import { capitalizeFirstChart, deleteSlashChart } from "../../utils/helper";
import SearchBar from "../SearchBar";

import DataView from "./viewComponent/DataView";

const NoExiste = () => <h3>No existe</h3>;
export let DataContext;
export default function FetchDataContainer() {
  const { pathname } = useLocation();
  const [dataState, setDataState] = useDataApi(pathname);
  DataContext = createContext({ dataState, setDataState });

  let path = deleteSlashChart(pathname);
  path = capitalizeFirstChart(path);

  console.log(dataState);
  return (
    <DataContext.Provider value={{ dataState, setDataState }}>
      {pathname.includes("log") ? null : (
        <SearchBar setResData={setDataState} />
      )}
      {dataState.toString().length > 0 ? (
        <DataView path={path} />
      ) : (
        <NoExiste />
      )}
    </DataContext.Provider>
  );
}
