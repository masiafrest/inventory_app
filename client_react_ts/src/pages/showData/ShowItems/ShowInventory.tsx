import { useLocation, useHistory } from "react-router-dom";
import InvDetailRow from "./InvDetailRow";
import useFetchData from "../../../utils/hooks/useFetchData";
import WithPaperView from "../../../components/paperView/WithPaperView";
import ChooseQtyFormBtn from "../../../components/ChooseQtyFormBtn";
//MUi
import FabAdd from "../../../components/FloatBtnAdd";
import DeleteBtn from "../../../components/DeleteBtn";
import { Typography } from "@material-ui/core";

const invDetailRowFiller = (data, col1, col2, col3, url) => (
  <InvDetailRow
    arrayData={data}
    col1={col1}
    col2={col2}
    col3={col3}
    url={url}
  />
);

const NoInv = () => <Typography variant="h3">no hay inventario</Typography>;

export default function ShowInventory() {
  let location = useLocation<any>();
  const history = useHistory();
  //check if location.state is undefined
  if (!location.state) {
    history.push("/show/items");
  }
  const { item_id } = location.state;
  // const { item_id } = useSelector((state: RootState) => state.itemId);
  const url = "/items/inventarios";
  const { data } = useFetchData(url + "/" + item_id);

  const paperStyle: React.CSSProperties = {
    margin: 20,
    padding: 20,
    paddingLeft: 50,
  };

  const invView = data.map((inv) => (
    <WithPaperView dataArr={inv} key={inv.id + "_" + inv.sku}>
      {invDetailRowFiller(inv, "sku", "color", "qty", url)}
      {invDetailRowFiller(inv.precio, "precio", "precio_min", "", url)}
      {invDetailRowFiller(inv.lugar, "tipo", "direccion", "", url)}
      <DeleteBtn url={url} id={inv.id} key={inv.id} />
      <ChooseQtyFormBtn inv={inv} />
    </WithPaperView>
  ));
  return (
    <>
      {invView.length > 0 ? invView : <NoInv />}
      <FabAdd />
    </>
  );
}
