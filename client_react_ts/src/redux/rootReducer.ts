import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import reciboSlice from "./features/recibo/reciboSlice";

const rootReducer = combineReducers({ user: userSlice, recibo: reciboSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
