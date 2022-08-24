import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import AccountDetails from "../features/AccountDetails";
import Accounts from "../features/Accounts";
import AgentDetails from "../features/AgentDetails";
import Agents from "../features/Agents";
import Home from "../features/Home";
import Profile from "../features/Profile";
import { ROUTES } from "./constants";

export default function PageRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Home />} exact path="/" />
          <Route element={<Agents />} exact path={ROUTES.AGENTS} />
          <Route element={<Accounts />} exact path={ROUTES.ACCOUNTS} />
          <Route element={<Profile />} exact path={ROUTES.PROFILE} />
          <Route
            element={<AccountDetails />}
            exact
            path={ROUTES.ACCOUNT_DETAILS_PATH}
          />
          <Route
            element={<AgentDetails />}
            exact
            path={ROUTES.AGENT_DETAILS_PATH}
          />
        </Routes>
      </Layout>
    </Router>
  );
}
