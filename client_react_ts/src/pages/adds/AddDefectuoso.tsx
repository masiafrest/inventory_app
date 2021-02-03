import React, { useState } from "react";
import axios from "axios";
import InvSelect from "../../components/selectsOptions/InventariosSelect";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux

interface Defectuoso {
  descripcion: string;
}

export default function AddDefectuoso(props: any) {
  const [defectuoso, setDefectuoso] = useState<Defectuoso>({
    descripcion: "",
  });
  //   const [previewImg, setPreviewImg] = useState("");
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDefectuoso((value) => ({ ...value, [e.target.name]: e.target.value }));
    console.log(defectuoso);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(defectuoso);
    try {
      const res = await axios.post("/defectuoso", defectuoso);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const defectuosoDetails = ["descripcion"];

  const renderTextField = defectuosoDetails.map((detail) => (
    <TextField
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={defectuoso[detail]}
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
        <InvSelect onChange={handleChange} />
        {/* {errors.general && (
          <Typography variant="body2">{errors.general}</Typography>
        )} */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Agregar
          {loading && <CircularProgress size={30} />}
        </Button>
        <br></br>
      </form>
    </Container>
  );
}
