import { createSlice } from "@reduxjs/toolkit";
import { ACCOUNT_TABS_KEYS, ROWS_PER_PAGE } from "../../app/constants";

export const ACCOUNTS_SLICE = "accounts";

const initialState = {
  accounts: [],
  currentAccount: {},
  accountDetailsTab: ACCOUNT_TABS_KEYS.PAYMENTS,
  currentAccountPayments: [],
  currentAccountHistory: [],
  page: 1,
  rowsPerPage: ROWS_PER_PAGE,
  totalRows: 0,
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
    setAccountDetailsTab: (state, { payload }) => {
      state.accountDetailsTab = payload;
    },
    setCurrentAccountPayments: (state, { payload }) => {
      state.currentAccountPayments = [...payload];
    },
    setCurrentAccountHistory: (state, { payload }) => {
      state.currentAccountHistory = [...payload];
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setRowsPerPage: (state, { payload }) => {
      state.rowsPerPage = payload;
    },
    setTotalRows: (state, { payload }) => {
      state.totalRows = payload;
    },
  },
});

export const selectAccounts = (state) => state[ACCOUNTS_SLICE].accounts;

export const selectCurrentAccount = (state) =>
  state[ACCOUNTS_SLICE].currentAccount;

export const selectAccountDetailsTab = (state) =>
  state[ACCOUNTS_SLICE].accountDetailsTab;

export const selectPage = (state) => state[ACCOUNTS_SLICE].page;

export const selectCurrentAccountHistory = (state) =>
  state[ACCOUNTS_SLICE].currentAccountHistory;

export const selectCurrentAccountPayments = (state) =>
  state[ACCOUNTS_SLICE].currentAccountPayments;

export const selectRowsPerPage = (state) => state[ACCOUNTS_SLICE].rowsPerPage;

export const selectTotalRows = (state) => state[ACCOUNTS_SLICE].totalRows;

export const {
  setAccounts,
  setCurrentAccount,
  setAccountDetailsTab,
  setCurrentAccountHistory,
  setCurrentAccountPayments,
  setPage,
  setRowsPerPage,
  setTotalRows,
} = accountsSlice.actions;

export default accountsSlice.reducer;
