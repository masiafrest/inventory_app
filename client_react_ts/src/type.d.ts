//TODO: add almost all req.body data from server type and use ts Omit or Pick helpers
interface IRootState {
  user?: RootUserState;
  UI?: IRootUIState;
  order?: any;
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
interface IOrderHeader {
  user_id: number;
  client_id: number;
}
interface IOrderLine {
  sku: string;
  marca: string;
  modelo: string;
  qty: number;
  price: number;
}
