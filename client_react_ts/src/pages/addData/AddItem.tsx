import SelectsOptions from "./components/SelectsOptions";
import useFormMultipleImages from "../../utils/hooks/useFormMultipleImages";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";
import { DropzoneArea } from "material-ui-dropzone";
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
  "color",
  "sku",
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
    categoria_id: 0,
    stock: null,
    lugar_id: 0,
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
    handleImgChange,
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
            url="categorias"
            value={data}
          />
          <SelectsOptions
            className={classes.selects}
            onChange={handleChange}
            name="proveedor"
            url="proveedores"
            value={data}
          />
          <SelectsOptions
            className={classes.selects}
            onChange={handleChange}
            name="lugar"
            url="lugares"
            value={data}
          />
        </Grid>
        {/* <UploadAndPreviewImages
          previewImg={previewImg}
          onChange={handleChange}
        /> */}
        <DropzoneArea onChange={handleImgChange} acceptedFiles={["image/*"]} />
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
