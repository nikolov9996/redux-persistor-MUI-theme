import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLocation } from "../Layout/layoutSlice";
import { getCurrent } from "../../API/weather/weatherAPI";
import { Typography } from "@material-ui/core";

const CurrentWeather = () => {
  const currentLocation = useSelector(selectLocation);
  const [test, setTest] = useState({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  async function fetchData() {
    const weather = await getCurrent(currentLocation);
    setTest(weather);
  }

  return (
    <div>
      {JSON.stringify(currentLocation, undefined, 19)}
      <Typography>{JSON.stringify(test, undefined, 2)}</Typography>
    </div>
  );
};

export default CurrentWeather;
