import { format } from "date-fns";

export const ROUTES = {
  AGENTS: "/agents",
  ACCOUNTS: "/accounts",
  PROFILE: "/profile",
  ACCOUNT_DETAILS_PATH: "/account/:accountId",
  ACCOUNT_DETAILS: (accountId) => `/account/${accountId}`,
  AGENT_DETAILS_PATH: "/agent/:agentId",
  AGENT_DETAILS: (agentId) => `/agent/${agentId}`,
};

export const FORMAT_DATE = (date) => format(new Date(date), "dd.MM.yyyy");

export const ACCOUNT_TABS_KEYS = {
  PAYMENTS: "PAYMENTS",
  HISTORY: "HISTORY",
};

export const AGENT_TABS_KEYS = {
  ACCOUNTS: "ACCOUNTS",
  PAYMENTS: "PAYMENTS",
  HISTORY: "HISTORY",
};

export const PROFILE_TAB_KEYS = {
  INFO: "INFO",
  REGISTRATIONS: "REGISTRATIONS",
};

export const ROWS_PER_PAGE = 10;
