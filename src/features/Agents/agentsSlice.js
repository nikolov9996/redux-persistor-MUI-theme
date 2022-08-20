import { createSlice } from "@reduxjs/toolkit";

export const AGENTS_SLICE = "agents";

const initialState = {
    agents: []
};


const agentsSlice = createSlice({
    name: AGENTS_SLICE,
    initialState,
    reducers: {
        setAgents: (state, { payload }) => {
            state.agents = [...payload]
        }
    },
});


export const selectAccounts = (state) => state[AGENTS_SLICE].agents;

export const { setAgents } = agentsSlice.actions;

export default agentsSlice.reducer;