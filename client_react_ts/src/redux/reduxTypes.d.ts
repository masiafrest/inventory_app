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
  empresa_cliente_id?: number;
  resuelto?: boolean;
  lineas: Lineas[];
}

interface Lineas {
  inventario_id?: number;
  qty?: number;
  precio?: number;
  venta_id?: number;
  descripcion?: string;
  item_id?: number;
  a_lugar_id?: number;
  sku?: string;
  marca?: string;
  modelo?: string;
}