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
  return sub;
}

const TAX_RATE = 0.07;

export default function OrderTableContainer() {
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);
  const { lineas } = recibo.venta;
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const invoice = [subTotal, tax, total];

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
    console.log(ventaObj);
    // const res = await axios.post("/recibos/venta/", ventaObj);
    // console.log(res);
  };

  useEffect(() => {
    //FIX: check why it render 3 time on modQty click
    setSubTotal(roundNum(calcSubTotal(lineas)));
    setTax(roundNum(TAX_RATE * subTotal));
    setTotal(roundNum(tax + subTotal));
  }, [lineas, invoice]);

  return (
    <>
      <OrderTable
        items={lineas}
        invoice={invoice}
        tax={TAX_RATE}
        onClickHandler={onClickHandler}
      />
      <Button variant="contained" onClick={postReciboHandler}>
        agregar recibo
      </Button>
    </>
  );
}
