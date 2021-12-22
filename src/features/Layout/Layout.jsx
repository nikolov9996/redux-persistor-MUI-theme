import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../API/locationService";
import { selectLocation, setLocation } from "./layoutSlice";
import { Container } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const currentLocation = useSelector(selectLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentLocation) {
      fetchLocation();
    }
    // eslint-disable-next-line
  }, []);

  async function fetchLocation() {
    try {
      const location = await getLocation();
      dispatch(setLocation(location));
    } catch (error) {
      console.log(error);
      dispatch(setLocation(null));
    }
  }

  return (
    <Container className={classes.root} maxWidth="sm">
      {children}
    </Container>
  );
};

export default Layout;
