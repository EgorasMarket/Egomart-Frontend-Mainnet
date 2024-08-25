import React, { useState } from "react";
import ExchangePortfolioSideBar from "./ExchangePortfolioSideBar";

import "./index.css";
import { Outlet } from "react-router-dom";

const ExchangePortfolio = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const toggleActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
  return (
    <div className="PortfolioDiv">
      <div className="PortfolioDiv_1">
        <ExchangePortfolioSideBar
          toggleActiveTab={toggleActiveTab}
          activeTab={activeTab}
        />
      </div>
      <div className="PortfolioDiv_2">
        <Outlet />
      </div>
    </div>
  );
};

export default ExchangePortfolio;
