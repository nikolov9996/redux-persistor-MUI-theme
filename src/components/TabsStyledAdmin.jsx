import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";

import { AGENT_TABS_KEYS } from "../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccountDetailsTab,
  setAccountDetailsTab,
} from "../features/Accounts/accountsSlice";
import {
  selectAgentDetailsTab,
  setAgentDetailsTab,
} from "../features/Agents/agentsSlice";

const Tab = styled(TabUnstyled)`
  color: #707070;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #f5f5f5;
  max-width: 250px;
  padding: 6px 16px;
  margin: 6px 6px 6px 0px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  border: 1px solid transparent;

  &:hover {
    background-color: #e4e9f9;
  }

  &:focus {
    color: #1a3caa;
    border-radius: 3px;
    outline: none;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #e4e9f9;
    color: #1a3caa;
    border-color: #657abf;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 300px;
  background-color: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;


export default function TabsAccountAdmin() {
  const dispatch = useDispatch();
  const currentTab = useSelector(selectAgentDetailsTab);

  const handleTabChange = ({ target: { accessKey } }) => {
    dispatch(setAgentDetailsTab(accessKey));
  };

  const getCurrentActive = () => {
    switch (currentTab) {
      case AGENT_TABS_KEYS.ACCOUNTS:
        return 0;
      case AGENT_TABS_KEYS.PAYMENTS:
        return 1;
      case AGENT_TABS_KEYS.HISTORY:
        return 2;
      default:
        return 0;
    }
  };

  return (
    <TabsUnstyled
      onChange={handleTabChange}
      value={getCurrentActive()}
    >
      <TabsList>
        <Tab accessKey={AGENT_TABS_KEYS.ACCOUNTS}>Акаунти</Tab>
        <Tab accessKey={AGENT_TABS_KEYS.PAYMENTS}>Плащания</Tab>
        <Tab accessKey={AGENT_TABS_KEYS.HISTORY}>История</Tab>
      </TabsList>
    </TabsUnstyled>
  );
}
