import { createSlice } from "@reduxjs/toolkit";

export const LAYOUT_SLICE = "layout-slice";

const initialState = {
    location: null
}

const landingSlice = createSlice({
    name: LAYOUT_SLICE,
    initialState,
    reducers: {
        setLocation: (state, { payload }) => {
            state.location = payload;
        }
    }
});

export const selectLocation = (state) => state[LAYOUT_SLICE].location;

export const { setLocation } = landingSlice.actions;

export default landingSlice.reducer;