import { Typography, Grid } from "@material-ui/core";
import EditFormDialog from "./EditFormDialog";
export default function EditableField({ data, url }) {
  return (
    <>
      <Grid key={data.nombre} container spacing={3} justify="center">
        <Grid key={data.nombre} item xs={12} sm={8}>
          <Typography key={data.id} id={data.nombre}>
            {data.nombre}
          </Typography>
          <EditFormDialog data={data} url={url} name={data.nombre} />
        </Grid>
      </Grid>
    </>
  );
}
