import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UseDataApi(url, method = "get") {
  const [dataState, setDataState] = useState({ data: [] });
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [endPointUrl] = useState(url);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsFetching(true);
        const res = await axios[method](endPointUrl); // axios.get(endPointUrl), test is work? using bracket to access
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
  }, []);

  return [dataState, isFetching, error];
}
