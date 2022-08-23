import { createSlice } from "@reduxjs/toolkit";

export const AUTH_SLICE = "auth";

const initialState = {
  user: {
    token: "",
    name: "",
    roles: [],
  },
  agentId: null,
};

const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.user = payload;
    },
    setAgentId: (state, { payload }) => {
      state.agentId = payload;
    },
  },
});

export const selectUser = (state) => state[AUTH_SLICE].user;

export const selectAgentId = (state) => state[AUTH_SLICE].agentId;

export const { authenticate, setAgentId } = authSlice.actions;

export default authSlice.reducer;
