//TODO: add almost all req.body data from server type and use ts Omit or Pick helpers
interface ReduxState {
  user?: ReduxUser;
  UI?: ReduxUI;
  order?: ReduxOrder;
  itemData?: Item;
}
//user state
interface ReduxUser {
  authenticated: boolean;
  credentials: RootUserCredentialsState;
  loading: boolean;
}

interface RootUserCredentialsState {
  nombre?: string;
  rol?: string;
  id?: number;
}

//UI state
type ReduxUI = {
  loading: boolean;
  errors: UserSignInError | null;
};

interface UserSignInErrors {
  nombre: string;
  password: string;
  general: string;
}

//actions
interface Actions {
  type: string;
  payload?: any | UserSignInErrors;
}

// order

interface ReduxOrder {
  header: OrderHeader;
  lineas: OrderLine;
}
interface OrderHeader {
  usuario_id;
  empresa_cliente_id: number | null;
}
interface OrderLine {
  inventario_id;
  qty;
  precio: number | null;
  sku;
  marca;
  modelo: string;
}
// itemData
interface Item {
  id;
  catetoria_id;
  categoria_2_id;
  barcode: number;
  marca;
  modelo;
  descripcion;
  barcode;
  image_url: string;
  inventarios: Inv;
}

interface Inv {
  item_id;
  lugar_id;
  qty;
  basura;
  precio_id;
  id: number;
  color;
  sku: string;
  precio: Precio;
  lugares: Lugares;
}

interface Precio {
  id;
  precio;
  precio_min;
  costo;
  oferta_precio;
  proveedor_id: number;
  oferta: boolean;
}

interface Lugares {
  id: number;
  tipo;
  dirrecion: string;
}
