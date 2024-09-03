import React, { useEffect, useState } from "react";
import "./index.css";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeFooter from "./ExchangeFooter/ExchangeFooter";
import { Outlet } from "react-router-dom";
import { GET_TICKER_PAIRS } from "../services/trade.services";
import { setTickers } from "../features/PairsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useWatchContractEvent, useClient } from "wagmi";
import useSocket from "../hooks/useSocket";
import { subscribeToEvent } from "../services/socket";
import { updateOrder } from "../features/orders/OrderSlice";

const Exchange = () => {
  useSocket();

  const { orders } = useSelector((state) => state.orders);
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

  useEffect(() => {
    fetchTickers();
  }, []);

  //listen for event
  subscribeToEvent("/trade-event", (err, payload) => {
    console.log(payload, "from event");
  });

  subscribeToEvent("/orders-event", (err, payload) => {
    console.log(payload, "orders event");
    // let newP = {};
    // payload.forEach((log) => {
    //   newP = {
    //     id: orders.length + 1,
    //     price: log.amount,
    //     indexId: log.index_id,
    //     ticker: log.ticker,
    //     type: log.orderType,
    //     amount: log.numberOfShares,
    //     address: log.userAddress,
    //     status: log.state,
    //     createdAt: log.timePlaced,
    //     transHash: log.transHash,
    //   };
    //   dispatch(updateOrder(newP));
    // });
  });

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
