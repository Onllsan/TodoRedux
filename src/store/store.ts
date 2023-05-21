import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../component/taskManagerSlice";
import authSlice from "../auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: TodoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
