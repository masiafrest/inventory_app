import React from "react";
import { Divider, Grid, TextField } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ReceiptIcon from "@material-ui/icons/Receipt";
//types
import { Inv } from "./showFetchDataTypes";

export default function RenderInv({
  data,
  showKeyValueText,
  onChangeHandler,
  onClickHandler,
}) {
  return (
    <AccordionDetails>
      <Grid container direction="column">
        {data.inventarios.map((inv: Inv) => {
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
        })}
      </Grid>
    </AccordionDetails>
  );
}
