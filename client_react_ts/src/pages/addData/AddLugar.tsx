import React, { useState } from "react";
import useForm from "../../utils/hooks/useForm";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux

interface Lugar {
  tipo: string;
  direccion: string;
}

export default function AddLugar(props: any) {
  const { data, handleChange, handleSubmit } = useForm<Lugar>(
    {
      direccion: "",
      tipo: "",
    },
    "/lugares"
  );

  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const lugarDetails = ["tipo", "direccion"];

  const renderTextField = lugarDetails.map((detail) => (
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
      <Typography variant="h2">Agregar Lugar</Typography>
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