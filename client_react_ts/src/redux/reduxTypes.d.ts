//TODO: add almost all req.body data from server type and use ts Omit or Pick helpers
interface ReduxState {
  user?: ReduxUser;
  UI?: ReduxUI;
  order?: ReduxOrder;
  itemData?: ReduxItemData;
}
//actions
interface Actions {
  type: string;
  payload?: any | UserSignInErrors;
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
interface ReduxItemData {
  id;
  catetoria_id;
  categoria_2_id;
  barcode: number | null;
  marca;
  modelo;
  descripcion;
  barcode;
  image_url: string;
  inventarios: Inv[];
}

interface Inv {
  item_id;
  lugar_id;
  qty;
  basura;
  precio_id;
  id: number | null;
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
