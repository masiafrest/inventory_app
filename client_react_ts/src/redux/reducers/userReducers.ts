import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

interface IUserCredentials {
  nombre?: string;
  rol?: string;
  id?: number;
}
interface IUserState {
  authenticated: boolean;
  loading: boolean;
  credentials: IUserCredentials;
}

interface IUserAction {
  type: string;
  payload: IUserPayload;
}
interface IUserPayload {
  usuario: IUserCredentials;
}

const initialState: IUserState = {
  authenticated: false,
  credentials: {},
  loading: false,
};

export default function userReducers(
  state = initialState,
  action: IUserAction
): IUserState {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        credentials: action.payload.usuario,
        authenticated: true,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
