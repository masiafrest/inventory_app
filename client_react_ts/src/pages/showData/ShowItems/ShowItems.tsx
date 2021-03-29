import { useState } from "react";
import useFetchData from "../../../utils/hooks/useFetchData";
import Fab from "../../../components/FloatBtnAdd";
import EditFormDialog from "../../../components/EditableField/EditFormDialog";
import DeleteBtn from "../../../components/DeleteBtn";
import ChooseQtyFormBtn from "../../../components/ChooseQtyFormBtn";

//Redux
import { RootState } from "../../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { pushLinea } from "../../../redux/features/recibo/reciboSlice";

import {
  Paper,
  MobileStepper,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Grid,
} from "@material-ui/core/";

export default function ShowItems() {
  const url = "/items";
  const { data, setData } = useFetchData(url);
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const recibo = useSelector((state: RootState) => state.recibo);

  const cardView = data.map((obj) => {
    console.log(obj);
    const src = "http://localhost:5050/uploads/";
    const imgPlaceholder = "https://via.placeholder.com/200";
    console.log(obj.images.length);
    const activeImg =
      obj.images.length > 0
        ? src + obj.images[activeStep].url_path
        : imgPlaceholder;
    const maxSteps = obj.images.length;
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={obj.id}>
        <Card
          style={{
            maxWidth: 300,
          }}
        >
          <Paper square elevation={0}>
            <Typography>
              {obj.marca}, {obj.modelo}
            </Typography>
          </Paper>
          <img key="img" src={activeImg} alt={obj.marca + "-" + obj.modelo} />
          <MobileStepper
            key="mobileStepper"
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                id="mobileSteperNextBtn"
                size="small"
                onClick={() =>
                  setActiveStep((prevActiveStep) => prevActiveStep + 1)
                }
                disabled={activeStep === maxSteps - 1}
              >
                Next
              </Button>
            }
            backButton={
              <Button
                id="mobileSteperBackBtn"
                size="small"
                onClick={() =>
                  setActiveStep((prevActiveStep) => prevActiveStep - 1)
                }
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {`${obj.marca} ${obj.modelo} ${obj.color} ${obj.descripcion}`}
            </Typography>
            <EditFormDialog name={"descripcion"} data={obj} url={url} />
            <Typography>
              {`Ubicacion: ${obj.lugar.direccion}, ${obj.lugar.tipo}. | Stock: ${obj.stock}`}
            </Typography>
          </CardContent>
          <CardActions>
            <DeleteBtn url={url} id={obj.id} data={data} setData={setData} />
            <ChooseQtyFormBtn item={obj} />
            <Button
              onClick={() => {
                const { lineas } = recibo.transferencia;
                const newLinea = { ...obj };
                newLinea.tipo = "transferencia";
                dispatch(pushLinea(newLinea));
              }}
            >
              transferir
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Typography variant="h3">Items</Typography>
      <Grid container spacing={2}>
        {cardView}
      </Grid>
      <Fab />
    </>
  );
}
