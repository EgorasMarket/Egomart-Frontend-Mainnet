import React, { useState, useEffect } from "react";
import "./index.css";
import {
  AnalyticsUpIcon,
  GiftIcon,
  Wallet02Icon,
  Home06Icon,
  CoinsSwapIcon,
} from "hugeicons-react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [activeBg, setActiveBg] = useState("home");
  const changeActiveBg = (e) => {
    setActiveBg(e.currentTarget.id);
  };
  return (
    <div className="MobileNav">
      <div className="MobileNav_area">
        <Link
          to="/app/market"
          className={
            activeBg === "home" ? "MobileNav_area_1_active" : "MobileNav_area_1"
          }
          onClick={changeActiveBg}
          id="home"
        >
          {" "}
          <Home06Icon />
          Markets
        </Link>
        <Link
          to="/app/trade/spot/ETRI-EGOD"
          className={
            activeBg === "spot" ? "MobileNav_area_1_active" : "MobileNav_area_1"
          }
          onClick={changeActiveBg}
          id="spot"
        >
          <AnalyticsUpIcon />
          Spot
        </Link>
        <Link
          to="/app/earn"
          className={
            activeBg === "earn" ? "MobileNav_area_1_active" : "MobileNav_area_1"
          }
          onClick={changeActiveBg}
          id="earn"
        >
          <GiftIcon />
          Earn
        </Link>
        <Link
          to="/app/bond"
          className={
            activeBg === "bond" ? "MobileNav_area_1_active" : "MobileNav_area_1"
          }
          onClick={changeActiveBg}
          id="bond"
        >
          <CoinsSwapIcon />
          Bond
        </Link>
        <Link
          to="/app/portfolio/overview"
          className={
            activeBg === "asset"
              ? "MobileNav_area_1_active"
              : "MobileNav_area_1"
          }
          onClick={changeActiveBg}
          id="asset"
        >
          <Wallet02Icon />
          Assets
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
