import React from "react";
import Blockies from "react-blockies";

const ExchangePortfolioSideBar = ({ toggleActiveTab, activeTab }) => {
  const address = "0xa5ff0Fd1a84D004649E97b465779499546654feD";
  return (
    <div className="exPortfolioSideBar">
      <div className="exPortfolioSideBar_div1">
        <Blockies
          seed={"0xa5ff0Fd1a84D004649E97b465779499546654feD"}
          size={8}
          scale={4}
          className="blockies_icon"
        />{" "}
        <div className="exPortfolioSideBar_div1_cont1">
          <div className="exPortfolioSideBar_div1_cont1_title">Account</div>
          <div className="exPortfolioSideBar_div1_cont1_address">
            {`${address.slice(0, 4)}...${address.slice(37, 42)}`}
          </div>
        </div>
      </div>

      <div className="exPortfolioSideBar_div2">
        <div
          id="overview"
          className={
            activeTab === "overview"
              ? "exPortfolioSideBar_div2_cont1_active"
              : "exPortfolioSideBar_div2_cont1"
          }
          onClick={toggleActiveTab}
        >
          Overview
        </div>
        <div
          id="orders"
          className={
            activeTab === "orders"
              ? "exPortfolioSideBar_div2_cont1_active"
              : "exPortfolioSideBar_div2_cont1"
          }
          onClick={toggleActiveTab}
        >
          Open Orders
        </div>
        <div
          id="history"
          className={
            activeTab === "history"
              ? "exPortfolioSideBar_div2_cont1_active"
              : "exPortfolioSideBar_div2_cont1"
          }
          onClick={toggleActiveTab}
        >
          History
        </div>
      </div>
    </div>
  );
};

export default ExchangePortfolioSideBar;
