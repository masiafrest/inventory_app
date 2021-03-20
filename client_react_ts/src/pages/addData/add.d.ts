interface Item {
  marca: string;
  descripcion: string;
  modelo: string;
  sku: string;
  color: string;
  precio: number;
  categoria_id: number;
  qty: number;
  lugar_id: number;
  proveedor_id: number;
  costo: number;
  images?: string;
  id?: number;
}

interface Usuario {
  nombre: string;
  password: string;
  telefono: string;
  rol_id: number;
}
