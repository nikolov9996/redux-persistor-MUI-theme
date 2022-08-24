import { createSlice } from "@reduxjs/toolkit";
import { AGENT_TABS_KEYS } from "../../app/constants";
export const AGENTS_SLICE = "agents";

const initialState = {
  agents: [],
  currentAgent: null,
  currentTab: AGENT_TABS_KEYS.ACCOUNTS,
};

const agentsSlice = createSlice({
  name: AGENTS_SLICE,
  initialState,
  reducers: {
    setAgents: (state, { payload }) => {
      state.agents = [...payload];
    },
    setCurrentAgent: (state, { payload }) => {
      state.currentAgent = payload;
    },
    setAgentDetailsTab:(state,{payload})=>{
        state.currentTab = payload
    }
  },
});

export const selectAgents = (state) => state[AGENTS_SLICE].agents;

export const selectCurrentAgent = (state) => state[AGENTS_SLICE].currentAgent;

export const selectAgentDetailsTab = (state) => state[AGENTS_SLICE].currentTab;

export const { setAgents, setCurrentAgent,setAgentDetailsTab } = agentsSlice.actions;

export default agentsSlice.reducer;
