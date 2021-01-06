import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Divider, Grid } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PostAddIcon from "@material-ui/icons/PostAdd";

import { fakeReduxStore, itemData, image } from "../fakeDataToTest";

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

export default function ItemAccordion() {
  const classes = useStyles();

  function showKeyValueText(data: any, key: string) {
    return <Typography>{`${key}: ${data[key]}`}</Typography>;
  }
  const renderInv = itemData.inventarios.map((inv: any) => {
    return (
      <Grid>
        {showKeyValueText(inv, "sku")}
        {showKeyValueText(inv, "qty")}
        {showKeyValueText(inv, "color")}
        {showKeyValueText(inv.precio, "precio")}
        {inv.precio.oferta
          ? showKeyValueText(inv.precio, "oferta_precio")
          : null}
        {showKeyValueText(inv.precio, "precio_min")}
        <IconButton>
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
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container direction="row">
            <Grid item xs={2}>
              <Avatar src={image} />
            </Grid>
            <Grid item xs container direction="column">
              <Grid item direction="row" container>
                <Grid item xs>
                  <Typography
                    className={classes.heading}
                  >{`Marca: ${itemData.marca} `}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    className={classes.heading}
                  >{`Modelo: ${itemData.modelo}`}</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid item>
                <Typography
                  className={classes.heading}
                >{`Descripcion: ${itemData.descripcion}`}</Typography>
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
