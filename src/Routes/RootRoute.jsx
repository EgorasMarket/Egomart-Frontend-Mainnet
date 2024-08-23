import React from "react";
import { Outlet } from "react-router-dom";
import ExchangeFooter from "../Exchange/ExchangeFooter/ExchangeFooter";
import ExchangeHeader from "../Exchange/ExchangeHeader/ExchangeHeader";
const RootRoute = ({ children }) => {
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
export default RootRoute;
