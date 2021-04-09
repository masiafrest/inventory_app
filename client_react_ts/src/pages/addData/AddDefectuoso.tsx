import SelectsOptions from "./components/SelectsOptions";
import useForm from "../../utils/hooks/useForm";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Redux

interface Defectuoso {
  descripcion: string;
}

export default function AddDefectuoso(props: any) {
  const { data, handleSubmit, handleChange } = useForm<Defectuoso>(
    {
      descripcion: "",
    },
    "/defectuoso"
  );
  //   const [previewImg, setPreviewImg] = useState("");

  const defectuosoDetails = ["descripcion"];

  const renderTextField = defectuosoDetails.map((detail) => (
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
      <Typography variant="h2">Agregar Defectuoso</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
        <SelectsOptions
          form={data}
          onChange={handleChange}
          name="items"
          url="items"
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
