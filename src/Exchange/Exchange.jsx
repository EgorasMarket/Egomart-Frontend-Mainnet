import React, { useEffect, useState } from "react";
import "./index.css";
import ExchangeHeader from "./ExchangeHeader/ExchangeHeader";
import ExchangeFooter from "./ExchangeFooter/ExchangeFooter";
import { Outlet } from "react-router-dom";
import {
  FETCH_ALL_LISTED_ASSETS,
  GET_ALL_DEPOSIT_TRANSACTION,
  GET_TICKER_PAIRS,
} from "../services/trade.services";
import { setTickers } from "../features/PairsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useWatchContractEvent, useClient, useAccount } from "wagmi";
import { Web3ModalProvider } from "../constants/Web3ModalProvider";
import {
  cancelOne,
  updateArr,
  updateOne,
  updateOrder,
} from "../features/orders/OrderSlice";
import abi from "../web3/contracts/Egomart.json";
import { formatEther } from "ethers";
import { selectMatchingOrder } from "../features/orders/selectors";
import { updateTrade } from "../features/trades/TradeSlice";
import { addAssets } from "../features/assets/AssetSlice";
const Exchange = () => {
  const { address } = useAccount();
  const { orders } = useSelector((state) => state.orders);
  // useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "socket/connect" });
    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, [dispatch]);

  const fetchPortfolioRecords = async () => {
    const res = await GET_ALL_DEPOSIT_TRANSACTION({ account: address });
    console.log(res, "porfolio response");
  };

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
  /** */

  const fetchTickers = async () => {
    const res = await GET_TICKER_PAIRS();
    console.log("====================================");
    console.log(res, "ressss");

    console.log("====================================");
    if (!res?.success) return;

    dispatch(setTickers(res.data));
  };
  const fetchAssets = async () => {
    const res = await FETCH_ALL_LISTED_ASSETS();
    console.log(res, "assets returned");
    if (!res?.Returned) return;

    dispatch(addAssets(res.Data));
    // await dispatch(setTickers(array));
  };

  useEffect(() => {
    fetchTickers();
    fetchAssets();
  }, []);

  useEffect(() => {
    fetchPortfolioRecords();
  }, [address]);
  // useWatchContractEvent({
  //   address: import.meta.env.VITE_CONTRACT_ADDRESS,
  //   abi,
  //   eventName: "OrderCanceled",
  //   onLogs: async (logs) => {
  //     console.log("Trade Orders Received", logs);

  //     //loop through the logs

  //     logs.forEach(async (log) => {
  //       const payload = {
  //         createdAt: new Date(Number(log.args.time) * 1000),
  //         address: log.args.userAddress,
  //         ticker: log?.args?.ticker,
  //         type: log.args?.isSale === false ? "BUY" : "SELL",
  //         price: parseFloat(formatEther(log.args.value)).toFixed(30),
  //         amount: parseFloat(formatEther(log?.args?.numberOfShares)),
  //         orderId: Number(log.args.orderId),
  //       };

  //       // //find the order in the orders arrary

  //       let curr_order = orders.find(
  //         (order) =>
  //           order.indexId === payload.orderId &&
  //           order.price === payload.price &&
  //           order.type === payload.type
  //       );
  //       console.log(curr_order);
  //       if (curr_order) {
  //         dispatch(cancelOne({ id: curr_order.id, curr_order }));
  //         console.log(payload, curr_order, "to be sent to store ");
  //         return;
  //       }
  //       console.log("not sent to store");
  //     });
  //   },
  // });
  /** wagmi event watcher for trade event */
  // useWatchContractEvent({
  //   address: import.meta.env.VITE_CONTRACT_ADDRESS,
  //   abi,
  //   eventName: "Trade",
  //   onLogs: async (logs) => {
  //     console.log("Trade Orders Received", logs);

  //     //loop through the logs

  //     logs.forEach(async (log) => {
  //       const payload = {
  //         createdAt: new Date(Number(log.args.createdAt) * 1000),
  //         buyer: log.args.buyer,
  //         seller: log.args.seller,
  //         isMarketOrder: log.args.isMarketOrder,
  //         ticker: log.args.ticker,
  //         type: log.args?.typeOfTrade === 0 ? "BUY" : "SELL",
  //         price: parseFloat(formatEther(log.args.value)).toFixed(30),
  //         amount: parseFloat(formatEther(log?.args?.numberOfShares)),
  //         orderId: Number(log.args.orderId),
  //         transactionHash: log.transactionHash,
  //       };

  //       //find the order in the orders arrary

  //       let curr_order = orders.find(
  //         (order) =>
  //           order.indexId === payload.orderId &&
  //           order.price === payload.price &&
  //           order.type === payload.type
  //       );
  //       console.log(curr_order);
  //       if (curr_order) {
  //         dispatch(updateOne({ id: curr_order.id, curr_order }));
  //         //push this payload to the tradeslice

  //         dispatch(updateTrade(payload));
  //         console.log(payload, curr_order, "to be sent to store ");
  //         return;
  //       }
  //       console.log("not sent to store");
  //     });
  //   },
  // });

  /** */

  return (
    <Web3ModalProvider>
      <div className="ExchangeDiv">
        <ExchangeHeader />
        {/* <div className="ExchangeDiv_body"> */}
        <Outlet />
        {/* </div> */}
        <ExchangeFooter />
      </div>
    </Web3ModalProvider>
  );
};

export default Exchange;
