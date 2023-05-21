import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/User";

interface AuthState {
  user: null | User;
  initializing: boolean;
}

const initialState: AuthState = {
  user: null,
  initializing: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setInitializing: (state, action: PayloadAction<boolean>) => {
      state.initializing = action.payload;
    },
  },
});

export const { login, logout, setInitializing } = authSlice.actions;

export default authSlice.reducer;
