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
import {
  cancelTrade,
  changeTradeState,
  setTrade,
  updateTrade,
} from "../features/trades/TradeSlice";
import { formatEther } from "ethers";
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
    eventName: "OrderCanceled",
    onLogs: async (logs) => {
      console.log(" Order Cancellation triggered", logs);

      //prepare payload
      const payload = {
        address: logs[0]?.args?.userAddress,
        orderId: formatEther(logs[0]?.args?.orderId),
        type: logs[0].args.isSale === false ? "BUY" : "SELL",
        price: parseFloat(formatEther(logs[0].args.value)),
        amount: parseFloat(formatEther(logs[0]?.args?.numberOfShares)),
      };
      dispatch(cancelTrade(payload));
      //find the order and use it to dispatch an update
    },
  });

  useWatchContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    eventName: "Trade",
    onLogs: async (logs) => {
      console.log("Trade Orders Received", logs);

      const payload = {
        createdAt: new Date(),
        address:
          logs[0].args.typeOfTrade === 0
            ? logs[0].args.seller
            : logs[0].address,
        ticker: logs[0].args.ticker,
        type: logs[0].args?.typeOfTrade === 0 ? "BUY" : "SELL",
        price: parseFloat(formatEther(logs[0].args.value)),
        amount: parseFloat(formatEther(logs[0]?.args?.numberOfShares)),
        orderId: formatEther(logs[0].args.orderId),
      };

      //add the order to the order slice
      dispatch(updateTrade(payload));
      dispatch(changeTradeState(payload));
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
