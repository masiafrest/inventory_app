import React, { useState } from "react";
import axios from "axios";
import RolesSelect from "../../components/selectsOptions/RolesSelect";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddUsuario(props: any) {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "",
    password: "",
    telefono: "",
    rol_id: 0,
  });

  const [previewImg, setPreviewImg] = useState("");
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      //multiple files
      // let fileObj: any = [];
      // let fileArray: any = [];
      // fileObj.push(e.target.files);
      // for (let i = 0; i < fileObj[0].length; i++) {
      //   fileArray.push(URL.createObjectURL(fileObj[0][i]));
      // }
      // setUsuario((value) => ({ ...value, images: fileArray }));

      //single file
      const file = URL.createObjectURL(e.target.files[0]);
      setUsuario((value) => ({ ...value, [e.target.name]: e.target.files[0] }));
      setPreviewImg(file);
      console.log(e.target.files);
      console.log(file);
      console.log(usuario);
    } else {
      setUsuario((value) => ({ ...value, [e.target.name]: e.target.value }));
    }
    console.log(usuario);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(usuario);
    try {
      let formData = new FormData();
      Object.keys(usuario).forEach((key) => {
        formData.append(key, usuario[key]);
      });
      const res = await axios.post("/usuarios/addUser", formData);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const usuarioDetails = ["nombre", "password", "telefono"];

  const renderTextField = usuarioDetails.map((detail) => (
    <TextField
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={usuario[detail]}
      onChange={handleChange}
      fullWidth
      // helperText={errors[detail]}
      // error={errors[detail] ? true : false}
    />
  ));

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">Agregar Usuario</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
        <RolesSelect onChange={handleChange} />
        <UploadAndPreviewImages
          previewImg={previewImg}
          onChange={handleChange}
        />
        {/* {errors.general && (
          <Typography variant="body2">{errors.general}</Typography>
        )} */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Agregar
          {loading && <CircularProgress size={30} />}
        </Button>
        <br></br>
      </form>
    </Container>
  );
}
