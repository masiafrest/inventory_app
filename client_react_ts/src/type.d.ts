//TODO: add almost all req.body data from server type and use ts Omit or Pick helpers
interface IRootState {
  user?: RootUserState;
  UI?: IRootUIState;
  order?: any;
  itemData?: any
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
  inventario_id: number
  sku: string;
  marca: string;
  modelo: string;
  qty: number;
  precio: number;
}
// itemData
interface 