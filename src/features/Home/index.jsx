import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/constants";
import UserService from "../../UserService";

const Home = () => {
  const navigate = useNavigate();

  const roles = UserService.getRole().roles;

  useEffect(() => {
    if (roles.includes("admin")) {
      navigate(ROUTES.AGENTS);
    } else {
      navigate(ROUTES.ACCOUNTS);
    }
  }, []);
  return <div></div>;
};

export default Home;
