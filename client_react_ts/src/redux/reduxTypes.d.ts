//user
interface User {
  authenticated: boolean;
  credentials: RootUserCredentialsState;
  loading: boolean;
  errors: null | UserSignInErrors;
}

interface RootUserCredentialsState {
  nombre?: string;
  rol?: string;
  id?: number;
}

//recibo
interface Recibos {
  venta: Venta;
  transferencia: Transferencia;
}

interface Venta {
  usuario_id: number;
  empresa_cliente_id: number;
  lineas: Lineas[];
}
interface Transferencia {
  usuario_id: number;
  lineas: Lineas[];
}

interface Lineas {
  venta_id?: number;
  id?: number;
  qty?: number;
  precio?: Precio;
  sku?: string;
  marca?: string;
  modelo?: string;
  color: string;
  descripcion?: string;
  //transferencia
  item_id?: number;
  destino_lugar_id?: number;
  lugar: {id: number; tipo:string; direccion: string}
}

interface Precio {
  precio: number;
}
