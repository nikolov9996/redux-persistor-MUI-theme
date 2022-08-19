import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Accounts from "../features/Accounts";
import Agents from "../features/Agents";
import Home from "../features/Home";
import Profile from "../features/Profile";


export default function PageRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Home />} exact path="/" />
          <Route element={<Agents />} exact path="/agents" />
          <Route element={<Accounts />} exact path="/accounts" />
          <Route element={<Profile />} exact path="/profile" />

        </Routes>
      </Layout>
    </Router>
  );
}

