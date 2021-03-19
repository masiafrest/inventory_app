import { useState } from "react";
import useFetchData from "../../../utils/hooks/useFetchData";
import Fab from "../../../components/FloatBtnAdd";
import EditFormDialog from "../../../components/EditableField/EditFormDialog";
import { useHistory } from "react-router-dom";
import DeleteBtn from "../../../components/DeleteBtn";
import ChooseQtyFormBtn from '../../../components/ChooseQtyFormBtn'

//Redux
import { RootState } from "../../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  pushLinea,
  addRecibo,
} from "../../../redux/features/recibo/reciboSlice";

import {
  Paper,
  MobileStepper,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  CardActionArea,
  Grid,
} from "@material-ui/core/";

export default function ShowItems() {
  const url = "/items";
  const { data } = useFetchData(url);
  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();

  const dispatch = useDispatch();
  const recibo = useSelector((state: RootState) => state.recibo);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddItem = () => {
    // add to recibo
  };

  const cardView = data.map((obj) => {
    const src = "http://localhost:5050/uploads/";
    const imgPlaceholder = "https://via.placeholder.com/200";
    const activeImg =
      obj.images.lenght > 0
        ? src + obj.images[activeStep].url_path
        : imgPlaceholder;
    const maxSteps = 1;
    return (
      <Grid item key={obj.id}>
        <Card style={{
          maxWidth: 500}}>
          <Paper square elevation={0}>
            <Typography>
              {obj.marca}, {obj.modelo}
            </Typography>
          </Paper>
          <img src={activeImg} alt={obj.marca + "-" + obj.modelo} />
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                id="mobileSteperNextBtn"
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
              </Button>
            }
            backButton={
              <Button
                id="mobileSteperBackBtn"
                size="small"
                // onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {  `${obj.marca} ${obj.modelo} ${obj.color} ${obj.caracteristica}`}
              <EditFormDialog name={"descripcion"} data={obj} url={url} />
            </Typography>
          </CardContent>
          <CardActions>
            <DeleteBtn url={url} id={obj.id} />
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
