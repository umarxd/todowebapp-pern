import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const authSlice = createSlice({
  name: "authInfo",
  initialState: {
    userInfo: userInfoFromStorage,
    error: "",
    loading: false,
  },
  reducers: {
    authRequest: (state) => {
      state.error = "";
      state.loading = true;
    },
    authSuccess: (state, { payload }) => {
      state.userInfo = payload;
      state.error = "";
      state.loading = false;
    },
    authFail: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    logout: (state, { payload }) => {
      state.userInfo = null;
    },
  },
});

export const { authRequest, authSuccess, authFail, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
