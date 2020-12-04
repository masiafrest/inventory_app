const tableNames = {
    compañia: 'compañia',
    rol: 'rol',
    empleado: 'empleado',
    cliente: 'cliente',
    recibo: 'recibo',
    tipo_recibo: 'tipo_recibo',
    detalle_nota_credito: 'detalle_nota_credito',
    linea_nota_credito: 'linea_nota_credito',
    detalle_garantia: 'detalle_garantia',
    linea_garantia: 'linea_garantia',
    detalle_venta: 'detalle_venta',
    linea_venta: 'linea_venta',
    detalle_cambio: 'detalle_cambio',
    linea_cambio: 'linea_cambio',
    linea_venta: 'linea_venta',
    item: 'item',
    item_inventario: 'item_inventario',
    lugar: 'lugar',
    telefono: 'telefono'
}
const tipo_pago = {
    yappi: 'yappi',
    contado: 'contado',
    cheque: 'cheque',
    credito: 'credito',
    nequi: 'nequi',
    transferencia: 'transferencia'
}
const tipo_recibo = {
    venta: 'venta',
    garantia: 'garantia',
    nota_credito: 'nota_credito',
    cambio: 'cambio'
}
const role = {
    super_admin: 'super_admin',
    admin: 'admin',
    vendedor: 'vendedor'
}

module.exports = {
    tableNames,
    tipo_recibo,
    tipo_pago,
    role,
} 