import useFetchData from "../../utils/hooks/useFetchData";
import { Paper, Typography, Grid } from "@material-ui/core";
import Fab from "../../components/FloatBtnAdd";

export default function ShowLugares() {
  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };
  const { data } = useFetchData("/lugares");

  const paperView = data.map((data) => (
    <Paper
      key={data.direccion}
      style={paperStyle}
      variant="elevation"
      elevation={12}
    >
      <Grid key={data.direccion} container spacing={3} justify="center">
        <Grid key={data.direccion} item xs={12} sm={8}>
          {data.direccion}, {data.tipo}
        </Grid>
      </Grid>
    </Paper>
  ));

  return (
    <>
      <Typography variant="h3"> Lugares</Typography>
      {paperView}
      <Fab />
    </>
  );
}
