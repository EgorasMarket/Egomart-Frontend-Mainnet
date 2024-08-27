import React, { useEffect } from "react";
import "./index.css";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeFooter from "./ExchangeFooter/ExchangeFooter";
import { Outlet } from "react-router-dom";
import { GET_TICKER_PAIRS } from "../services/trade.services";
import { setTickers } from "../features/PairsSlice";
import { useDispatch } from "react-redux";
import { useWatchContractEvent } from "wagmi";

import abi from "../web3/contracts/Egomart.json";
const Exchange = () => {
  const dispatch = useDispatch();
  const fetchTickers = async () => {
    const res = await GET_TICKER_PAIRS();
    if (!res?.success) return;

    //loop through the record

    const array = [];
    let payload = {};

    res.data.forEach((ticker) => {
      payload = {
        id: ticker.id,
        img: ticker?.img,
        pair: ticker.ticker,
        OpenPrice: parseFloat(ticker.initialPrice).toFixed(2),
        tickerA: ticker.tokenA,
        tickerB: ticker.tokenB,
        tickerBName: ticker.tokenBName,
        tokenName: ticker.tokenAName,
        change24h: 0,
        open24h: 1000,
        volume24h: 10,

        // "{"website": "https://egochain.org",

        meta: JSON.parse(ticker?.meta),
      };
      array.push(payload);
    });

    await dispatch(setTickers(array));
  };

  //listen for successful trade events
  useWatchContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    eventName: "Trade",
    onLogs: async (logs) => {
      console.log("Trade Orders Received", logs);
    },
  });

  useEffect(() => {
    fetchTickers();
  }, []);
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
