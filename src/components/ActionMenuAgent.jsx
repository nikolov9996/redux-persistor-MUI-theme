import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { API } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { selectAgentId } from "../features/authSlice";
import { updateAccountAccess } from "../features/Accounts/accountsSlice";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 480,
    minHeight: 250,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ActionMenuAgent({ text, access, agentId }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [comment, setComment] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    await API.changeAgentActiveStatus(agentId, !access, comment)
      .then((resp) => {
        // dispatch(updateAccountAccess({ id: accountId, active: !access }));
        console.log(resp);
      })
      .catch((e) => console.error(e.message))
      .finally(() => {
        handleClose();
      });
  };

  return (
    <div>
      <Button
        sx={{ minWidth: 100 }}
        size="small"
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        {text}
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Grid
          sx={{ minHeight: 250 }}
          p={2}
          container
          direction="column"
          justifyContent="space-around"
        >
          <Grid item>
            <Typography
              color="primary"
              sx={{ pb: 2, borderBottom: "2px solid" }}
            >
              {access ? "Спри достъп" : "Активирай профил"}
            </Typography>
            <Divider />
          </Grid>
          <Grid item>
            <Typography>Описание</Typography>
            <TextField
              value={comment}
              onChange={({ target: { value } }) => setComment(value)}
              sx={{ width: "100%", borderColor: "none" }}
            />
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit} size="small" variant="contained">
              {access ? "Спри" : "Активирай"}
            </Button>
          </Grid>
        </Grid>
      </StyledMenu>
    </div>
  );
}
