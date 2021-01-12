import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import RenderInv from "./RenderInv";
import ShowAvatar from "./ShowAvatar";
import BodyAccordion from "./BodyAccordion";

import { Inv, Items } from "./showFetchDataTypes";

//redux
import { useDispatch } from "react-redux";
import { pushLinea } from "../../redux/features/recibo/reciboSlice";

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

export default function ShowAccordion(props) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const classes = useStyles();
  const { data } = props;
  const [qty, setQty] = useState(1);

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

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container direction="row">
            <ShowAvatar data={data} />
            <Grid item xs container direction="column">
              <BodyAccordion data={data} />
            </Grid>
          </Grid>
        </AccordionSummary>
        {pathname === "/items" ? (
          <RenderInv
            data={data}
            showKeyValueText={showKeyValueText}
            onChangeHandler={onChangeHandler}
            onClickHandler={onClickHandler}
          />
        ) : null}
      </Accordion>
    </div>
  );
}
