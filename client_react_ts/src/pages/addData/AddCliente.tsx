import React, { useState } from "react";
import SelectsOptions from "../../components/SelectsOptions";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";
import useFormImage from "../../utils/hooks/useFormImage";

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
  const {
    data,
    previewImg,
    handleChange,
    handleSubmit,
  } = useFormImage<Cliente>(
    {
      nombre: "",
      telefono: "",
      direccion: "",
      email: "",
      logo_url: "",
      website_url: "",
      telefono_2: "",
    },
    "/clientes/addUser"
  );

  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

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
      value={data[detail]}
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
        <SelectsOptions
          onChange={handleChange}
          form={data}
          url="roles"
          name="rol"
        />
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
