import React from "react";
import { capitalizeFirstChart } from "../../../utils/helper";

import InvLogs from "./InvLogs";
import AccordionView from "./AccordionView";
import PaperView from "./PaperView";
import Recibos from "./Recibos";

import Typography from "@material-ui/core/Typography";

export default function DataView({ dataState, path }) {
  const { data } = dataState;

  const images = (e) => {
    return e.logo_url || e.images_url;
  };

  const hasData = [
    "nombre",
    "direccion",
    "telefono",
    "telefono 2",
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
    console.log(arrData);
    console.log(obj);
    const detailsKeys = Object.keys(obj).filter((e) => arrData.includes(e));
    return detailsKeys.map((e) => {
      const title = capitalizeFirstChart(e);
      return <Typography key={obj[e].id}>{`${title}: ${obj[e]}`}</Typography>;
    });
  };

  console.log(path);
  let view;
  if (path.includes("log")) {
    view = <InvLogs dataState={dataState} details={details} />;
  } else if (path.includes("Items")) {
    view = <AccordionView dataState={dataState} details={details} />;
  } else if (path.includes("Recibos")) {
    view = <Recibos dataState={dataState} details={details} />;
  } else {
    view = (
      <PaperView data={data} details={details} images={images} path={path} />
    );
  }

  return view;
}
