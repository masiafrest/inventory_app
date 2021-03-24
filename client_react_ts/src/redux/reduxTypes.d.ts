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
interface Recibo {
  usuario_id: number;
  empresa_cliente_id: number;
  resuelto?: boolean;
  lineas: Lineas[];
}

interface Lineas {
  id?: number;
  qty?: number;
  precio?: Precio;
  venta_id?: number;
  color: string;
  descripcion?: string;
  item_id?: number;
  destino_lugar_id?: number;
  sku?: string;
  marca?: string;
  modelo?: string;
}

interface Precio {
  precio: number;
}
