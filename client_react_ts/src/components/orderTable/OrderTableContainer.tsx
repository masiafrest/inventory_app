import React, { useState, useEffect } from "react";

//redux
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";

import OrderTable from "./OrderTable";

function ccyFormat(num: number) {
  return num ? `${num.toFixed(2)}` : 0.0;
}

function priceRow(qty: number, price: number) {
  return qty * price;
}

interface ItemRow {
  sku: string;
  marca: string;
  modelo: string;
  qty: number;
  price: number;
  total?: number;
}
function createRow(
  sku: string | any,
  marca: string | any,
  modelo: string | any,
  qty: number | any,
  price: number | any
): ItemRow {
  const total = priceRow(qty, price);
  return { sku, marca, modelo, qty, price, total };
}

let rows: ItemRow[] = [];

function subtotal(items: ItemRow[]) {
  console.log("function subtotal: ", items);
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const TAX_RATE = 0.07;
const invoice = {
  invoiceSubtotal: 0,
  invoiceTaxes: 0,
  invoiceTotal: 0,
};

export default function OrderTableContainer() {
  const recibo: Recibo = useSelector((state: RootState) => state.recibo);
  const [item, setItem] = useState<ItemRow[]>([]);
  const { lineas } = recibo;
  let { invoiceSubtotal, invoiceTaxes, invoiceTotal } = invoice;
  useEffect(() => {
    if (lineas.length > 0) {
      lineas.map((linea) => {
        const { sku, marca, modelo, qty, precio } = linea;
        const row = createRow(sku, marca, modelo, qty, precio);
        rows.push(row);
        setItem(rows);
        invoiceSubtotal = subtotal(rows);
        invoiceTaxes = TAX_RATE * invoiceSubtotal;
        invoiceTotal = invoiceTaxes + invoiceSubtotal;
      });
    }
  }, [lineas]);

  return (
    <OrderTable
      item={item}
      format={ccyFormat}
      invoice={invoice}
      tax={TAX_RATE}
    />
  );
}
