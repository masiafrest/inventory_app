import useFetchData from "../../utils/hooks/useFetchData";
import EditFormDialog from "../../components/EditableField/EditFormDialog";
// import useFetch from "../../utils/hooks/useFetch";
import Fab from "../../components/FloatBtnAdd";

import { Paper, Typography, Grid } from "@material-ui/core";

export default function ShowCategorias() {
  const url = "/categorias";
  // const { data } = useFetch("/categorias", []);
  const { data } = useFetchData(url);
  console.log("categorias");
  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };
  console.log(data);
  const paperView = data.map((data) => (
    <Paper
      key={data.nombre}
      style={paperStyle}
      variant="elevation"
      elevation={12}
    >
      <Grid key={data.nombre} container spacing={3} justify="center">
        <Grid key={data.nombre} item xs={12} sm={8}>
          {data.nombre}{" "}
          <EditFormDialog data={data} url={url} name={data.nombre} />
        </Grid>
      </Grid>
    </Paper>
  ));
  return (
    <>
      <Typography variant="h3"> Categorias</Typography>
      {paperView}
      <Fab />
    </>
  );
}
