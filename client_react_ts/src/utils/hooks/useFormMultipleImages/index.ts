import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  dataURIToFile,
  resizeFile,
  imgResize,
  formDataConstructor,
} from "./helper";

export default function useFormMultipleImages<T>(initialState: T, url: string) {
  const [data, setData] = useState(initialState);
  const [previewImg, setPreviewImg] = useState("");
  const [error, setError] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleImgChange = async (files) => {
    const { fileBlobResize } = await imgResize(files);
    setData((value) => ({ ...value, images: fileBlobResize }));
  };

  const handleChange = async (e) => {
    if (e.target.name === "images") {
      const { fileArray, fileBlobResize } = await imgResize(e.target.files);
      setData((value) => ({ ...value, [e.target.name]: fileBlobResize }));
      setPreviewImg(fileArray);
    } else {
      setData((value) => ({
        ...value,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSelectChange = (e) => {
    setData((value) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = formDataConstructor(data);
    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setData(initialState);
      setPreviewImg("");
      enqueueSnackbar("data guardado", {
        variant: "success",
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
      enqueueSnackbar("error", {
        variant: "error",
      });
    }
  };

  return {
    data,
    previewImg,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleImgChange,
  };
}
