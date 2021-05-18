import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function useForm<T>(initialState: T, url: string) {
  const [data, setData] = useState(initialState);
  const [previewImg, setPreviewImg] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    if (e.target.name === "images") {
      const file = URL.createObjectURL(e.target.files[0]);
      setData((value) => ({ ...value, [e.target.name]: e.target.files }));
      setPreviewImg([file]);
      console.log(e.target.files);
      console.log(file);
      console.log(data);
    } else {
      setData((value) => ({ ...value, [e.target.name]: e.target.value }));
    }
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      console.log(data);
      console.log(formData);
      const res = await axios.post(url, data);

      enqueueSnackbar("datos guardado", {
        variant: "success",
      });
      console.log(res.data);
    } catch (err) {
      enqueueSnackbar("error", {
        variant: "error",
      });
      console.log(err);
    }
  };

  return { data, previewImg, handleChange, handleSubmit };
}
