import io from "socket.io-client";
import { setConnectionStatus, addMessage } from "./socketSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../core/core";
import { cancelOne, updateOrder } from "../orders/OrderSlice";
import { updateTrade } from "../trades/TradeSlice";
import { formatEther } from "ethers";

const socketMiddleware = (store) => {
  console.log(store, "all store data");
  let socket;

  return (next) => (action) => {
    const { dispatch, getState } = store;
    if (action.type === "socket/connect") {
      socket = io(BASE_URL);

      socket.on("connect", () => {
        dispatch(setConnectionStatus(true));
        console.log("socket is now  connected", socket);
      });

      socket.on("disconnect", () => {
        dispatch(setConnectionStatus(false));
      });

      socket.on("message", (message) => {
        dispatch(addMessage(message));
      });
      socket.on("/orders-event", (payload) => {
        console.log(payload, "orders event");
        let arr = [];
        let newP = {};

        payload.forEach((log, index) => {
          newP = {
            id: getState().orders.orders.length + 1,
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
      });
      // socket.on("/trade-event", (logs) => {
      //   console.log(logs, "latest Trade HIT!!!");
      //   let arr = [];
      //   let newP = {};

      //   logs.forEach(async (log) => {
      //     const payload = {
      //       id: getState().trades.trades.length + 1,
      //       price: parseFloat(log.value).toFixed(30),
      //       indexId: log.orderId,
      //       ticker: log.ticker,
      //       type: log.typeOfTrade,
      //       amount: parseFloat(log.numberOfShares).toFixed(30),
      //       buyer: log.buyer,
      //       seller: log.seller,
      //       createdAt: log.timeAdded,
      //       transactionHash: log.transactionHash,
      //     };
      //     //find the order in the orders arrary
      //     console.log(getState().orders.orders, "see orders .....");

      //     let curr_order = getState().orders.orders.find(
      //       (order) =>
      //         order.indexId === payload.orderId &&
      //         order.price === parseFloat(payload.value).toFixed(30) &&
      //         order.type === payload.typeOfTrade
      //     );
      //     console.log(curr_order, "check record");
      //     if (curr_order) {
      //       dispatch(updateOne({ id: curr_order.id, curr_order }));
      //       //push this payload to the tradeslice

      //       dispatch(updateTrade(payload));
      //       console.log(payload, curr_order, "to be sent to store ");
      //       return;
      //     }
      //     console.log("not sent to store");
      //   });
      // });
      socket.on("/cancel-order-event", (logs) => {
        console.log(logs, "Cancel Event triggered!!!");
        let arr = [];
        let newP = {};

        logs.forEach(async (log) => {
          const payload = {
            createdAt: new Date(Number(log.args.time) * 1000),
            address: log.args.userAddress,
            ticker: log?.args?.ticker,
            type: log.args?.isSale === false ? "BUY" : "SELL",
            price: parseFloat(formatEther(log.args.value)).toFixed(30),
            amount: parseFloat(formatEther(log?.args?.numberOfShares)),
            orderId: Number(log.args.orderId),
          };

          // //find the order in the orders arrary

          let curr_order = orders.find(
            (order) =>
              order.indexId === payload.orderId &&
              order.price === parseFloat(payload.valuee).toFixed(30) &&
              order.type === payload.type
          );
          console.log(curr_order);
          if (curr_order) {
            dispatch(cancelOne({ id: curr_order.id, curr_order }));
            console.log(payload, curr_order, "to be sent to store ");
            return;
          }
          console.log("not sent to store");
        });
      });
    }

    if (action.type === "socket/disconnect") {
      if (socket) socket.disconnect();
    }

    next(action);
  };
};

export default socketMiddleware;
