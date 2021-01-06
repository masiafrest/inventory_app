import { idText } from "typescript"

//TODO: add almost all req.body data from server type and use ts Omit or Pick helpers
interface IRootState {
  user?: RootUserState;
  UI?: IRootUIState;
  order?: any;
  itemData?: IItem
}
//user state
interface IRootUserState {
  authenticated: boolean;
  credentials: IRootUserCredentialsState;
  loading: boolean;
}

interface IRootUserCredentialsState {
  nombre?: string;
  rol?: string;
  id?: number;
}

//UI state
interface IRootUIState {
  loading: boolean;
  errors: IIUserSignInError | null;
}

interface IUserSignInErrors {
  nombre: string;
  password: string;
  general: string;
}

//actions
interface IActions {
  type: string;
  payload?: any | IUserSignInErrors;
}

// order

interface IOrderDetail{
  header:
}
interface IOrderHeader {
  usuario_id: number;
  cliente_id: number;
}
interface IOrderLine {
  inventario_id, qty, precio: number
  sku, marca, modelo: string;
}
// itemData
interface IItem{
  id, catetoria_id, categoria_2_id, barcode: number;
  marca, modelo, 
  descripcion,
  barcode, image_url: string;
 inventarios: IInv
}

interface IInv{
  item_id, lugar_id, qty, basura, precio_id, id: number;
  color, sku: string;
  precio:IPrecio;
  lugares: ILugares;
}

interface IPrecio {
  id, precio, precio_min, costo, oferta_precio, proveedor_id: number;
  oferta: boolean;
}

interface ILugares {
  id: number;
  tipo, dirrecion: string
}