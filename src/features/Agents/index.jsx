import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API } from "../../services";
import { setAgents } from "./agentsSlice";
import TableAgents from "./components/TableAgents";

const Agents = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    API.getAllAgents().then(({data})=>{
     dispatch(setAgents(data))
    })
  }, []);

  return (
    <div>
      <Box p={4}>
        <Typography sx={{ fontSize: 24, color: "#8E8E8E" }}>Агенти</Typography>
        
        <TableAgents />
      </Box>
    </div>
  );
};

export default Agents;
