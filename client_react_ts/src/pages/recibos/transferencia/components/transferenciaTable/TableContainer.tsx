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

export interface ItemRow {
  descripcion: string;
  color: string;
  id: number;
  sku: string;
  marca: string;
  modelo: string;
  qty: number;
  precio: number;
  lugar: {id: number; tipo:string; direccion: string}
  total?: number;
}

let rows: ItemRow[] = [];

export default function OrderTableContainer() {
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);
  const { lineas } = recibo.transferencia;
  const dispatch = useDispatch();

  const [items, setItems] = useState<typeof lineas>([]);
  const history = useHistory();

  const onClickHandler = () => history.push("/show/items");

  const postReciboHandler = async () => {
    const res = await axios.post("/recibos/transferencia", recibo.transferencia);
    console.log(res);
  };
  useEffect(() => {
    setItems(lineas)
  }, []);

  return (
    <>
      <Table
        items={items}
        onClickHandler={onClickHandler}
      />
      <Button onClick={postReciboHandler} variant='contained'>agregar recibo</Button>
    </>
  );
}
