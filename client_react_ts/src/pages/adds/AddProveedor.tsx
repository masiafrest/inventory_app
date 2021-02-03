import React, { useState } from "react";
import axios from "axios";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux

interface Proveedor {
  nombre: string;
  direccion: string;
  telefono: string;
}

export default function AddProveedor(props: any) {
  const [proveedor, setProveedor] = useState<Proveedor>({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  //   const [previewImg, setPreviewImg] = useState("");
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProveedor((value) => ({ ...value, [e.target.name]: e.target.value }));
    console.log(proveedor);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(proveedor);
    try {
      const res = await axios.post("/proveedores", proveedor);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const proveedorDetails = ["nombre", "direccion", "telefono"];

  const renderTextField = proveedorDetails.map((detail) => (
    <TextField
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={proveedor[detail]}
      onChange={handleChange}
      fullWidth
      // helperText={errors[detail]}
      // error={errors[detail] ? true : false}
    />
  ));

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">Agregar Proveedor</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
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
