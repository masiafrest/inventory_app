import React, { useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Divider, Grid, TextField } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PostAddIcon from "@material-ui/icons/PostAdd";

//redux
import { useDispatch } from "react-redux";
import { pushLinea } from "../redux/features/recibo/reciboSlice";

interface Id {
  id: number;
}
interface Lugares extends Id {
  direccion: string;
  tipo: string;
}
interface Precio extends Id {
  costo: number;
  precio: number;
  precio_min: number;
  proveedor_id: number;
  oferta_precio: number | null;
  oferta: boolean;
}
interface Inv extends Id {
  basura: boolean;
  color: string;
  sku: string;
  item_id: number;
  lugar_id: number;
  qty: number;
  lugares: Lugares;
  precio: Precio;
  precio_id: number;
}
interface Items extends Id {
  marca: string;
  descripcion: string;
  modelo: string;
  barcode: number;
  image_url: string | Array<string>;
  categoria_id: number;
  categoria_2_id: number;
  cateroria: Array<Categoria>;
}
interface Categoria extends Id {
  nombre: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

export default function DataAccordion(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { data } = props;
  const [qty, setQty] = useState(1);

  console.log("image: type of ", typeof data.image_url);

  const onChangeHandler = (e: any) => {
    setQty(e.target.value);
  };
  const onClickHandler = (inv: Inv, item: Items) => {
    const { sku } = inv;
    const { precio, precio_min } = inv.precio;
    const { marca, modelo } = item;
    const linea = {
      sku,
      marca,
      modelo,
      qty,
      precio,
      precio_min,
    };
    dispatch(pushLinea(linea));
    //TODO: add animacion de q se agrego
  };
  function showKeyValueText(obj: any, key: string) {
    return <Typography>{`${key}: ${obj[key]}`}</Typography>;
  }

  const renderInv = data.inventarios.map((inv: Inv) => {
    return (
      <Grid key={inv.id}>
        {showKeyValueText(inv, "sku")}
        {showKeyValueText(inv, "qty")}
        {showKeyValueText(inv, "color")}
        {showKeyValueText(inv.precio, "precio")}
        {inv.precio.oferta
          ? showKeyValueText(inv.precio, "oferta_precio")
          : null}
        {showKeyValueText(inv.precio, "precio_min")}
        <TextField
          id="inv.id"
          label="cantidad"
          variant="outlined"
          defaultValue={1}
          margin="dense"
          onChange={onChangeHandler}
          type="number"
        ></TextField>
        <IconButton onClick={() => onClickHandler(inv, data)}>
          <PostAddIcon />
        </IconButton>
        <IconButton>
          <ReceiptIcon />
        </IconButton>
        <Divider />
      </Grid>
    );
  });

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container direction="row">
            <Grid item xs={2}>
              <Avatar
                src={
                  data.image_url
                    ? `http://localhost:5050/uploads/${
                        JSON.parse(data.image_url)[0]
                      }`
                    : undefined
                }
              />
            </Grid>
            <Grid item xs container direction="column">
              <Grid item direction="row" container>
                <Grid item xs>
                  <Typography
                    className={classes.heading}
                  >{`Marca: ${data.marca} `}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    className={classes.heading}
                  >{`Modelo: ${data.modelo}`}</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid item>
                <Typography
                  className={classes.heading}
                >{`Descripcion: ${data.descripcion}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            {renderInv}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
