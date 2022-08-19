import { createSlice } from "@reduxjs/toolkit";

export const AUTH_SLICE = "auth";

const initialState = {
  user: {
    token: "",
    name: "",
    roles: [],
  },
};

const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const selectUser = (state) => state[AUTH_SLICE].user;

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
