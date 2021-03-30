import useFormImage from "../../utils/hooks/useFormImage";
import SelectsOptions from "../../components/SelectsOptions";
import UploadAndPreviewImages from "../../components/UploadAndPreviewImages";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function AddUsuario(props: any) {
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
      rol_id: 0,
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
          form={data}
          onChange={handleChange}
          name="roles"
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
