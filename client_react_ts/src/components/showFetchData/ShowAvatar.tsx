import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

export default function ShowAvatar({ data }) {
  return (
    <Grid item xs={2}>
      <Avatar
        src={
          data.image_url
            ? `http://localhost:5050/uploads/${JSON.parse(data.image_url)[0]}`
            : undefined
        }
      />
    </Grid>
  );
}
