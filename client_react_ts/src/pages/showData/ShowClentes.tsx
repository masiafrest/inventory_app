import DetailRow from "../../components/paperView/DetailRow";
import WithPaperView from "../../components/paperView/WithPaperView";
import useFetchData from "../../utils/hooks/useFetchData";
// import useFetch from "../../utils/hooks/useFetch";
import Fab from "../../components/FloatBtnAdd";

import { Typography } from "@material-ui/core";

export default function ShowClientes() {
  // const { data } = useFetch("/categorias", []);
  const url = "/clientes";
  const { data } = useFetchData(url);

  console.log(data);
  const paperView = data.map((data) => (
    <WithPaperView dataArr={data}>
      <DetailRow
        arrayData={data}
        col1={"nombre"}
        col2={"telefono"}
        col3={""}
        url={url}
      />
      <DetailRow
        arrayData={data.precio}
        col1={"email"}
        col2={"telefono"}
        col3={""}
        url={url}
      />
      <DetailRow
        arrayData={data.lugar}
        col1={"direccion"}
        col2={""}
        col3={""}
        url={url}
      />
    </WithPaperView>
  ));
  return (
    <>
      <Typography variant="h3"> Clientes</Typography>
      {paperView}
      <Fab url='/add/cliente' />
    </>
  );
}
