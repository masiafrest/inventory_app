import { useState } from "react";
import SelectsOptions from "../../components/SelectsOptions";
import useFormImage from "../../utils/hooks/useFormImage";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddItem(props: any) {
  const { data, previewImg, handleChange, handleSubmit } = useFormImage<Item>(
    {
      marca: "",
      descripcion: "",
      modelo: "",
      sku: "",
      color: "",
      precio: 0,
      categoria_id: 0,
      qty: 0,
      lugar_id: 0,
      proveedor: 0,
      costo: 0,
    },
    "/items"
  );
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const itemDetails = [
    "marca",
    "descripcion",
    "modelo",
    "sku",
    "color",
    "precio",
    "categoria_id",
    "qty",
    "lugar_id",
    "proveedor",
    "costo",
  ];

  const renderTextField = itemDetails.map((detail) => (
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
      <Typography variant="h2">Agregar Item</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
        <SelectsOptions onChange={onchange} name="categorias" />
        <SelectsOptions onChange={onchange} name="proveedores" />
        <SelectsOptions onChange={onchange} name="lugares" />
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
