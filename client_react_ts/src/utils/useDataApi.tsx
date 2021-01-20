import { useState, useEffect } from "react";
import axios from "axios";

export default function useDataApi(url, method = "get") {
  const [dataState, setDataState] = useState({ data: [] });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    console.log("fetch api", url);
    const fetchDataFromApi = async () => {
      try {
        setIsFetching(true);
        const res = await axios[method](url); // axios.get(endPointUrl), test is work? using bracket to access
        setDataState({
          ...dataState,
          data: res.data,
        });
      } catch (error) {
        console.log(error);
        setError(error);
        setIsFetching(false);
      }
    };
    fetchDataFromApi();
  }, []);

  return [dataState, setDataState, isFetching, error];
}
