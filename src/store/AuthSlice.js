import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedin: false };

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state) {
      state.isLoggedin = true;
    },
    Logout(state) {
      state.isLoggedin = false;
    },
  },
});

export const store = configureStore({ reducer: AuthSlice.reducer });

export const authActions = AuthSlice.actions;
