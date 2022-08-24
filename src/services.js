import axios from "axios";
import UserService from "./UserService";

const httpInstance = axios.create({
  baseURL: "https://billing-ocr.infn.dev/backend/api/",
  timeout: 5000,
});

httpInstance.interceptors.response.use(
  async function (config) {
    return config;
  },
  (error) => {
    const errCode = error.response.status;

    if (errCode === 403) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export const API = {
  getAccountsById: async (agentId) => {
    const token = UserService.getToken();

    return await (
      await httpInstance.get("account/agent/all?agentId=" + agentId, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    ).data;
  },

  getUserData: async () => {
    const token = UserService.getToken();

    return await httpInstance.get("user/current", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getAllAgents: async () => {
    const token = UserService.getToken();

    return await httpInstance.get("agent/all", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  changeAccountActiveStatus: async (agentId, accountId, isActive, comment) => {
    const token = UserService.getToken();

    return await httpInstance.post(
      "account/active",
      {
        accountId: accountId,
        active: isActive,
        agentId: agentId,
        comment: comment,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },
  getPaymentsForAccount: async (agentId, accountId, page, rowsPerPage) => {
    const token = UserService.getToken();
    const isAdmin = UserService.getRole().roles.includes("admin");
    const query = new URLSearchParams();

    query.append("agentId", agentId);
    !isAdmin && query.append("acLong", accountId || agentId);
    query.append("page", page);
    query.append("count", rowsPerPage);

    return await httpInstance.get(`payment/all?${query.toString()}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getCommentsForAccount: async (agentId, accountId, page, rowsPerPage) => {
    const token = UserService.getToken();
    const isAdmin = UserService.getRole().roles.includes("admin");

    const query = new URLSearchParams();

    query.append("agentId", agentId);
    !isAdmin && query.append("accountId", accountId);
    query.append("page", page);
    query.append("count", rowsPerPage);

    return await httpInstance.get(`comment/all?${query.toString()}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  addPaymentToAccount: async (accountId, agentId, date, sum) => {
    const token = UserService.getToken();
    return await httpInstance.post(
      "payment/create",
      {
        accountId: accountId,
        agentId: agentId,
        date: date,
        sum: sum,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
