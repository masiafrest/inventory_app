import SelectsOptions from "./components/SelectsOptions";
import useForm from "../../utils/hooks/useForm";

//MUI
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { useStyle } from "./useStyle";

interface Defectuoso {
  descripcion: string;
}

export default function AddDefectuoso(props: any) {
  const classes = useStyle();
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
          className={classes.selects}
          onChange={handleChange}
          name="items"
          url="items"
          value={data}
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
