export interface Id {
  id: number;
}
export interface Lugares extends Id {
  direccion: string;
  tipo: string;
}
interface Precio extends Id {
  costo: number;
  precio: number;
  precio_min: number;
  proveedor_id: number;
  oferta_precio: number | null;
  oferta: boolean;
}
export interface Inv extends Id {
  basura: boolean;
  color: string;
  sku: string;
  item_id: number;
  lugar_id: number;
  qty: number;
  lugares: Lugares;
  precio: Precio;
  precio_id: number;
}
export interface Items extends Id {
  marca: string;
  descripcion: string;
  modelo: string;
  barcode: number;
  image_url: string | Array<string>;
  categoria_id: number;
  categoria_2_id: number;
  cateroria: Array<Categoria>;
}
export interface Categoria extends Id {
  nombre: string;
}
