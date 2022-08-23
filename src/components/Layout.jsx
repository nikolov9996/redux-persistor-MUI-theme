import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BurgerIcon from "@mui/icons-material/Menu";
import ProfileIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { authenticate, setAgentId } from "../features/authSlice";
import UserService from "../UserService";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { API } from "../services";
import { ROUTES } from "../app/constants";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const token = UserService.getToken();
  const name = UserService.getUsername();
  const roles = UserService.getRole()?.roles;
  console.log(loading);

  useEffect(() => {
    if (token) {
      API.getUserData()
        .then(({ data }) => {
          console.log(data); // id and agent is different todo
          dispatch(authenticate({ token, name, roles }));
          dispatch(setAgentId(data.agent.id));
        })
        .catch((e) => {
          console.error(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [token, name, roles]);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 6,
        height: "96vh",
        background: "#F5F5F5",
        maxWidth: 1600,
        margin: "auto",
        marginTop: 2,
      }}
    >
      <Grid container display="row">
        <Grid xs={2} item>
          <Grid container direction="column">
            <Grid item sx={{ marginTop: 2, marginLeft: 1 }}>
              <Typography
                sx={{ fontWeight: 700, fontSize: 30, color: "#8E8E8E" }}
              >
                Billing
              </Typography>
            </Grid>
            <Grid item mt={6}>
              <IconButton size="small">
                <BurgerIcon />
                <Link to={ROUTES.AGENTS}>Агенти</Link>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="small">
                <BurgerIcon />
                <Link to={ROUTES.ACCOUNTS}>Акаунти</Link>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="small">
                <ProfileIcon />
                <Link to={ROUTES.PROFILE}>Профил</Link>
              </IconButton>
            </Grid>
            <Grid item mt={2}>
              <IconButton size="small">
                <CloseIcon sx={{ color: "#075CE7" }} />
                <Typography color="#075CE7">Изход</Typography>
              </IconButton>
            </Grid>
          </Grid>
          <Link to="/">Home</Link>
        </Grid>
        <Grid xs={10} item>
          <Paper sx={{ borderRadius: 6, height: "96vh" }}>
            <Box p={2} sx={{ width: "100%" }}>
              <Grid container direction="row">
                <Grid item xs={10}></Grid>

                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    direction: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Typography>{name}</Typography>
                  <Avatar />
                </Grid>
              </Grid>
            </Box>
            <Divider />
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Layout;
