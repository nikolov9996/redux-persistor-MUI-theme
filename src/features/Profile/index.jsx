import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserService from "../../UserService";
import AddAccount from "./components/AddAccount";
import ProfileTabs from "./components/ProfileTabs";

const index = () => {
  const name = UserService.getFullName()
  return (
    <div>
      <Box p={4}>
        <Typography sx={{ fontSize: 24, color: "#8E8E8E" }}>{name} (Име на профил)</Typography>
    <ProfileTabs /> <AddAccount/>
      </Box>
    </div>
  );
};

export default index;
