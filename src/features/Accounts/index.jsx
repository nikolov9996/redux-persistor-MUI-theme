import { Typography, Box } from "@mui/material";
import React from "react";
import TableAccounts from "./components/TableAccounts";

const Accounts = () => {
  return (
    <>
      <Box p={4}>
        <Typography sx={{ fontSize: 24, color: "#8E8E8E" }}>Акаунти</Typography>
      </Box>
      <TableAccounts />
    </>
  );
};

export default Accounts;
