import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function useForm<T extends Object>(
  initialState: T,
  url: string
) {
  const [data, setData] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((value) => ({ ...value, [e.target.name]: e.target.value }));
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, handleChange, handleSubmit };
}
