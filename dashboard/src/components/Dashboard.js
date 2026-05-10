import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import PriceAlerts from "./PriceAlerts";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight:
          "calc(100vh - 64px)",
        background:
          "#f7f7f7",
      }}
    >
      {/* Watchlist Sidebar */}
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <Routes>
          {/* Default Page */}
          <Route
            index
            element={<Summary />}
          />

          {/* Other Pages */}
          <Route
            path="orders"
            element={<Orders />}
          />
          <Route
            path="holdings"
            element={<Holdings />}
          />
          <Route
            path="positions"
            element={<Positions />}
          />
          <Route
            path="funds"
            element={<Funds />}
          />
          <Route
            path="apps"
            element={<Apps />}
          />
          <Route
            path="alerts"
            element={
              <PriceAlerts />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;