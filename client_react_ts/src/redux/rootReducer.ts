import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";

const rootReducer = combineReducers({ user: userSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
