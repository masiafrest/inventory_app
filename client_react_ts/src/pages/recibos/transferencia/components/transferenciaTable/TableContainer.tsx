import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Table from "./Table";
import { Button } from "@material-ui/core";

//redux
import { RootState } from "../../../../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  addRecibo,
  addClienteId,
} from "../../../../../redux/features/recibo/reciboSlice";

export default function OrderTableContainer() {
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);
  const { lineas } = recibo.transferencia;
  const dispatch = useDispatch();

  const [items, setItems] = useState<typeof lineas>([]);
  const history = useHistory();

  const onClickHandler = () => history.push("/show/items");

  const postReciboHandler = async () => {
    const { usuario_id } = recibo;
    const cleanLines = lineas.map((item) => {
      const newLines = {
        item_id: item.id,
        qty: item.qty,
        destino_lugar_id: "",
      };
      return newLines;
    });
    const transferObj = {
      usuario_id,
      lineas: cleanLines,
    };
    console.log(transferObj);
    // const res = await axios.post("/recibos/transferencia", recibo.transferencia);
    // console.log(res);
  };
  useEffect(() => {
    setItems(lineas);
  }, []);

  return (
    <>
      <Table items={items} onClickHandler={onClickHandler} />
      <Button onClick={postReciboHandler} variant="contained">
        agregar recibo
      </Button>
    </>
  );
}
