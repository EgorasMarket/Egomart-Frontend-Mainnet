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
import {
  updateArr,
  updateOne,
  updateOrder,
} from "../features/orders/OrderSlice";
import abi from "../web3/contracts/Egomart.json";
import { formatEther } from "ethers";
import { selectMatchingOrder } from "../features/orders/selectors";
const Exchange = () => {
  const { orders } = useSelector((state) => state.orders);
  useSocket();
  const dispatch = useDispatch();

  // useWatchContractEvent({
  //   address: import.meta.env.VITE_CONTRACT_ADDRESS,
  //   abi,
  //   eventName: "OrderPlaced",
  //   async onLogs(logs) {
  //     console.log("New Order placed!", logs);
  //     //loop through the array of logs

  //     logs.forEach((log) => {
  //       const data = {
  //         id: orders.length + 1,
  //         price: parseFloat(formatEther(log.args.value)).toFixed(30),
  //         indexId: Number(log.args.orderId),
  //         ticker: log.args?.ticker,
  //         type: log.args?.isSale === false ? "BUY" : "SELL",
  //         amount: parseFloat(formatEther(log?.args?.numberOfShares)),
  //         address: log.args?.userAddress,
  //         status: "OPEN", //ENUM OPEN, CANCELLED,COMPLETED,
  //         createdAt: new Date(Number(log.args.time) * 1000),
  //       };
  //       console.log(data, "prepared response");

  //       dispatch(updateOrder(data));
  //     });

  //     //construct payload and dispatch to store

  //     // let payload = {
  //     //   userAddress: data.address,
  //     //   orderType: data.type,
  //     //   amount: data?.price,
  //     //   numberOfShares: data.amount,
  //     //   transHash: logs[0].transactionHash,
  //     //   time: logs[0].args?.time.toString().split("n")[0],
  //     //   ticker: data?.ticker,
  //     //   orderId: data?.indexId,
  //     // };
  //     // console.log(payload, "to be sent to backend");

  //     // after pushing the data to the store,
  //     // post to backend to correlate record
  //     // const res = await INSERT_NEW_ORDER(payload);
  //     // console.log(res, "to backend");
  //   },
  // });
  subscribeToEvent("/orders-event", (err, payload) => {
    console.log(payload, "orders event");
    let arr = [];
    let newP = {};

    payload.forEach((log) => {
      newP = {
        id: orders.length + 1,
        price: parseFloat(log.amount).toFixed(30),
        indexId: log.index_id,
        ticker: log.ticker,
        type: log.orderType,
        amount: log.numberOfShares,
        address: log.userAddress,
        status: log.state,
        createdAt: log.timePlaced,
        transHash: log.transHash,
      };
      arr.push(newP);
      dispatch(updateOrder(newP));
    });
    // console.log(arr, "new form");
    // dispatch(updateArr(newP));
  });

  const fetchTickers = async () => {
    const res = await GET_TICKER_PAIRS();
    if (!res?.success) return;

    //loop through the record

    const array = [];
    let payload = {};

    res.data.forEach((ticker, id) => {
      payload = {
        id: id,
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
          price: parseFloat(formatEther(log.args.value)).toFixed(30),
          amount: parseFloat(formatEther(log?.args?.numberOfShares)),
          orderId: Number(log.args.orderId),
        };

        //find the order in the orders arrary

        let curr_order = orders.find(
          (order) =>
            order.indexId === payload.orderId &&
            order.price === payload.price &&
            order.type === payload.type
        );
        console.log(curr_order);
        if (curr_order) {
          dispatch(updateOne({ id: curr_order.id, curr_order }));
          console.log(payload, curr_order, "to be sent to store ");
        }
        console.log("not sent to store");

        //add the order to the order slice
        // await dispatch(cancelTrade(payload));
        // dispatch(cancelTrade(payload));
      });
    },
  });
  //listen for event
  subscribeToEvent("/trade-event", (err, payload) => {
    console.log(payload, "from event");

    orders.find(
      (trade) =>
        trade.address === payload.address &&
        trade?.orderId === payload.orderId &&
        trade.type === payload.type &&
        trade.price === payload.price
    );
    //when a trade event is received search for it in the orders array

    //when found call the updateOne action from the orderslice and change the data state
  });

  return (
    <div className="ExchangeDiv">
      <ExchangeHeader />
      {/* <div className="ExchangeDiv_body"> */}
      <Outlet />
      {/* </div> */}
      <ExchangeFooter />
    </div>
  );
};

export default Exchange;
