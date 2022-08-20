import React from "react";
import { styled } from "@mui/material/styles";

const Statuses = ({ type, text }) => {
  if (type) {
    // true
    return <StatusActive>{text}</StatusActive>;
  }
  return <StatusInactive>{text}</StatusInactive>;
};

const StatusInactive = styled("div")(`
  display: inline-block;
  height: 20px;
  background-color: #F9E4E4;
  border: 1px solid #BF6565;
  padding: 3px 8px;
  border-radius: 4px;
  color: #AA1A1A;
  font-weight: 700;
`);

const StatusActive = styled("div")(`
  display: inline-block;
  height: 20px;
  background-color: #E4F9EA;
  border: 1px solid #65BF80;
  padding: 3px 8px;
  border-radius: 4px;
  color: #1AAA45;
  font-weight: 700;
`);

export default Statuses;
