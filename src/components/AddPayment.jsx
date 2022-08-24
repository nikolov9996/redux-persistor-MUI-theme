import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { API } from "../services";
import { useSelector } from "react-redux";
import { selectAgentId } from "../features/authSlice";
import { selectCurrentAccount } from "../features/Accounts/accountsSlice";
import PlusIcon from "@mui/icons-material/Add";

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

export default function AddPayment() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [sum, setSum] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  const agentId = useSelector(selectAgentId);
  const accountId = useSelector(selectCurrentAccount).id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async () => {
    const formattedDate = new Date(date).toISOString();
    await API.addPaymentToAccount(accountId, agentId, formattedDate, sum)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => console.error(e.message))
      .finally(() => {
        handleClose();
        // update row here
      });
  };

  return (
    <div>
      <Button
        sx={{ minWidth: 100 }}
        startIcon={<PlusIcon htmlColor="#FFF" />}
        size="small"
        variant="contained"
        onClick={handleClick}
      >
        Добавяне на плащане
      </Button>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Grid
          sx={{ minHeight: 350 }}
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
              Добавяне на плащане
            </Typography>

            <Divider />
          </Grid>
          <Grid item>
            <Typography fontSize={14}>Сума</Typography>
            <TextField
              size="small"
              type="number"
              value={sum}
              onChange={({ target: { value } }) => setSum(value)}
              sx={{ width: "100%", borderColor: "none" }}
            />
          </Grid>
          <Grid item>
            <Typography fontSize={14}>Дата</Typography>
            <TextField
              lang="bg-BUL"
              size="small"
              type="date"
              value={date}
              onChange={({ target: { value } }) => setDate(value)}
              sx={{ width: "100%", borderColor: "none" }}
            />
          </Grid>
          <Grid sx={{ marginLeft: "auto" }} item>
            <Button
              startIcon={<PlusIcon htmlColor="#FFF" />}
              size="small"
              variant="contained"
              onClick={handleSubmit}
            >
              Добави
            </Button>
          </Grid>
        </Grid>
      </StyledMenu>
    </div>
  );
}
