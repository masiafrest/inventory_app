import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import OrderTable from "./OrderTable";
import { Button } from "@material-ui/core";

//redux
import { RootState } from "../../../../../redux/rootReducer";
import { useSelector } from "react-redux";

function roundNum(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calcSubTotal(items: Lineas[]) {
  const sub = items
    .map(({ precio, qty }) => precio.precio * qty)
    .reduce((sum, i) => sum + i, 0);
  console.log(sub);
  console.log(roundNum(sub));
  return sub;
}

const TAX_RATE = 0.07;

export default function OrderTableContainer() {
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);
  const { lineas } = recibo.venta;
  const [items, setItems] = useState<typeof lineas>(lineas);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const invoice = [subTotal, tax, total];

  console.log(recibo);
  const history = useHistory();

  const onClickHandler = () => history.push("/show/items");

  const postReciboHandler = async () => {
    const { usuario_id, empresa_cliente_id } = recibo;
    const cleanLines = lineas.map((item) => {
      const newLines = {
        item_id: item.id,
        qty: item.qty,
        precio: item.precio.precio,
      };
      return newLines;
    });
    const ventaObj = {
      usuario_id,
      empresa_cliente_id,
      sub_total: subTotal,
      tax,
      total,
      lineas: cleanLines,
    };
    const res = await axios.post("/recibos/venta", ventaObj);
    console.log(res);
  };

  useEffect(() => {
    setItems(lineas);
    setSubTotal(roundNum(calcSubTotal(items)));
    setTax(roundNum(TAX_RATE * subTotal));
    setTotal(roundNum(tax + subTotal));
  }, [items, invoice]);

  return (
    <>
      <OrderTable
        items={items}
        invoice={invoice}
        tax={TAX_RATE}
        onClickHandler={onClickHandler}
      />
      <Button onClick={postReciboHandler}>agregar recibo</Button>
    </>
  );
}
