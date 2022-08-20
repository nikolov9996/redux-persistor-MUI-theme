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
import { useSelector } from "react-redux";
import { authenticate, selectUser } from "../features/authSlice";
import UserService from "../UserService";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const token = UserService.getToken();
  const name = UserService.getUsername();
  const roles = UserService.getRole()?.roles;

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      dispatch(authenticate({ token, name, roles }));
      setLoading(false);
    }
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
                <Link to="/agents">Агенти</Link>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="small">
                <BurgerIcon />
                <Link to="/accounts">Акаунти</Link>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton size="small">
                <ProfileIcon />
                <Link to="/profile">Профил</Link>
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
