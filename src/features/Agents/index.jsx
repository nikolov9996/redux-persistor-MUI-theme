import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { API } from "../../services";
import UserService from "../../UserService";

const Agents = () => {
  useEffect(() => {
    // API.getAllAccounts(1).then(console.log)
  }, []);
  return (
    <div onClick={() => UserService.doLogout()}>
      <Box p={4}>
        <Typography sx={{ fontSize: 24, color: "#8E8E8E" }}>Агенти</Typography>
      </Box>
      
    </div>
  );
};

export default Agents;
