import { Typography, Fab } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {useHistory} from 'react-router-dom'

export default function FloatBtnAdd({setPageState}) {
  const history = useHistory()
  return (
    <Fab
      style={{ right: 50, bottom: 30, position: "fixed" }}
      variant="extended"
      onClick={()=>setPageState('post')}
    >
      <AddBoxIcon />
      <Typography>agregar</Typography>
    </Fab>
  );
}
