import { createContext } from "react";
import { useLocation } from "react-router-dom";
import useFetchData from "../../utils/hooks/useFetchData";

import { capitalizeFirstChart, deleteSlashChart } from "../../utils/helper";

import DataView from "./viewComponent/DataView";

const NoExiste = () => <h3>No existe</h3>;
export let DataContext;
export default function FetchDataContainer() {
  const { pathname } = useLocation();
  console.log(pathname);
  const { data, setData } = useFetchData(pathname);
  DataContext = createContext({ data, setData });

  let path = deleteSlashChart(pathname);
  path = capitalizeFirstChart(path);

  console.log(data);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {data.toString().length > 0 ? <DataView path={path} /> : <NoExiste />}
    </DataContext.Provider>
  );
}
