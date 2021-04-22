import React from 'react'
import dayjs from 'dayjs'

import './ComponentToPrint.css'
import PrintIcon from "@material-ui/icons/Print";
import Button from "@material-ui/core/Button";
import { Box } from '@material-ui/core'
import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
    centerButtonDialog: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "10px"
    },
}));

export default class ComponentToPrint extends React.Component<any> {
    render() {
        console.log("ComponentToPrint render: ", this.props);
        const { lineas, client, TAX_RATE, subTotal, tax, total, isCredit } = this.props
        return (
            <Box display='none' displayPrint='block'>
                <header>
                    <h1>Recibo</h1>
                    <div className="headerAddress">
                        <address>
                            <p>Cliente: {client?.nombre}</p>
                            <p>Dirrecion: {client?.dirrecion}</p>
                        </address>
                        <address>
                            <p>email</p>
                            <p>Telefono: {client?.telefono}</p>
                        </address>
                        <address>{client?.isCredit ? 'Credito' : 'Contado'}</address>
                    </div>
                </header>
                <article>
                    <table className="meta">
                        <tbody>
                            <tr>
                                <th>
                                    <span>Fecha</span>
                                </th>
                                <td>
                                    <span>{dayjs().format('DD-MMM-YYYY')}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="inventory">
                        <thead>
                            <tr>
                                <th>
                                    <span>Qty</span>
                                </th>
                                <th>
                                    <span>Descripcion</span>
                                </th>
                                <th>
                                    <span>Precio</span>
                                </th>

                                <th>
                                    <span>Total</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineas.map(linea => (
                                <tr>
                                    <td>
                                        <span>{linea.qty}</span>
                                    </td>
                                    <td>
                                        <span>{linea.marca} {linea.modelo} {linea.descripcion}</span>
                                    </td>
                                    <td>
                                        <span data-prefix>$</span>
                                        <span>{linea.precio.precio.toFixed(2)}</span>
                                    </td>
                                    <td>
                                        <span data-prefix>$</span>
                                        <span>{(linea.precio.precio * linea.qty).toFixed(2)}</span>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <div className="center">
                        <label className="label">
                            <input
                                className="inputLabel"
                                type="checkbox"
                                checked={true}
                                readOnly
                            />
              Bateria
              <span className="checkmark"></span>
                        </label>
                        <label className="label">
                            <input
                                className="inputLabel"
                                type="checkbox"
                                checked={true}
                                readOnly
                            />
              Tapa
              <span className="checkmark"></span>
                        </label>
                        <label className="label">
                            <input
                                className="inputLabel"
                                type="checkbox"
                                checked={true}
                                readOnly
                            />
              simCard
              <span className="checkmark"></span>
                        </label>
                        <label className="label">
                            <input
                                className="inputLabel"
                                type="checkbox"
                                checked={true}
                                readOnly
                            />
              Memoria
              <span className="checkmark"></span>
                        </label>
                    </div>
                    <table className="balance">
                        <tr>
                            <th><span >SubTotal</span></th>
                            <td><span data-prefix>$</span><span>{subTotal.toFixed(2)}</span></td>
                        </tr>
                        <tr>
                            <th><span >Tax</span></th>
                            <td><span data-prefix>$</span><span >{tax.toFixed(2)}</span></td>
                        </tr>
                        <tr>
                            <th><span >Total</span></th>
                            <td><span data-prefix>$</span><span>{total.toFixed(2)}</span></td>
                        </tr>
                    </table>
                </article>
                <aside>
                    <h1>
                        <span>Notas Adicionales</span>
                    </h1>
                    <div>
                        <p>despues de 30 dias el equipo es propiedad del comerciante</p>
                    </div>
                </aside>

            </Box>
        );
    }
}