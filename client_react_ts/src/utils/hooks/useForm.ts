import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function useForm<T extends Object>(
  initialState: T,
  url: string
) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((value) => ({ ...value, [e.target.name]: e.target.value }));
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      setData(initialState)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };
  const handleSubmitPromise = e => new Promise(async (resolve, reject) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      setData(initialState)
      setLoading(false)
      resolve(loading)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }

  })

  return { data, loading, handleChange, handleSubmit, handleSubmitPromise };
}
