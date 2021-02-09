import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchData(url, method = "get") {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  console.log(error);
  console.log("fetch api", url);
  useEffect(() => {
    console.log("use effect fetchDatafrom api");
    const fetchDataFromApi = async () => {
      try {
        setIsFetching(true);
        const res = await axios[method](url);
        setData(res.data);
        console.log("useFetchData res.data:  ", res.data);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsFetching(false);
      }
    };
    fetchDataFromApi();
  }, [url]);
  console.log(error);
  return { data, setData, isFetching, error };
}
