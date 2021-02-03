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
interface Cliente {
  nombre: string;
  telefono: string;
  direccion: string;
  email: string;
  logo_url: string;
  website_url: string;
  telefono_2: string;
}
export default function AddCliente(props: any) {
  const [cliente, setCliente] = useState<Cliente>({
    nombre: "",
    telefono: "",
    direccion: "",
    email: "",
    logo_url: "",
    website_url: "",
    telefono_2: "",
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
      // setCliente((value) => ({ ...value, images: fileArray }));

      //single file
      const file = URL.createObjectURL(e.target.files[0]);
      setCliente((value) => ({ ...value, [e.target.name]: e.target.files[0] }));
      setPreviewImg(file);
      console.log(e.target.files);
      console.log(file);
      console.log(cliente);
    } else {
      setCliente((value) => ({ ...value, [e.target.name]: e.target.value }));
    }
    console.log(cliente);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cliente);
    try {
      let formData = new FormData();
      Object.keys(cliente).forEach((key) => {
        formData.append(key, cliente[key]);
      });
      const res = await axios.post("/clientes/addUser", formData);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clienteDetails = [
    "nombre",
    "direccion",
    "telefono",
    "telefono 2",
    "email",
    "website",
  ];

  const renderTextField = clienteDetails.map((detail) => (
    <TextField
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={cliente[detail]}
      onChange={handleChange}
      fullWidth
      // helperText={errors[detail]}
      // error={errors[detail] ? true : false}
    />
  ));

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">Agregar Cliente</Typography>
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
