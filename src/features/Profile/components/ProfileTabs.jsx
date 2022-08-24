import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { useDispatch, useSelector } from "react-redux";
import { selectProfileTab, setProfileTab } from "../profileSlice";
import { PROFILE_TAB_KEYS } from "../../../app/constants";

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
  min-width: 250px;
  background-color: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: space-between;
`;

export default function ProfileTabs() {
  const dispatch = useDispatch();
  const currentTab = useSelector(selectProfileTab);

  const handleTabChange = ({ target: { accessKey } }) => {
    dispatch(setProfileTab(accessKey));
  };
  return (
    <TabsUnstyled
      onChange={handleTabChange}
      value={currentTab === PROFILE_TAB_KEYS.INFO ? 0 : 1}
    >
      <TabsList>
        <Tab accessKey={PROFILE_TAB_KEYS.INFO}>Информация</Tab>
        <Tab accessKey={PROFILE_TAB_KEYS.REGISTRATIONS}>Регистрации</Tab>
      </TabsList>
    </TabsUnstyled>
  );
}
