import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import VentaTable from "./components/VentaTable";
import { Button } from "@material-ui/core";
import { roundNum, calcSubTotal } from "../utils";
//redux
import { RootState } from "../../../../redux/rootReducer";
import { useSelector } from "react-redux";

import Header from "./components/Header";

const TAX_RATE = 0.07;
export default function VentaRecibo() {
  const usuario_id = useSelector(
    (state: RootState) => state.user.credentials.id
  );
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);
  const { lineas } = recibo.venta;
  //TODO: maybe change all this useState to a reduceState
  const [clientId, setClientId] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isTax, setIsTax] = useState(true);
  const [isCredit, setIsCredit] = useState(false);

  const history = useHistory();

  const onClickHandler = () => history.push("/show/items");

  const postReciboHandler = async () => {
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
      empresa_cliente_id: clientId,
      sub_total: subTotal,
      tax,
      total,
      credito: isCredit,
      lineas: cleanLines,
    };
    console.log(ventaObj);
    const res = await axios.post("/recibos/venta/", ventaObj);
    console.log(res);
  };

  useEffect(() => {
    //FIX: check why it render 3 time on modQty click
    setSubTotal(roundNum(calcSubTotal(lineas)));
    setTax(roundNum(TAX_RATE * subTotal));
    if (isTax) {
      setTax(roundNum(TAX_RATE * subTotal));
      setTotal(roundNum(tax + subTotal));
    } else {
      setTax(0);
      setTotal(roundNum(subTotal));
    }
  }, [lineas, subTotal]);

  return (
    <>
      <Header
        creditState={[isCredit, setIsCredit]}
        clienteState={[clientId, setClientId]}
      />
      <VentaTable
        items={lineas}
        invoice={[subTotal, tax, total]}
        TAX_RATE={TAX_RATE}
        onClickHandler={onClickHandler}
        taxState={[isTax, setIsTax]}
      />
      <Button variant="contained" onClick={postReciboHandler}>
        agregar recibo
      </Button>
    </>
  );
}
