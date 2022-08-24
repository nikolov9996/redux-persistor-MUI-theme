import { createSlice } from "@reduxjs/toolkit";
import { AGENT_TABS_KEYS } from "../../app/constants";
export const AGENTS_SLICE = "agents";

const initialState = {
  agents: [],
  accountsForAgent: [],
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
    setAgentDetailsTab: (state, { payload }) => {
      state.currentTab = payload;
    },
    setAccountsForAgent: (state, { payload }) => {
      state.accountsForAgent = [...payload];
    },
    updateAccountForAgent: (state, { payload }) => {
      const temp = [...state.accountsForAgent];

      const { id, active } = payload;

      const toBeUpdated = temp.find((x) => x.id === +id);

      var index = temp.findIndex((x) => x.id === +id);

      temp[index] = { ...toBeUpdated, active: active };
      state.accountsForAgent = [...temp];
    },
  },
});

export const selectAgents = (state) => state[AGENTS_SLICE].agents;

export const selectCurrentAgent = (state) => state[AGENTS_SLICE].currentAgent;

export const selectAgentDetailsTab = (state) => state[AGENTS_SLICE].currentTab;

export const selectAccountsForAgent = (state) =>
  state[AGENTS_SLICE].accountsForAgent;

export const {
  setAgents,
  setCurrentAgent,
  setAgentDetailsTab,
  setAccountsForAgent,
  updateAccountForAgent,
} = agentsSlice.actions;

export default agentsSlice.reducer;
