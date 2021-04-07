import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "./Table";
import { Button } from "@material-ui/core";


//redux
import { RootState } from "../../../../../../redux/rootReducer";
import { useSelector } from "react-redux";

export default function OrderTableContainer() {
  const usuario_id = useSelector((state: RootState) => state.user.credentials.id)
  const recibo: Recibos = useSelector((state: RootState) => state.recibo);
  const { lineas } = recibo.transferencia;

  const [items, setItems] = useState<typeof lineas>([]);
  const [destinoId, setDestinoId] = useState();
  const history = useHistory();

  const onClickHandler = () => history.push("/show/items");

  const onSelectHandler = (e) => {
    setDestinoId(e.target.value);
  };

  const postReciboHandler = async () => {
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
        destinoId={destinoId}
        onSelectHandler={onSelectHandler}
      />
      <Button onClick={postReciboHandler} variant="contained">
        agregar recibo
      </Button>
    </>
  );
}
