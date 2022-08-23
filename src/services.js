import axios from "axios";
import UserService from "./UserService";

export const httpInstance = axios.create({
  baseURL: "https://billing-ocr.infn.dev/backend/api/",
  timeout: 5000,
});

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

    return await httpInstance.get("account/agent/all", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  changeAgentActiveStatus: async (agentId, accountId, isActive, comment) => {
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
};
