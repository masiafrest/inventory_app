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

export default function ShowTransferencias() {
    const classes = useStyles();

    const url = '/recibos/transferencia'
    const { data, setData } = useFetchData(url)

    const accordionView = data.map(obj =>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>N° Recibo: {obj.id}</Typography>
                <Typography className={classes.heading}>Vendedor: {obj.usuario.nombre}</Typography>
                <Typography >Fecha: {dayjs(obj.created_at).format('DD-MMM-YYYY hh:mm a')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table style={{ minWidth: 300 }} padding="default" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Descripcion</TableCell>
                                <TableCell align="center">Qty</TableCell>
                                <TableCell align="right">Origen</TableCell>
                                <TableCell align="right">Destino</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {obj.lineas.map(linea => (
                                <TableRow key={linea.id}>
                                    <TableCell align="left">{`${linea.marca} ${linea.modelo} ${linea.color} ${linea.descripcion} id: ${linea.id} `}</TableCell>
                                    <TableCell align="left">
                                        {linea.qty}
                                    </TableCell>
                                    <TableCell align="right">{`${linea.item.lugar.direccion}, ${linea.item.lugar.tipo}`}</TableCell>
                                    <TableCell align="right">
                                        {`${linea.destino.direccion}, ${linea.destino.tipo}`}
                                    </TableCell>
                                </TableRow>
                            ))}
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