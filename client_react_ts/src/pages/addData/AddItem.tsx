import SelectsOptions from "../../components/SelectsOptions";
import useFormMultipleImages from "../../utils/hooks/useFormMultipleImages";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function AddItem() {
  const initialItem = {
    marca: "",
    modelo: "",
    caracteritica: "",
    descripcion: "",
    sku: "",
    color: "",
    precio: 0,
    precio_min: 0,
    categoria_id: 1,
    stock: 0,
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

  const itemDetails = [
    "marca",
    "modelo",
    "descripcion",
    "sku",
    "color",
    "precio",
    "precio_min",
    "stock",
    "costo",
  ];

  const renderTextField = itemDetails.map((detail) => (
    <TextField
      style={{ width: "25em" }}
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={data[detail]}
      onChange={handleChange}
      // fullWidth
      // helperText={errors[detail]}
      // error={errors[detail] ? true : false}
    />
  ));

  return (
    <Container maxWidth="md" fixed>
      <Typography variant="h2">Agregar Item</Typography>
      <form
        noValidate
        onSubmit={handleSubmit}
        style={{
          width: "25ch",
        }}
      >
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
        <Button type="submit" variant="contained" color="primary">
          Agregar
        </Button>
        <br></br>
      </form>
    </Container>
  );
}
