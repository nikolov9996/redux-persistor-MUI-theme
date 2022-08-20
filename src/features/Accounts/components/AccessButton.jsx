import React from "react";
import { Button } from "@mui/material";

const AccessButton = ({ text, onClick }) => {
  return (
    <Button
      sx={{ minWidth: 100 }}
      size="small"
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default AccessButton;
