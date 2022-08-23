import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentAccount } from "../Accounts/accountsSlice";
import TableAccountHistory from "./components/TableAccountHistory";

const AccountDetails = () => {
  const currentAccount = useSelector(selectCurrentAccount);

  const { name } = currentAccount;
  return (
    <>
      <Box p={4}>
        <Typography sx={{ fontSize: 24, color: "#8E8E8E" }}>
          Акаунт: {name}
        </Typography>
        <TableAccountHistory />
      </Box>
    </>
  );
};

export default AccountDetails;
