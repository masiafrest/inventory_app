import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";

import PostData from "./viewComponent/PostData";

export default function AddCategorias(props) {
  const [error, setError] = React.useState<string>();
  const { handleSubmit, control } = useForm();
  const { pathname } = useLocation();
  const path = pathname.replace("/add/", "");
  console.log(path);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(path, data);
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
      if (err.response.data.type === "UniqueViolation") setError("ya existe");
    }
  };
  return (
    <PostData
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
