import { localIp } from "../../../../localIp";
import { useState } from "react";
import EditFormDialog from "../../../../components/EditableField/EditFormDialog";
import DeleteBtn from "../../../../components/DeleteBtn";
import AddBtn from "../components/AddBtn";
import {
  MobileStepper,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Grid,
} from "@material-ui/core/";
export default function CardView({ useData: { data, setData } }) {
  const [activeStep, setActiveStep] = useState(0);
  const url = "/items";
  return data.map((obj) => {
    const src = "http://" + localIp + ":5050/uploads/";
    const imgPlaceholder = "https://via.placeholder.com/200";
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
          <img key="img" src={activeImg} alt={obj.marca + "-" + obj.modelo} />
          <MobileStepper
            key="mobileStepper"
            steps={maxSteps}
            position="static"
            variant="text"
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
              {`Ubicacion: ${obj.lugar.direccion}, ${obj.lugar.tipo}. `}
            </Typography>
            <Typography>{`Stock: ${obj.stock}`}</Typography>
          </CardContent>
          <CardActions>
            <DeleteBtn url={url} id={obj.id} data={data} setData={setData} />
            <AddBtn obj={obj} reciboTipo="venta">
              agregar a venta
            </AddBtn>
            <AddBtn obj={obj} reciboTipo="transferencia">
              transferir
            </AddBtn>
          </CardActions>
        </Card>
      </Grid>
    );
  });
}
