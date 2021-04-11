import SelectsOptions from "./components/SelectsOptions";
import useFormMultipleImages from "../../utils/hooks/useFormMultipleImages";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";

//MUI
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { useStyle } from "./useStyle";

const detailsName = [
  "marca",
  "modelo",
  "sku",
  "color",
  "precio",
  "precio_min",
  "stock",
  "costo",
  "descripcion",
];

export default function AddItem() {
  const classes = useStyle();
  const initialItem = {
    marca: "",
    modelo: "",
    caracteritica: "",
    descripcion: "",
    sku: "",
    color: "",
    precio: null,
    precio_min: null,
    categoria_id: null,
    stock: null,
    lugar_id: null,
    proveedor_id: null,
    costo: null,
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

  const renderTextField = detailsName.map((name) => (
    <Grid item>
      <TextField
        className={classes[name]}
        key={name}
        id={name}
        name={name}
        label={name}
        value={data[name]}
        onChange={handleChange}
        // fullWidth
        // helperText={errors[name]}
        // error={errors[name] ? true : false}
      />
    </Grid>
  ));

  return (
    <>
      <Typography variant="h2">Agregar Item</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {renderTextField}
        </Grid>

        <Grid container spacing={2}>
          <SelectsOptions
            className={classes.selects}
            onChange={handleChange}
            name="categoria"
            form={data}
            url="categorias"
          />
          <SelectsOptions
            className={classes.selects}
            form={data}
            onChange={handleChange}
            name="proveedor"
            url="proveedores"
          />
          <SelectsOptions
            className={classes.selects}
            onChange={handleChange}
            name="lugar"
            form={data}
            url="lugares"
          />
        </Grid>
        <UploadAndPreviewImages
          previewImg={previewImg}
          onChange={handleChange}
        />
        {/* {errors.general && (
          <Typography variant="body2">{errors.general}</Typography>
        )} */}
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
        <br></br>
      </form>
    </>
  );
}
