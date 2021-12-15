import { createSlice } from "@reduxjs/toolkit";

export const LANDING_SLICE = "landing-slice";

const initialState = {
    page: 0
}

const landingSlice = createSlice({
    name: LANDING_SLICE,
    initialState,
    reducers: {
        setPage: (state, { payload }) => {
            state.page = payload;
        }
    }
});

export const selectPage = (state) => state[LANDING_SLICE].page;

export const { setPage } = landingSlice.actions;

export default landingSlice.reducer;