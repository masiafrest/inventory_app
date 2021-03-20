import { useState } from "react";
import SelectsOptions from "../../components/SelectsOptions";
import useFormImage from "../../utils/hooks/useFormImage";
import useFormMultipleImages from "../../utils/hooks/useFormMultipleImages";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddItem(props: any) {
  const initialItem = {
    marca: "",
    modelo: "",
    caracteritica: '',
    descripcion: "",
    sku: "",
    color: "",
    precio: 0,
    categoria_id: 1,
    qty: 0,
    lugar_id: 1,
    proveedor_id: 1,
    costo: 0,
  };
  // const { data, previewImg, handleChange, handleSubmit } = useFormImage<Item>(
  //   initialItem,
  //   "/items"
  // );
  const {
    data,
    previewImg,
    handleChange,
    handleSubmit,
  } = useFormMultipleImages<Item>(initialItem, "/items");
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const itemDetails = [
    "marca",
    "modelo",
    'caracteristica',
    "descripcion",
    "sku",
    "color",
    "precio",
    "qty",
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
  console.log(data)

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">Agregar Item</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
        <SelectsOptions
          onChange={handleChange}
          name="categoria"
          form={data}
          url="categorias"
        />
        <SelectsOptions
          form={data}
          onChange={handleChange}
          name="proveedor"
          url="proveedores"
        />
        <SelectsOptions
          onChange={handleChange}
          name="lugar"
          form={data}
          url="lugares"
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
