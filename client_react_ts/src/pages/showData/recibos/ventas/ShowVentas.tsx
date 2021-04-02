import  useFetchData  from "../../../../utils/hooks/useFetchData";
import {Accordion, AccordionSummary, AccordionDetails, Typography, Grid} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ShowVentas() {
    const url = '/recibos/venta'
    const {data, setData} = useFetchData(url)

    const accordionView = data.map(obj => {
            <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    })

    return (
        <>
        <Typography variant='h3'>Recibos Ventas</Typography>
            {accordionView}
        </>
    )
}