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

export default function Devolucion() {
  const usuario_id = useSelector(
    (state: RootState) => state.user.credentials.id
  );
  //TODO: maybe change all this useState to a reduceState

  const [clientId, setClientId] = useState<number>(null);

  return (
    <>
      <Header useStates={[clientId, setClientId]} />
      <DevolucionTable />
      <Button variant="contained">agregar recibo</Button>
    </>
  );
}
