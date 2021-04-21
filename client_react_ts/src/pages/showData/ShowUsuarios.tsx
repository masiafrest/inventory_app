import EditFormDialog from "../../components/EditableField/EditFormDialog";
import useFetchData from "../../utils/hooks/useFetchData";
import { Paper, Typography, Grid } from "@material-ui/core";
import Fab from "../../components/FloatBtnAdd";

export default function ShowRoles() {
  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };
  const url = "/usuarios/";
  const { data } = useFetchData(url);

  const paperView = data.map((data) => (
    <Paper
      key={data.nombre}
      style={paperStyle}
      variant="elevation"
      elevation={12}
    >
      <Grid key={data.id} container spacing={3} justify="center">
        <Grid key={data.id} item xs={12} sm={8}>
          nombre: {data.nombre} rol: {data.rol}<EditFormDialog data={data} url={url} name={data.tipo} />
        </Grid>
      </Grid>
    </Paper>
  ));
  return (
    <>
      <Typography variant="h3">Usuarios</Typography>
      {paperView}
      <Fab url='/add/rol' />
    </>
  );
}
