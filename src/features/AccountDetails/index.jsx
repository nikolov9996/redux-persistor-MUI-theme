import { Box, Typography, Grid, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ActionMenu from "../../components/ActionMenu";
import TabsAccount from "../../components/TabsStyled";
import {
  selectAccountDetailsTab,
  selectCurrentAccount,
} from "../Accounts/accountsSlice";
import TableAccountHistory from "./components/TableAccountHistory";
import TableAccountPayments from "./components/TableAccountPayments";
import { ACCOUNT_TABS_KEYS, ROUTES } from "../../app/constants";
import { useNavigate } from "react-router-dom";
import AddPayment from "../../components/AddPayment";

const AccountDetails = () => {
  const currentAccount = useSelector(selectCurrentAccount);
  const currentTab = useSelector(selectAccountDetailsTab);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentAccount.id) {
      navigate(ROUTES.ACCOUNTS);
    }
  }, []);
  const { name, id, active } = currentAccount;
  const getText = () => (active ? "Спри достъп" : "Активирай");

  return (
    <>
      <Box p={4}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid sx={{ display: "flex", alignItems: "center" }} xs={6} item>
            <Typography sx={{ fontSize: 24, color: "#8E8E8E", marginRight: 2 }}>
              Акаунт: {name}
            </Typography>
            <ActionMenu accountId={id} access={active} text={getText()} />
          </Grid>
          <Grid item>
            <Button size="small" variant="contained">
              Издаване на фактура
            </Button>
          </Grid>
        </Grid>

        <Grid mt={3} container direction="row" alignItems="center">
          <Grid item>
            <TabsAccount />
          </Grid>
          <Grid item>
            <AddPayment />
          </Grid>
          <Grid item></Grid>
        </Grid>
        {ACCOUNT_TABS_KEYS.HISTORY === currentTab && <TableAccountHistory />}
        {ACCOUNT_TABS_KEYS.PAYMENTS === currentTab && <TableAccountPayments />}
      </Box>
    </>
  );
};

export default AccountDetails;
