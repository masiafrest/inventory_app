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
      console.log(e.target.files[0]);
      console.log(fileArray);
      setData((value) => ({ ...value, [e.target.name]: e.target.files }));
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
        console.log(key);
        if (key === "images") {
          formData.append(key, data[key][0]); //hay q hacer un loop para ver el length del arry y agregarlo
        } else {
          formData.append(key, data[key]);
        }
        console.log(data[key]);
      });
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, previewImg, handleChange, handleSubmit };
}
