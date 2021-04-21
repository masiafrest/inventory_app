import axios from "axios";
import { useState } from "react";
import Resizer from "react-image-file-resizer";

export default function useForm<T>(initialState: T, url: string) {
  const [data, setData] = useState(initialState);
  const [previewImg, setPreviewImg] = useState("");
  const [error, setError] = useState();

  const dataURIToFile = (dataURI, name) => {
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
  const imgResize = async (files) => {
    //multiple files
    let newFile;
    let fileObj: any = [];
    let fileArray: any = [];
    let fileBlobResize = [];
    fileObj.push(files);
    // fileArray.push(await resizeFile(files[0]));
    for (let i = 0; i < fileObj[0].length; i++) {
      console.log("i: ", i, "file[0]: ", fileObj[0]);
      console.log("i: ", i, "file[0][i]", fileObj[0][i]);
      const image = await resizeFile(fileObj[0][i]);
      fileArray.push(image);
      newFile = dataURIToFile(image, fileObj[0][i].name);
      fileBlobResize.push(newFile);
    }
    return { fileArray, fileBlobResize, newFile };
  };

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

  const formDataConstructor = (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images.forEach((e, i) => {
          console.log(i);
          formData.append("images", data.images[i]); //hay q hacer un loop para ver el length del arry y agregarlo
        });
        //TODO: hacer que pueda subir mas archivo
        // data.images.forEach((e) => {
        //   console.log(e);
        //   console.log(data.images[0]);
        //   formData.append("images", data.images[e]); //hay q hacer un loop para ver el length del arry y agregarlo
        // });
        // formData.append("images", data.images[0]); //hay q hacer un loop para ver el length del arry y agregarlo
        // formData.append("images", newFile);
      } else {
        formData.append(key, data[key]);
      }
    });
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = formDataConstructor(data);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setData(initialState);
      setPreviewImg("");
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
      setError(err.response);
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
