import React, { useState } from "react";
import useForm from "../../utils/hooks/useForm";
import SelectsOptions from "../../components/SelectsOptions";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Inventario {
  sku: string;
  color: string;
  qty: number;
  precio: number;
  precio_min: number;
  costo: number;
  item_id: number;
  lugar_id: number;
  proveedor_id: number;
}

export default function AddInventario(props: any) {
  const { data, handleChange, handleSubmit } = useForm<Inventario>(
    {
      sku: "",
      color: "",
      qty: 0,
      precio: 0,
      precio_min: 0,
      costo: 0,
      item_id: 0,
      lugar_id: 0,
      proveedor_id: 0,
    },
    "/items/inventarios"
  );
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const inventarioDetails = [
    "sku",
    "color",
    "precio",
    "precio_min",
    "qty",
    "costo",
  ];

  const renderTextField = inventarioDetails.map((detail) => (
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
      <Typography variant="h2">Agregar Inventario</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
        <SelectsOptions onChange={handleChange} name="lugares" />
        <SelectsOptions onChange={handleChange} name="proveedores" />
        <SelectsOptions onChange={handleChange} name="items" />
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