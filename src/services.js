import axios from "axios";
import UserService from "./UserService";
const token = UserService.getToken();

export const httpInstance = axios.create({
  baseURL: "https://billing-ocr.infn.dev/backend/api/",
  timeout: 5000,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const API = {
  getAccounts: async (agentId) => {
    console.log(agentId);
    return await httpInstance.get("account/agent/all?agentId=" + agentId);
  },
  getAllAccounts: async () => {
    return await httpInstance.get("account/agent/all");
  },
};
