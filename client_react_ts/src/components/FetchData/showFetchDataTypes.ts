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
