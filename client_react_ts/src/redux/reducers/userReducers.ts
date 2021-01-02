import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

const initialState = {
  authenthicated: false,
  credentials: {},
  loading: false,
};

export default function userReducers(state = initialState, action: any) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenthicated: true };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        credentials: action.payload.usuario,
        authenthicated: true,
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
