import React from "react";
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

const itemData: any = {
  id: 35,
  nombre: "dos",
  descripcion: "hello",
  modelo: "world",
  barcode: null,
  image_url:
    '["images-1609800290381-555.3852096919965.png","images-1609800290388-708.3983539599237.png"]',
  categoria_id: 1,
  categoria_2_id: null,
  categoria: {
    id: 1,
    nombre: "audifono",
  },
  inventarios: [
    {
      id: 66,
      item_id: 35,
      qty: 10,
      lugar_id: 1,
      basura: null,
      color: "red",
      precio_id: 65,
      sku: "dos-red",
      lugares: {
        id: 1,
        tipo: "tienda",
        direccion: "dorado",
      },
      precio: {
        id: 65,
        precio: 2.99,
        oferta: null,
        oferta_precio: null,
        costo: 0.99,
        precio_min: 1.99,
        proveedor_id: 1,
      },
    },
    {
      id: 68,
      item_id: 35,
      qty: 10,
      lugar_id: 1,
      basura: null,
      color: "bl",
      precio_id: 67,
      sku: "dos-bl",
      lugares: {
        id: 1,
        tipo: "tienda",
        direccion: "dorado",
      },
      precio: {
        id: 67,
        precio: 2.99,
        oferta: null,
        oferta_precio: null,
        costo: 0.99,
        precio_min: 1.99,
        proveedor_id: 1,
      },
    },
  ],
};

const fakeReduxStore = {
  user: {
    credentials: {
      id: 5,
      nombre: "julio1",
      rol: "jefe",
    },
    authenticated: true,
    loading: false,
  },
  UI: {
    loading: false,
    errors: null,
  },
  lugares: [
    {
      id: 1,
      tipo: "tienda",
      direccion: "dorado",
      created_at: "2020-12-30T20:52:44.212Z",
      updated_at: "2020-12-30T20:52:44.212Z",
      deleted_at: null,
    },
    {
      id: 2,
      tipo: "bodega",
      direccion: "condado",
      created_at: "2020-12-30T20:52:44.212Z",
      updated_at: "2020-12-30T20:52:44.212Z",
      deleted_at: null,
    },
  ],
  categoria: [
    {
      id: 1,
      nombre: "audifono",
      created_at: "2020-12-30T20:52:44.224Z",
      updated_at: "2020-12-30T20:52:44.224Z",
      deleted_at: null,
    },
    {
      id: 2,
      nombre: "bocina",
      created_at: "2020-12-30T20:52:44.224Z",
      updated_at: "2020-12-30T20:52:44.224Z",
      deleted_at: null,
    },
  ],
};

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

function ItemCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`Marca: ${itemData.nombre}`}
        subheader={`Modelo: ${itemData.modelo}`}
      />
      <CardMedia
        className={classes.media}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQzSO-hqQB3Onlg23OZ_fS-N59zGI4Wqhvg&usqp=CAU"
        title="Paella dish"
      />
      <CardContent>
        {showKeyValueText(itemData, "descripcion")}
        {showKeyValueText(itemData, "barcode")}
        {showKeyValueText(itemData, "categoria_id")}
        {showKeyValueText(itemData, "categoria_2_id")}
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

var renderInv = itemData.inventarios.map((inv: any) => {
  return (
    <>
      <CardActions>
        <CardContent>
          {showKeyValueText(inv, "sku")}
          {showKeyValueText(inv, "qty")}
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
    </>
  );
});

function showKeyValueText(data: any, key: string) {
  return <Typography>{`${key}: ${data[key]}`}</Typography>;
}
export default ItemCard;
