import React, { useState } from "react";
import axios from "axios";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux

interface Categorias {
  nombre: string;
}

export default function AddCategorias(props: any) {
  const [categoria, setCategoria] = useState<Categorias>({
    nombre: "",
  });
  //   const [previewImg, setPreviewImg] = useState("");
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCategoria((value) => ({ ...value, [e.target.name]: e.target.value }));
    console.log(categoria);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(categoria);
    try {
      const res = await axios.post("/categorias", categoria);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const categoriaDetails = ["nombre"];

  const renderTextField = categoriaDetails.map((detail) => (
    <TextField
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={categoria[detail]}
      onChange={handleChange}
      fullWidth
      // helperText={errors[detail]}
      // error={errors[detail] ? true : false}
    />
  ));

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">Agregar Categoria</Typography>
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
