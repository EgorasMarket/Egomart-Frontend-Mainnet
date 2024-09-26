import React from "react";
import Blockies from "react-blockies";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
const ExchangePortfolioSideBar = ({ toggleActiveTab, activeTab }) => {
  const { address } = useAccount();
  return (
    <div className="exPortfolioSideBar">
      <div className="exPortfolioSideBar_div1">
        <Blockies
          seed={address ? address : "0xXXXX"}
          size={8}
          scale={4}
          className="blockies_icon"
        />{" "}
        <div className="exPortfolioSideBar_div1_cont1">
          <div className="exPortfolioSideBar_div1_cont1_title">Account</div>
          <div className="exPortfolioSideBar_div1_cont1_address">
            {address ? (
              <> {`${address?.slice(0, 4)}...${address?.slice(37, 42)}`}</>
            ) : (
              <>0xXXXX</>
            )}
          </div>
        </div>
      </div>

      <div className="exPortfolioSideBar_div2">
        <Link
          to="/app/portfolio/overview"
          id="overview"
          className={
            activeTab === "overview"
              ? "exPortfolioSideBar_div2_cont1_active"
              : "exPortfolioSideBar_div2_cont1"
          }
          onClick={toggleActiveTab}
        >
          Overview
        </Link>
        <Link
          to="/app/portfolio/openOrder"
          id="orders"
          className={
            activeTab === "orders"
              ? "exPortfolioSideBar_div2_cont1_active"
              : "exPortfolioSideBar_div2_cont1"
          }
          onClick={toggleActiveTab}
        >
          Open Orders
        </Link>
        <Link
          to="/app/portfolio/history"
          id="history"
          className={
            activeTab === "history"
              ? "exPortfolioSideBar_div2_cont1_active"
              : "exPortfolioSideBar_div2_cont1"
          }
          onClick={toggleActiveTab}
        >
          History
        </Link>
      </div>
    </div>
  );
};

export default ExchangePortfolioSideBar;
