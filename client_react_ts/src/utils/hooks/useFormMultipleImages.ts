import axios from "axios";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export default function useForm<T>(initialState: T, url: string) {
  const [data, setData] = useState(initialState);
  const [previewImg, setPreviewImg] = useState("");

  const handleChange = async (e) => {
    const resizeFile = (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      });
    if (e.target.name === "images") {
      //multiple files
      let fileObj: any = [];
      let fileArray: any = [];
      fileObj.push(e.target.files);
      for (let i = 0; i < fileObj[0].length; i++) {
        const image = await resizeFile(fileObj[0][i]);
        fileArray.push(image);
        // fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      setData((value) => ({ ...value, images: fileArray }));
      setPreviewImg(fileArray);
    } else {
      setData((value) => ({ ...value, [e.target.name]: e.target.value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      let formData = new FormData();
      //TODO: fix this doesn append
      Object.keys(data).forEach((key) => {
        console.log(key)
        formData.append(key, data[key]);
        console.log(data[key])
      });
      console.log(Object.keys(data))
      const res = await axios.post(url, formData);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, previewImg, handleChange, handleSubmit };
}
