import useFormImage from "../../utils/hooks/useFormImage";
import SelectsOptions from "./components/SelectsOptions";
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

export default function AddUsuario() {
  const classes = useStyle();
  const {
    data,
    previewImg,
    handleChange,
    handleSubmit,
  } = useFormImage<Usuario>(
    {
      nombre: "",
      password: "",
      telefono: "",
      rol_id: 1,
    },
    "/usuarios/addUser"
  );

  const usuarioDetails = [
    "nombre",
    "password",
    "telefono",
    "email",
    "telefono_2",
  ];

  const renderTextField = usuarioDetails.map((detail) => (
    <TextField
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={data[detail]}
      onChange={handleChange}
      // helperText={errors[detail]}
      // error={errors[detail] ? true : false}
    />
  ));

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">Agregar Usuario</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
        <SelectsOptions
          className={classes.selects}
          form={data}
          onChange={handleChange}
          name="rol"
          url="usuarios/roles"
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
