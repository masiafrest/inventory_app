import React from "react";
import { capitalizeFirstChart } from "../../../utils/helper";

import InvLogs from "./InvLogs";
import AccordionView from "./AccordionView";
import PaperView from "./PaperView";
import RecibosChooseView from "./Recibos/ReciboChooseView";

import Typography from "@material-ui/core/Typography";

export default function DataView({ path }) {
  const images = (e) => {
    return e.logo_url || e.images_url;
  };

  const hasData = [
    "nombre",
    "direccion",
    "telefono",
    "telefono_2",
    "website_url",
    "tipo",
    "descripcion",
    "marca",
    "modelo",
    "qty",
    "color",
    "sku",
    "ajuste",
    "evento",
    "fecha",
    "sub_total",
    "tax",
    "total",
    "usuario",
    "cliente",
  ];

  const details = (obj, arrData: string[] = hasData) => {
    // console.log(arrData);
    // console.log(obj);
    const detailsKeys = Object.keys(obj).filter((e) => arrData.includes(e));
    return detailsKeys.map((e) => {
      // console.log(e);
      const title = capitalizeFirstChart(e);
      return <Typography>{`${title}: ${obj[e]}`}</Typography>;
    });
  };
  console.log(path);
  //TODO: maybe add a open close principle on this if statement
  let view;
  if (path.includes("log")) {
    view = <InvLogs details={details} />;
  } else if (path.includes("Items")) {
    view = <AccordionView details={details} />;
  } else if (path.includes("Recibos")) {
    view = <RecibosChooseView />;
  } else {
    view = <PaperView details={details} images={images} path={path} />;
  }

  return view;
}
