import React, { Fragment, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PostAddIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  })
);

function DataCard({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const image = data.image_url
    ? `http://localhost:5050/uploads/${JSON.parse(data.image_url)[0]}`
    : undefined;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const renderInv = data.inventarios.map((inv: any) => {
    return (
      <Fragment key={inv.id}>
        <CardActions key={inv.id}>
          <CardContent>
            {showKeyValueText(inv, "sku")}
            {showKeyValueText(inv, "qty")}
            {showKeyValueText(inv, "color")}
            {showKeyValueText(inv.precio, "precio")}
            {inv.precio.oferta
              ? showKeyValueText(inv.precio, "oferta_precio")
              : null}
            {showKeyValueText(inv.precio, "precio_min")}
          </CardContent>
          <IconButton>
            <PostAddIcon />
          </IconButton>
          <IconButton>
            <ReceiptIcon />
          </IconButton>
        </CardActions>
        <Divider />
      </Fragment>
    );
  });
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`Marca: ${data.marca}`}
        subheader={`Modelo: ${data.modelo}`}
      />
      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent>
        {showKeyValueText(data, "descripcion")}
        {showKeyValueText(data, "barcode")}
        {showKeyValueText(data, "categoria_id")}
        {showKeyValueText(data, "categoria_2_id")}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {renderInv}
      </Collapse>
    </Card>
  );
}

function showKeyValueText(data: any, key: string) {
  return <Typography>{`${key}: ${data[key]}`}</Typography>;
}
export default DataCard;
