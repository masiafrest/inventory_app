import useFetchData from "../../utils/hooks/useFetchData";
import { Paper, Typography, Grid } from "@material-ui/core";
import Fab from "../../components/FloatBtnAdd";

export default function ShowRoles() {
  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };
  const { data } = useFetchData("/usuarios/roles");

  const paperView = data.map((data) => (
    <Paper
      key={data.tipo}
      style={paperStyle}
      variant="elevation"
      elevation={12}
    >
      <Grid key={data.tipo} container spacing={3} justify="center">
        <Grid key={data.tipo} item xs={12} sm={8}>
          {data.tipo}
        </Grid>
      </Grid>
    </Paper>
  ));
  return (
    <>
      <Typography variant="h3"> Roles</Typography>
      {paperView}
      <Fab />
    </>
  );
}
