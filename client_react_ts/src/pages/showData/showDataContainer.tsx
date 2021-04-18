import React, { createContext } from "react";
import { useLocation } from "react-router-dom";
import useFetchData from "../../utils/hooks/useFetchData";

import { capitalizeFirstChart, deleteSlashChart } from "../../utils/helper";

const NoExiste = () => <h3>No existe</h3>;

export let DataContext;
export default function FetchDataContainer() {
  const { pathname } = useLocation();
  const { data, setData } = useFetchData(pathname);
  DataContext = createContext({ data, setData });

  let path = deleteSlashChart(pathname);
  path = capitalizeFirstChart(path);

  console.log(data);
  return (
    <DataContext.Provider value={{ data, setData }}></DataContext.Provider>
  );
}
