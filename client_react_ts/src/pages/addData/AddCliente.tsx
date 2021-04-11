import SelectsOptions from "./components/SelectsOptions";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";
import useFormImage from "../../utils/hooks/useFormImage";

//MUI
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { useStyle } from "./useStyle";

interface Cliente {
  nombre: string;
  telefono: string;
  direccion: string;
  email: string;
  logo_url: string;
  website_url: string;
  telefono_2: string;
}

export default function AddCliente() {
  const classes = useStyle();
  const {
    data,
    previewImg,
    handleChange,
    handleSubmit,
  } = useFormImage<Cliente>(
    {
      nombre: "",
      telefono: "",
      direccion: "",
      email: "",
      logo_url: "",
      website_url: "",
      telefono_2: "",
    },
    "/clientes/addUser"
  );

  const clienteDetails = [
    "nombre",
    "direccion",
    "telefono",
    "telefono 2",
    "email",
    "website",
  ];

  const renderTextField = clienteDetails.map((detail) => (
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
      <Typography variant="h2">Agregar Cliente</Typography>
      {renderTextField}
      <SelectsOptions
        className={classes.selects}
        onChange={handleChange}
        form={data}
        url="roles"
        name="rol"
      />
      <UploadAndPreviewImages previewImg={previewImg} onChange={handleChange} />
      {/* {errors.general && (
          <Typography variant="body2">{errors.general}</Typography>
        )} */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Agregar
      </Button>
      <br></br>
    </Container>
  );
}
