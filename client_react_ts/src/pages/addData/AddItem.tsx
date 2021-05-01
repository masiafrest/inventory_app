import SelectsOptions from "./components/SelectsOptions";
import useFormMultipleImages from "../../utils/hooks/useFormMultipleImages";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";
import { DropzoneArea } from "material-ui-dropzone";
//MUI
import {
  Container,
  Typography,
  // TextField,
  Button,
  Grid,
  InputAdornment,

} from "@material-ui/core";
import { useStyle } from "./useStyle";

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

const itemSchema = Yup.object().shape({
  marca: Yup.string().required('requerido'),
  modelo: Yup.string().required('requerido'),
  descripcion: Yup.string().required('requerido'),
  sku: Yup.string().required('requerido'),
  precio: Yup.number().required('requerido'),
})

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
      key={name}
      className={classes[name]}
    >
      <Field
        component={TextField}
        // className={classes[name]}
        id={name}
        name={name}
        label={name}
      // value={data[name]}
      // onChange={handleChange}
      // autoFocus={name === 'marca'}
      // fullWidth={name === 'descripcion'}
      // multiline={name === 'descripcion'}
      // InputProps={{
      //   startAdornment:
      //     ['precio', 'precio_min', 'costo'].includes(name) ?
      //       <InputAdornment position="start">$</InputAdornment>
      //       : null
      // }}
      // required={
      //   ['marca', 'modelo', 'descripcion', 'sku', 'precio'].includes(name) ?
      //     true : false}
      // helperText={errors[name]}
      // error={errors[name] ? true : false}
      />
    </Grid>
  ));

  return (
    <>
      <Typography variant="h2">Agregar Item</Typography>
      <Formik
        initialValues={
          initialItem
        }
        validationSchema={
          itemSchema
        }
        onSubmit={(values, actions) => {
          console.log('onsubmi ', actions)
          console.log(values)
          actions.setSubmitting(false)
        }}
      >
        {
          (props) => (
            <Form onSubmit={props.handleSubmit}>
              {renderTextField}

              < Button
                type="submit"
                disabled={props.isSubmitting}
                variant="contained"
                color="primary"
              >
                Agregar
            </Button>
              {console.log('ISSUBBMIGINT, ', props.isSubmitting)}
            </Form>
          )
        }
      </Formik>

    </>
  );
}
