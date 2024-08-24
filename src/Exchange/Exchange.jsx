import React from "react";
import "./index.css";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeFooter from "./ExchangeFooter/ExchangeFooter";
import { Outlet } from "react-router-dom";

const Exchange = () => {
  return (
    <div className="ExchangeDiv">
      <ExchangeHeader />
      <div className="ExchangeDiv_body">
        <Outlet />
      </div>
      <ExchangeFooter />
    </div>
  );
};

export default Exchange;
