import { ChangeEvent, useState } from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

export default function FormDialog({ data, url, name }) {
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    try {
      console.log(updateData);
      const res = await axios.patch(url, updateData);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(updateData);
    setUpdateData({ id: data.id, [e.target.name]: e.target.value });
    // setUpdateData((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name={name}
              autoFocus
              margin="dense"
              id={data.id}
              label={name}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar y no actualizar
            </Button>
            <Button type="submit" color="primary">
              Actualizar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
