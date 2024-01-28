import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducerSlices/user";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
