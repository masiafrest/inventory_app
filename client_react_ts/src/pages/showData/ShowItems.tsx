import { useState } from "react";
import useFetchData from "../../utils/hooks/useFetchData";
import Fab from "../../components/FloatBtnAdd";

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
  const { data } = useFetchData("/items");
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const cardView = data.map((obj) => {
    const src = "http://localhost:5050/uploads/";
    const imgPlaceholder = "https://via.placeholder.com/150";
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
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {"barcode: " + obj.barcode}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {"descripcion: " + obj.descripcion}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
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
