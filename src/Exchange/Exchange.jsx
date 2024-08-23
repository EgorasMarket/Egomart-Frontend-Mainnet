import React from "react";
import "./index.css";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeFooter from "./ExchangeFooter/ExchangeFooter";
import ExchangeTrade from "./ExchangePages/ExchangeTrade/ExchangeTrade";
import { Outlet } from "react-router-dom";
import Web3ModalProvider from "../constants/Web3ModalProvider";

const Exchange = () => {
  return (
    <Web3ModalProvider>
      <div className="ExchangeDiv">
        <ExchangeHeader />
        <div className="ExchangeDiv_body">
          <Outlet />
        </div>
        <ExchangeFooter />
      </div>
    </Web3ModalProvider>
  );
};

export default Exchange;
