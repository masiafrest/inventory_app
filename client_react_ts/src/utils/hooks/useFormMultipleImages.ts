import axios from "axios";
import { useState } from "react";

export default function useForm<T>(initialState: T, url: string) {
  const [data, setData] = useState(initialState);
  const [previewImg, setPreviewImg] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "images") {
      //multiple files
      let fileObj: any = [];
      let fileArray: any = [];
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      setData((value) => ({ ...value, images: fileArray }));
    } else {
      setData((value) => ({ ...value, [e.target.name]: e.target.value }));
    }
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      let formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const res = await axios.post(url, data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, previewImg, handleChange, handleSubmit };
}
