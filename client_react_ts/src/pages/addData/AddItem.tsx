import SelectsOptions from "./components/SelectsOptions";
import useFormMultipleImages from "../../utils/hooks/useFormMultipleImages";
import axios from 'axios'
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";
import { DropzoneArea } from "material-ui-dropzone";
import { formDataConstructor, imgResize } from '../../utils/hooks/useFormMultipleImages/helper'
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
  barcode: 0,
  images: undefined
};

const itemSchema = Yup.object().shape({
  marca: Yup.string().required('requerido'),
  modelo: Yup.string().required('requerido'),
  descripcion: Yup.string().required('requerido'),
  sku: Yup.string().required('requerido'),
  precio: Yup.number().required('requerido'),
  stock: Yup.number(),
  precio_min: Yup.number(),
  costo: Yup.number(),
  barcode: Yup.number(),
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

const selectsProps = [
  {
    name: 'categoria',
    url: 'categorias',
  },
  {
    name: 'proveedor',
    url: 'proveedores',
  },
  {
    name: 'lugar',
    url: 'lugares',
  },
]

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

  const CustomDropzoneArea = ({
    field,
    form,
    ...props
  }) => (
    <DropzoneArea
      acceptedFiles={["image/*"]}
      maxFileSize={10000000}
      {...props} />
  )

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
        onSubmit={async (values, actions) => {
          console.log(values)
          const formData = formDataConstructor(values);
          console.log(formData)
          try {
            const res = await axios.post('/items', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            console.log(res)
          } catch (err) {
            console.log(err.response)
          }

          actions.setSubmitting(false)
        }}
      >
        {
          (props) => (
            <Form onSubmit={props.handleSubmit}>
              <Grid container spacing={2}>
                {detailsName.map((name) => (
                  <Grid item
                    key={name}
                  // className={classes[name]}
                  >
                    <Field
                      component={TextField}
                      className={classes[name]}
                      id={name}
                      name={name}
                      label={name}
                      // value={data[name]}
                      // onChange={handleChange}
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
                ))
                }
              </Grid>

              <Grid container spacing={2}>
                {
                  selectsProps.map(selectsProp => (
                    <SelectsOptions
                      className={classes.selects}
                      onChange={props.handleChange}
                      value={props.values}
                      name={selectsProp.name}
                      url={selectsProp.url}
                    />
                  ))
                }

              </Grid>
              <Field
                component={CustomDropzoneArea}
                id='images'
                name='images'
                label='images'
                onChange={async (files) => {
                  const { fileBlobResize } = await imgResize(files);
                  props.setFieldValue('images', fileBlobResize)
                }}
              />
              < Button
                type="submit"
                disabled={props.isSubmitting}
                variant="contained"
                color="primary"
              >
                Agregar
            </Button>
            </Form>
          )
        }
      </Formik>

    </>
  );
}
