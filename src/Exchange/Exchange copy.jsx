import React, { useEffect } from "react";
import "./index.css";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeFooter from "./ExchangeFooter/ExchangeFooter";
import { Outlet } from "react-router-dom";
import { GET_TICKER_PAIRS } from "../services/trade.services";
import { setTickers } from "../features/PairsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useWatchContractEvent } from "wagmi";

import abi from "../web3/contracts/Egomart.json";
import {
  cancelTrade,
  changeTradeState,
  setTrade,
  updateTrade,
} from "../features/trades/TradeSlice";
import { formatEther } from "ethers";
import { updateOrder } from "../features/orders/OrderSlice";
const Exchange = () => {
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

  // listen for successful trade events
  useWatchContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    eventName: "OrderCanceled",
    onLogs: async (logs) => {
      console.log(" Order Cancel triggered", logs);

      //prepare payload
      const payload = {
        address: logs[0]?.args?.userAddress,
        orderId: parseInt(formatEther(logs[0]?.args?.orderId)),
        type: logs[0].args.isSale === false ? "BUY" : "SELL",
        price: parseFloat(formatEther(logs[0].args.value)),
        amount: parseFloat(formatEther(logs[0]?.args?.numberOfShares)),
      };
      console.log("payload to be sent to cancellation", payload);
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

      //loop through the logs

      logs.forEach(async (log) => {
        const payload = {
          createdAt: new Date(Number(log.args.createdAt) * 1000),
          buyer: log.args.buyer,
          seller: log.args.seller,
          isMarketOrder: log.args.isMarketOrder,
          ticker: log.args.ticker,
          type: log.args?.typeOfTrade === 0 ? "BUY" : "SELL",
          price: parseFloat(formatEther(log.args.value)).toFixed(2),
          amount: parseFloat(formatEther(log?.args?.numberOfShares)),
          orderId: Number(log.args.orderId),
        };

        console.log(payload, "to be sent to store ");

        //add the order to the order slice
        await dispatch(cancelTrade(payload));
        // dispatch(cancelTrade(payload));
      });
    },
  });

  useWatchContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    eventName: "Deposit",
    onLogs(logs) {
      console.log("New Deposit!", logs);
    },
  });

  useWatchContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    eventName: "OrderPlaced",
    async onLogs(logs) {
      console.log("New Order placed!", logs);

      //loop through the array of logs

      logs.forEach((log) => {
        const data = {
          id: orders.length + 1,
          price: parseFloat(formatEther(log.args.value)),
          indexId: Number(log.args.orderId),
          ticker: log.args?.ticker,
          type: log.args?.isSale === false ? "BUY" : "SELL",
          amount: parseFloat(formatEther(log?.args?.numberOfShares)),
          address: log.args?.userAddress,
          status: "OPEN", //ENUM OPEN, CANCELLED,COMPLETED,
          createdAt: new Date(Number(log.args.time) * 1000),
        };
        console.log(data, "prepared response");

        dispatch(updateOrder(data));
      });

      //construct payload and dispatch to store

      // let payload = {
      //   userAddress: data.address,
      //   orderType: data.type,
      //   amount: data?.price,
      //   numberOfShares: data.amount,
      //   transHash: logs[0].transactionHash,
      //   time: logs[0].args?.time.toString().split("n")[0],
      //   ticker: data?.ticker,
      //   orderId: data?.indexId,
      // };
      // console.log(payload, "to be sent to backend");

      // after pushing the data to the store,
      // post to backend to correlate record
      // const res = await INSERT_NEW_ORDER(payload);
      // console.log(res, "to backend");
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
