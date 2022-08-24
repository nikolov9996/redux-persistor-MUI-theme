import { Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../services";
import { selectAgentId } from "../authSlice";
import { setAccounts } from "./accountsSlice";
import TableAccounts from "./components/TableAccounts";

const Accounts = () => {
  const dispatch = useDispatch();
  const agentId = useSelector(selectAgentId);

  useEffect(() => {
    API.getAccountsById(agentId) // todo from where this ID?
      .then((resp) => {
        dispatch(setAccounts(resp));
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

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
