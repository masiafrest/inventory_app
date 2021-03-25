interface TimeStamp {
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
interface Id {
  id: number;
}
interface Total {
  total: number;
  tax: number;
  sub_total: number;
}
interface _id {
  venta_id: number;
  empresa_cliente_id: number;
  pago_id: number;
  usuario_id: number;
  inventario_id: number;
  item_id: number;
  proveedor_id: number;
}
interface Precio extends Id, Pick<_id, "proveedor_id"> {
  precio: number;
  oferta: bool | null;
  oferta_precio: number | null;
  costo: number | null;
  precio_min: number;
}
