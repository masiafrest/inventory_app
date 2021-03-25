import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import OrderTable from "./OrderTable";
import { Button } from "@material-ui/core";

//redux
import { RootState } from "../../../../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  addRecibo,
  addClienteId,
} from "../../../../../redux/features/recibo/reciboSlice";

function ccyFormat(num: number) {
  return num ? `${num.toFixed(2)}` : 0.0;
}

function priceRow(qty: number, precio: number): number {
  return qty * precio;
}

export interface ItemRow {
  descripcion: string;
  color: string;
  id: number;
  sku: string;
  marca: string;
  modelo: string;
  qty: number;
  precio: number;
  total?: number;
}

function createRow(linea: Lineas): ItemRow {
  const {
    color,
    descripcion,
    qty,
    precio: { precio },
    id,
    sku,
    marca,
    modelo,
  } = linea;
  const total = priceRow(qty, precio);
  return { color, id, descripcion, sku, marca, modelo, qty, precio, total };
}

let rows: ItemRow[] = [];

function subtotal(items: ItemRow[]) {
  return items.map(({ precio }) => precio).reduce((sum, i) => sum + i, 0);
}

const TAX_RATE = 0.07;
const invoice = {
  Subtotal: 0,
  Taxes: 0,
  Total: 0,
};

export default function OrderTableContainer() {
  const dispatch = useDispatch();
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);

  const [items, setItems] = useState<ItemRow[]>([]);
  const { lineas } = recibo.transferencia;
  const history = useHistory();

  const onClickHandler = () => history.push("/show/items");

  const postReciboHandler = async () => {
    const res = await axios.post("/recibos/venta", recibo);
    console.log(res);
  };
  useEffect(() => {
    if (lineas.length > 0) {
      lineas.forEach((linea) => {
        const row = createRow(linea);

        console.log("items.lenght", items.length);
        if (items.length === 0) {
          setItems((value) => value.concat(row));
          console.log("items.some === 0", items);
        } else {
          console.log("items.some > 0", items);
          items.some((item) => {
            if (item.sku !== row.sku) {
              setItems((value) => value.concat(row));
              console.log("items.sku !== row.sku: ", items);
            }
          });
        }
        invoice.Subtotal = subtotal(items);
        invoice.Taxes = TAX_RATE * invoice.Subtotal;
        invoice.Total = invoice.Taxes + invoice.Subtotal;
      });
    }
  }, []);

  return (
    <>
      <OrderTable
        items={items}
        ccyFormat={ccyFormat}
        invoice={invoice}
        tax={TAX_RATE}
        onClickHandler={onClickHandler}
      />
      <Button onClick={postReciboHandler}>agregar recibo</Button>
    </>
  );
}
