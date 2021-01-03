import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

// move to global types.
// interface IUIState {
//   loading: boolean;
//   errors: IErrors | null;
// }
// interface IErrors {
//   nombre: string;
//   password: string;
//   general: string;
// }

const initialState: IRootUIState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action: IActions) {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, loading: false, errors: action.payload };
    case CLEAR_ERRORS:
      return { ...state, loading: false, errors: null };
    case LOADING_UI:
      return { ...state, loading: true };
    default:
      return state;
  }
}
