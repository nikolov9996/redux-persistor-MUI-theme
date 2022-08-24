import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_TAB_KEYS } from "../../app/constants";

export const PROFILE_SLICE = "profile";

const initialState = {
  profileTab: PROFILE_TAB_KEYS.INFO,
};

const authSlice = createSlice({
  name: PROFILE_SLICE,
  initialState,
  reducers: {
    setProfileTab: (state, { payload }) => {
      state.profileTab = payload;
    },
  },
});

export const selectProfileTab = (state) => state[PROFILE_SLICE].profileTab;

export const { setProfileTab } = authSlice.actions;

export default authSlice.reducer;
