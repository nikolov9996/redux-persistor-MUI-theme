import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../UserService";
import { authenticate } from "../authSlice";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  try {
    useEffect(() => {
      setTimeout(() => {
        const token = UserService.getToken();
        const name = UserService.getUsername();
        const { roles } = UserService.getRole();
        const decoded = jwt_decode(token);
        console.log(decoded)
        dispatch(authenticate({ token, name, roles }));
        navigate("/agents");
      }, 1000);
      // eslint-disable-next-line
    }, []);
    return <div>Home</div>;
  } catch (error) {
    return <div>Something went wrong</div>;
  }
};

export default Home;
