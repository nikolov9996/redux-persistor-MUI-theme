import { format } from "date-fns";

export const ROUTES = {
  AGENTS: "/agents",
  ACCOUNTS: "/accounts",
  PROFILE: "/profile",
  ACCOUNT_DETAILS_PATH: "/account/:accountId",
  ACCOUNT_DETAILS: (accountId) => `/account/${accountId}`,
};

export const FORMAT_DATE = (date) => format(new Date(date), "dd.MM.yyyy");
