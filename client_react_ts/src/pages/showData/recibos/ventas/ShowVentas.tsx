import useFetchData from "../../../../utils/hooks/useFetchData";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import dayjs from 'dayjs'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
}));

export default function ShowVentas() {
  const classes = useStyles();

  const url = '/recibos/venta'
  const { data, setData } = useFetchData(url)
  console.log(data)
  const accordionView = data.map(obj =>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Ciente: {obj.cliente.nombre}</Typography>
        <Typography className={classes.heading}>Vendedor: {obj.usuario.nombre}</Typography>
        <Typography >Fecha: {dayjs(obj.created_at).format('DD-MMM-YYYY hh:mm a')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 300 }} padding="default" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="center">Descripcion</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obj.lineas.map(linea => (
                <TableRow key={linea.id}>
                  <TableCell align="left">
                    {linea.qty}
                  </TableCell>
                  <TableCell align="left">{`${linea.marca} ${linea.modelo} ${linea.color} ${linea.descripcion} id: ${linea.id} `}</TableCell>
                  <TableCell align="right">{linea.precio.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    {(linea.precio * linea.qty).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{obj.sub_total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>Tax</TableCell>
                <TableCell align="right">{`${(obj.tax * 100).toFixed(0)} %`}</TableCell>
                <TableCell align="right">{obj.tax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{obj.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )

  return (
    <>
      <Typography variant='h3'>Recibos Ventas</Typography>
      {accordionView}
    </>
  )
}