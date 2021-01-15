import React from "react";
import { useForm, Controller } from "react-hook-form";

import PostData from "./PostData";

export default function AddCategorias() {
  const { register, handleSubmit, watch, errors, control } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <PostData
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
}
