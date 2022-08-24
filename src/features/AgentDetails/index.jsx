import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TableAgentDetails from "./components/TableAgentDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAgentDetailsTab,
  selectCurrentAgent,
  setAccountsForAgent,
} from "../Agents/agentsSlice";
import { useNavigate } from "react-router-dom";
import { AGENT_TABS_KEYS, ROUTES } from "../../app/constants";
import { API } from "../../services";
import TabsAccountAdmin from "../../components/TabsStyledAdmin";
import TableAccountHistory from "../AccountDetails/components/TableAccountHistory";
import TableAccountPayments from "../AccountDetails/components/TableAccountPayments";

const AgentDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const currentAgent = useSelector(selectCurrentAgent);
  const currentTab = useSelector(selectAgentDetailsTab);

  useEffect(() => {
    if (!currentAgent) return navigate(ROUTES.AGENTS);
    else {
      API.getAccountsById(currentAgent.id).then((data) => {
       dispatch(setAccountsForAgent(data))
      });
    }
  }, []);

  return (
    <div>
      <Box p={4}>
        <Typography sx={{ fontSize: 24, color: "#8E8E8E" }}>
          Агент: {currentAgent?.name}
        </Typography>
        <TabsAccountAdmin />
        {AGENT_TABS_KEYS.ACCOUNTS === currentTab && <TableAgentDetails />}
        {AGENT_TABS_KEYS.PAYMENTS === currentTab && <TableAccountPayments />}
        {AGENT_TABS_KEYS.HISTORY === currentTab && <TableAccountHistory />}
      </Box>
    </div>
  );
};

export default AgentDetails;
