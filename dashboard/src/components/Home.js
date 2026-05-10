import React from "react";
import { useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Profile from "./Profile";

const Home = () => {
  const location =
    useLocation();

  return (
    <>
      <TopBar />

      {location.pathname ===
      "/profile" ? (
        <Profile />
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default Home;