const tableNames = {
  categoria: "categoria",
  cheque: "cheque",
  lugar: "lugar",
  empresa_owner: "empresa_owner",
  proveedor: "proveedor",
  empresa_cliente: "empresa_cliente",
  precio: "precio", //dpnd on proveedor.id
  item: "item", //dpnd on precio.id
  inventario: "inventario", //dpnd on item.id, lugar.id
  usuario: "usuario", //dpnd on empresa.id
  //
  cotizacion: "cotizacion",
  garantia: "garantia",
  nota_credito: "nota_credito",
  devolucion: "devolucion",
  pago: "pago",
  venta: "venta", //dpnd on  pago.id
  transferencia: "transferencia",
  linea_transferencia: "linea_transferencia",
  linea_cotizacion: "linea_cotizacion",
  linea_venta: "linea_venta", //dpnd on item.id, cotizacion.id || venta.id
  linea_garantia: "linea_garantia", //dpnd on item.id, garantia.id, venta.id
  linea_nota_credito: "linea_nota_credito", //dpnd on nota_credito.id, garantia.id, venta.id
  linea_devolucion: "linea_devolucion", //dpnd on garantia.id, item.id as salida y entrada, devolution.id
  inventario_log: "inventario_log", //dpnd on item.id, proveedor.id, empleado.id
  precio_log: "precio_log", //dpnd on precio.id, empleado.id,
};
const tipo_pago = {
  yappi: "yappi",
  contado: "contado",
  cheque: "cheque",
  credito: "credito",
  nequi: "nequi",
  transferencia: "transferencia",
};
const tipo_recibo = {
  venta: "venta",
  cotizacion: "cotizacion",
  garantia: "garantia",
  nota_credito: "nota_credito",
  devolucion: "devolucion",
};
const role = {
  jefe: "jefe",
  gerente: "gerente",
  super_admin: "super_admin",
  admin: "admin",
  vendedor: "vendedor",
};

const tipo_lugar = {
  bodega: "bodega",
  tienda: "tienda",
};

module.exports = {
  tableNames,
  tipo_recibo,
  tipo_pago,
  role,
  tipo_lugar,
};
