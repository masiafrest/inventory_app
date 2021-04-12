import axios from "axios";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export default function useForm<T>(initialState: T, url: string) {
  const [data, setData] = useState(initialState);
  const [previewImg, setPreviewImg] = useState("");

  const dataURIToFile = (dataURI, name) => {
    console.log(dataURI);
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    console.log(mimeString);
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);
    return new File([ia], name, { type: mimeString });
  };

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

  const handleImgChange = (files) => {
    setData((value) => ({ ...value, images: files }));
  };
  const handleChange = async (e) => {
    if (e.target.name === "images") {
      //multiple files
      let fileObj: any = [];
      let fileArray: any = [];
      let fileBlobResize = [];
      fileObj.push(e.target.files);
      // fileArray.push(await resizeFile(e.target.files[0]));
      for (let i = 0; i < fileObj[0].length; i++) {
        console.log("i: ", i, "file[0]: ", fileObj[0]);
        console.log("i: ", i, "file[0][i]", fileObj[0][i]);
        const image = await resizeFile(fileObj[0][i]);
        fileArray.push(image);
        const newFile = dataURIToFile(image, fileObj[0][i].name);
        fileBlobResize.push(newFile);
      }
      setData((value) => ({ ...value, [e.target.name]: fileBlobResize }));
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
          //TODO: hacer que pueda subir mas archivo
          // const newFile = dataURIToFile(previewImg[0]);
          // console.log(newFile);
          formData.append("images", data[key][0]); //hay q hacer un loop para ver el length del arry y agregarlo
          // formData.append("images", newFile);
        } else {
          formData.append(key, data[key]);
        }
      });
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(initialState);
      setPreviewImg("");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { data, previewImg, handleChange, handleSubmit, handleImgChange };
}
