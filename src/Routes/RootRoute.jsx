import React from "react";
import { Outlet } from "react-router-dom";
import ExchangeFooter from "../Exchange/ExchangeFooter/ExchangeFooter";
import ExchangeHeader from "../Exchange/ExchangeHeader/ExchangeHeader";
import Web3ModalProvider from "../constants/Web3ModalProvider";
const RootRoute = ({ children }) => {
  return (
    <div className="ExchangeDiv">
      <Web3ModalProvider>
        <div className="ExchangeDiv_body">
          <Outlet />
        </div>
      </Web3ModalProvider>
    </div>
  );
};
export default RootRoute;
