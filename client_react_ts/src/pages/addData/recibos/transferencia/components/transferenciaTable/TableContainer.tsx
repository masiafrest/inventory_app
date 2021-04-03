import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "./Table";
import { Button } from "@material-ui/core";

import SelectLugar from "../SelectLugar";

//redux
import { RootState } from "../../../../../../redux/rootReducer";
import { useSelector } from "react-redux";

export default function OrderTableContainer() {
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);
  const { lineas } = recibo.transferencia;

  const [items, setItems] = useState<typeof lineas>([]);
  const [destinoId, setDestinoId] = useState(0);
  const history = useHistory();

  const onClickHandler = () => history.push("/show/items");

  const onSelectHandler = (e) => {
    setDestinoId(e.target.value);
  };

  const postReciboHandler = async () => {
    const { usuario_id } = recibo;
    const cleanLines = lineas.map((item) => {
      const newLines = {
        item_id: item.id,
        qty: item.qty,
        destino_lugar_id: destinoId,
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
      <Table
        items={items}
        onClickHandler={onClickHandler}
        SelectComp={
          <SelectLugar
            destinoId={destinoId}
            onChange={onSelectHandler}
            name="lugar"
          />
        }
      />
      <Button onClick={postReciboHandler} variant="contained">
        agregar recibo
      </Button>
    </>
  );
}