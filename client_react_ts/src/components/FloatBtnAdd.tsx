import { Typography, Fab } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function FloatBtnAdd() {
  return (
    <Fab
      style={{ right: 50, bottom: 30, position: "fixed" }}
      variant="extended"
    >
      <AddBoxIcon />
      <Typography>agregar</Typography>
    </Fab>
  );
}
