import SelectsOptions from "./components/SelectsOptions";
import useFormMultipleImages from "../../utils/hooks/useFormMultipleImages";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";

//MUI
import { Container, Typography, TextField, Button, Grid, makeStyles } from "@material-ui/core";

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

const useStyles = makeStyles(theme => ({
  marca: { width: '7em' },
  modelo: { width: '7em' },
  descripcion: { width: '25em' },
  sku: { width: '7em' },
  color: { width: '7em' },
  precio: { width: '5em' },
  precio_min: { width: '5em' },
  stock: { width: '5em' },
  costo: { width: '5em' },
}))

export default function AddItem() {
  const classes = useStyles()
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
    <Grid item >
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
    <Container maxWidth="md" fixed>
      <Typography variant="h2">Agregar Item</Typography>
      <form
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          {renderTextField}
        </Grid>
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
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
        <br></br>
      </form>

    </Container>
  );
}
