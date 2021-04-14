import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DevolucionTable from "./components/DevolucionTable";
import { Button } from "@material-ui/core";
import { calcSubTotal, roundNum } from "../utils";

//redux
import { RootState } from "../../../../redux/rootReducer";
import { useSelector } from "react-redux";

import Header from "./components/Header";
export interface VentaYDevoluciones {
  ventas?: VentasEntity[] | null;
  devoluciones?: null[] | null;
}
export interface VentasEntity {
  id: number;
  venta_id: number;
  item_id: number;
  qty: number;
  precio: number;
  tax?: null;
  total?: null;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  item: Item;
}
export interface Item {
  id: number;
  marca: string;
  modelo: string;
  color: string;
  stock: number;
  descripcion: string;
  barcode: string;
  sku: string;
  precio_id: number;
  categoria_id: number;
  categoria_2_id?: null;
  lugar_id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
}

export default function Devolucion() {
  const usuario_id = useSelector(
    (state: RootState) => state.user.credentials.id
  );
  //TODO: maybe change all this useState to a reduceState

  const [clientId, setClientId] = useState<number>(null);
  const [selectedItemId, setSelectedItemId] = useState<any>();
  const [lineas, setLineas] = useState<VentaYDevoluciones>();
  const [hasLineas, setHasLineas] = useState(false);

  const getLineasVentaYDevolucion = async () => {
    try {
      const res = await axios.get(`/recibos/devolucion/clientId/${clientId}`);
      console.log(res.data);
      setLineas(res.data);
      setHasLineas(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getLineasVentaYDevolucion();
    console.log("useEffect lineas", lineas);
  }, [clientId]);

  return (
    <>
      <Header
        useStates={[
          clientId,
          setClientId,
          selectedItemId,
          setSelectedItemId,
          hasLineas,
          setHasLineas,
          lineas,
          setLineas,
        ]}
      />
      <DevolucionTable />
      <Button variant="contained">agregar recibo</Button>
    </>
  );
}
