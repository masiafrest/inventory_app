import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import useForm from "../../../../utils/hooks/useForm";

export default function Modal({ state, url, fetch }) {
  let [openModal, setOpenModal] = state;

  const initialState = {
    lugares: {
      direccion: "",
      tipo: "",
    },
    categorias: { nombre: "" },
    proveedores: {
      nombre: "",
      direccion: "",
      telefono: "",
    },
    "usuarios/roles": {
      tipo: "",
    },
    clientes: {
      nombre: "",
      telefono: "",
      direccion: "",
      email: "",
      logo_url: "",
      website_url: "",
      telefono_2: "",
    },
  };

  const textFieldLabel = Object.keys(initialState[url]);

  const {
    data,
    loading,
    handleChange,
    handleSubmit,
    handleSubmitPromise,
  } = useForm(initialState[url], `/${url}`);

  const renderTextField = textFieldLabel.map((detail) => (
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
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleClick = async (e) => {
    await handleSubmitPromise(e);
    fetch();
    setOpenModal(false);
  };
  const checkValues = Object.values(data).every(e => !e)
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openModal}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <DialogContent>{renderTextField}</DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={checkValues}
        >
          aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
