const initialState: ReduxItemData = {
  barcode: null,
  categoria_2_id: null,
  catetoria_id: null,
  id: null,
  descripcion: "",
  image_url: "",
  inventarios: [],
  marca: "",
  modelo: "",
};

export default function itemDataReducers(
  state = initialState,
  action: Actions
): ReduxItemData {
  switch (action.type) {
    case "SET_ITEM_DATA":
      return { ...action.payload };
    default:
      return state;
  }
}
