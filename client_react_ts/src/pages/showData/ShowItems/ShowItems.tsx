import { useState } from "react";
import useFetchData from "../../../utils/hooks/useFetchData";
import Fab from "../../../components/FloatBtnAdd";
import EditFormDialog from "../../../components/EditableField/EditFormDialog";
import { useHistory } from "react-router-dom";
import DeleteBtn from "../../../components/DeleteBtn";

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

  const handleCardClick = (obj) => {
    history.push({
      pathname: "/show/inventarios",
      state: {
        item_id: obj.id,
      },
    });
    // setisInvSelected(true);
    // setInvData(obj.inventarios);
  };

  const handleAddItem = () => {
    // add to recibo
  };

  const cardView = data.map((obj) => {
    const src = "http://localhost:5050/uploads/";
    const imgPlaceholder = "https://via.placeholder.com/300";
    const activeImg =
      obj.images.lenght > 0
        ? src + obj.images[activeStep].url_path
        : imgPlaceholder;
    const maxSteps = 1;
    return (
      <>
        <Card>
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
            <Typography variant="body2" color="textSecondary" component="p">
              {"barcode: " + obj.barcode}
              <EditFormDialog name={"barcode"} data={obj} url={url} />
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {"descripcion: " + obj.descripcion}
              <EditFormDialog name={"descripcion"} data={obj} url={url} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleCardClick(obj)}
            >
              Ver Inventario
            </Button>
            <DeleteBtn url={url} id={obj.id} />
          </CardActions>
        </Card>
      </>
    );
  });
  return (
    <>
      <Typography variant="h3">Items</Typography>
      {cardView}
      <Fab />
    </>
  );
}
