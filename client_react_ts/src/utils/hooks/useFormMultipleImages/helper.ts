import Resizer from "react-image-file-resizer";

export const formDataConstructor = (data) => {
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

export const dataURIToFile = (dataURI, name) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  console.log(mimeString);
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new File([ia], name, { type: mimeString });
};

export const resizeFile = (file) =>
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

export const imgResize = async (files) => {
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
