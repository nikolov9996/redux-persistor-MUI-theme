import { createSlice } from "@reduxjs/toolkit";

export const ACCOUNTS_SLICE = "accounts";

const initialState = {
    accounts: []
};


const accountsSlice = createSlice({
    name: ACCOUNTS_SLICE,
    initialState,
    reducers: {
        setAccounts: (state, { payload }) => {
            state.accounts = [...payload]
        }
    },
});


export const selectAccounts = (state) => state[ACCOUNTS_SLICE].accounts;

export const { setAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;