import SearchBar from "../../../components/SearchBar";
import useFetchData from "../../../utils/hooks/useFetchData";
import Fab from "../../../components/FloatBtnAdd";

import CardView from "./components/Card";

import { Typography, Grid } from "@material-ui/core/";

export default function ShowItems() {
  const url = "/items";
  const { data, setData } = useFetchData(url);
  return (
    <>
      <Typography variant="h3">Items</Typography>
      <SearchBar setResData={setData} url={url} />
      <Grid
        container
        spacing={2}
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        {!data.length ? (
          "no hay item"
        ) : (
          <CardView useData={{ data, setData }} />
        )}
      </Grid>
      <Fab url="/add/item" />
    </>
  );
}
