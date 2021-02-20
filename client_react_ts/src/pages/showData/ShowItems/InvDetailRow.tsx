import { Typography, Grid } from "@material-ui/core";
import EditFormDialog from "./InvEditableField/EditFormDialog";

const editFormDialogFiller = (data, url, name) => {
  return <EditFormDialog data={data} url={url} name={name} />;
};

export default function DetailRow({ arrayData, col1, col2, col3, url }) {
  return (
    <Grid key={arrayData.id} item container spacing={2}>
      <Grid key={arrayData.id} item xs={4} spacing={2}>
        <Typography style={{ textAlign: "center" }}>
          {`${col1}: ${arrayData[col1]}`}
        </Typography>
        {editFormDialogFiller(arrayData, url, col1)}
      </Grid>
      <Grid key={arrayData.id} item xs={4} spacing={2}>
        <Typography style={{ textAlign: "center" }}>
          {`${col2}: ${arrayData[col2]}`}
        </Typography>
        {editFormDialogFiller(arrayData, url, col2)}
      </Grid>
      <Grid key={arrayData.id} item xs={4} spacing={2}>
        <Typography style={{ textAlign: "center" }}>
          {col3 && `${col3}: ${arrayData[col3]}`}
        </Typography>
        {editFormDialogFiller(arrayData, url, col3)}
      </Grid>
    </Grid>
  );
}
