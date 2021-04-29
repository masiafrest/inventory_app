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
  InputAdornment,

} from "@material-ui/core";
import { useStyle } from "./useStyle";


const detailsName = [
  "marca",
  "modelo",
  "color",
  "sku",
  "stock",
  "precio",
  "precio_min",
  "costo",
  "barcode",
  "descripcion",
];

export default function AddItem() {
  const classes = useStyle();
  const initialItem = {
    marca: "",
    modelo: "",
    descripcion: "",
    sku: "",
    color: "",
    precio: undefined,
    precio_min: undefined,
    categoria_id: 0,
    stock: 0,
    lugar_id: 0,
    proveedor_id: undefined,
    costo: undefined,
    barcode: 0
  };
  // const { data, previewImg, handleChange, handleSubmit } = useFormImage<Item>(
  //   initialItem,
  //   "/items"
  // );
  const {
    data,
    previewImg,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleImgChange,
  } = useFormMultipleImages<Item>(initialItem, "/items");

  const renderTextField = detailsName.map((name) => (
    <Grid item
      className={classes[name]}
    >
      <TextField
        // className={classes[name]}
        key={name}
        id={name}
        name={name}
        label={name}
        value={data[name]}
        onChange={handleChange}
        autoFocus={name === 'marca'}
        fullWidth={name === 'descripcion'}
        multiline={name === 'descripcion'}
        InputProps={{
          startAdornment:
            ['precio', 'precio_min', 'costo'].includes(name) ?
              <InputAdornment position="start">$</InputAdornment>
              : null
        }}
        required={
          ['marca', 'modelo', 'descripcion', 'sku', 'precio'].includes(name) ?
            true : false}
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
            onChange={handleSelectChange}
            name="categoria"
            url="categorias"
            value={data}
          />
          <SelectsOptions
            className={classes.selects}
            onChange={handleSelectChange}
            name="proveedor"
            url="proveedores"
            value={data}
          />
          <SelectsOptions
            className={classes.selects}
            onChange={handleSelectChange}
            name="lugar"
            url="lugares"
            value={data}
          />
        </Grid>
        {/* <UploadAndPreviewImages
          previewImg={previewImg}
          onChange={handleChange}
        /> */}
        <DropzoneArea onChange={handleImgChange} acceptedFiles={["image/*"]} maxFileSize={10000000} />
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
