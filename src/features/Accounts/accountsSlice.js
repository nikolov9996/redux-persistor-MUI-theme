import { createSlice } from "@reduxjs/toolkit";

export const ACCOUNTS_SLICE = "accounts";

const initialState = {
  accounts: [],
  currentAccount: {},
};

const accountsSlice = createSlice({
  name: ACCOUNTS_SLICE,
  initialState,
  reducers: {
    setAccounts: (state, { payload }) => {
      state.accounts = [...payload];
    },
    setCurrentAccount: (state, { payload }) => {
      state.currentAccount = { ...payload };
    },
  },
});

export const selectAccounts = (state) => state[ACCOUNTS_SLICE].accounts;

export const selectCurrentAccount = (state) =>
  state[ACCOUNTS_SLICE].currentAccount;

export const { setAccounts, setCurrentAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
