import './ComponentToPrint.css'

export default function ComponentToPrint(props) {

    return (
        <div id="display">
            <header>
                <h1>Recibo</h1>
                <div className="headerAddress">
                    <address>
                        <p>{company}</p>
                        <p>{location}</p>
                    </address>
                    <address>
                        <p>{email}</p>
                        <p>{companyPhone}</p>
                    </address>
                    <address>{status ? <p> {status} </p> : null}</address>
                </div>
            </header>
            <article>
                <h1>Recipient</h1>
                <address>
                    <p>
                        {fullname}
                        <br />
                        {cedula}
                    </p>
                </address>
                <table className="meta">
                    <tbody>
                        <tr>
                            <th>
                                <span>Fecha</span>
                            </th>
                            <td>
                                <span>{createdAt}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <span>Telefono</span>
                            </th>
                            <td>
                                <span>{phone}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="inventory">
                    <thead>
                        <tr>
                            <th>
                                <span>Marca</span>
                            </th>
                            <th>
                                <span>Modelo</span>
                            </th>
                            <th>
                                <span>Imei</span>
                            </th>

                            <th>
                                <span>Costo Aprox.</span>
                            </th>
                            <th>
                                <span>Abono</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>{marca}</span>
                            </td>
                            <td>
                                <span>{model}</span>
                            </td>
                            <td>
                                <span>{imei}</span>
                            </td>
                            <td>
                                <span data-prefix>$</span>
                                <span>{costo}</span>
                            </td>
                            <td>
                                <span data-prefix>$</span>
                                <span>{abono}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="center">
                    <label className="label">
                        <input
                            className="inputLabel"
                            type="checkbox"
                            checked={bateria}
                            readOnly
                        />
              Bateria
              <span className="checkmark"></span>
                    </label>
                    <label className="label">
                        <input
                            className="inputLabel"
                            type="checkbox"
                            checked={tapa}
                            readOnly
                        />
              Tapa
              <span className="checkmark"></span>
                    </label>
                    <label className="label">
                        <input
                            className="inputLabel"
                            type="checkbox"
                            checked={simCard}
                            readOnly
                        />
              simCard
              <span className="checkmark"></span>
                    </label>
                    <label className="label">
                        <input
                            className="inputLabel"
                            type="checkbox"
                            checked={memory}
                            readOnly
                        />
              Memoria
              <span className="checkmark"></span>
                    </label>
                </div>
                <table className="metaBottom">
                    <tbody>
                        <tr>
                            <th>
                                <span>Daño</span>
                            </th>
                            <td colSpan="5">
                                <span className="daño">{daño}</span>
                            </td>
                        </tr>
                    </tbody>
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
        </div>
    )

}