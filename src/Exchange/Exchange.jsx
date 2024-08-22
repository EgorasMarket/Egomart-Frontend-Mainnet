import React from "react";
import "./index.css";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeFooter from "./ExchangeFooter/ExchangeFooter";
import ExchangeTrade from "./ExchangePages/ExchangeTrade/ExchangeTrade";

const Exchange = () => {
  return (
    <div className="ExchangeDiv">
      <ExchangeHeader />
      <div className="ExchangeDiv_body">
        <ExchangeTrade />
      </div>
      <ExchangeFooter />
    </div>
  );
};

export default Exchange;
