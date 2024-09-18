import io from "socket.io-client";
import { setConnectionStatus, addMessage } from "./socketSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../core/core";
import { cancelOne, updateOne, updateOrder } from "../orders/OrderSlice";
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
            uuid: log.uniqueOrderID,
            ticker: log.ticker,
            type: log.orderType,
            amount: log.numberOfShares,
            address: log.userAddress,
            status: log.state,
            createdAt: log.timePlaced,
            transHash: log.transHash,
            filled: 0.0,
          };
          arr.push(newP);
          dispatch(updateOrder(newP));
        });
      });
      socket.on("/trade-event", (logs) => {
        console.log(logs, "latest Trade HIT!!!");

        logs.forEach(async (log) => {
          const payload = {
            id: getState().trades.trades.length + 1,
            price: parseFloat(log.value).toFixed(30),
            indexId: log.orderId,
            ticker: log.ticker,
            type: log.typeOfTrade,
            amount: parseFloat(log.numberOfShares).toFixed(5),

            uuid: log.uniqueOrderID,
            buyer: log.buyer,
            seller: log.seller,
            createdAt: log.timedAdded,
            transactionHash: log.transactionHash,
          };
          //find the order in the orders arrary

          let curr_order = getState().orders.orders.find(
            (order) => order.uuid === payload.uuid
          );

          console.log(curr_order, "check record");
          if (curr_order) {
            //check if the filled is equal to the amount
            let action = "OPEN";
            let _sum_filled = parseFloat(
              parseFloat(curr_order.filled) + payload.amount
            ).toFixed(30);
            //check if it's equal to the object amount
            let _formatted = {
              ...curr_order,
              filled: _sum_filled,
              status: _sum_filled >= curr_order.amount ? "COMPLETED" : "OPEN",
            };

            dispatch(updateOne({ id: curr_order.id, newData: _formatted }));
            //push this payload to the tradeslice

            dispatch(updateTrade(payload));
            console.log(payload, curr_order, "to be sent to store ");
            return;
          }

          console.log("not sent to store");
        });
      });

      socket.on("/cancel-order-event", (logs) => {
        console.log(logs, "Cancel Event triggered!!!");
        let arr = [];
        let newP = {};

        logs.forEach(async (log) => {
          const payload = {
            createdAt: log.time,
            address: log.userAddress,
            ticker: log?.ticker,
            type: log.orderType,
            price: parseFloat(log.value).toFixed(30),
            amount: parseFloat(log?.numberOfShares),
            orderId: Number(log.orderId),
            transHash: log.transHash,
            uniqueOrderID: log.uniqueOrderID,
          };

          // //find the order in the orders arrary

          let curr_order = getState().orders.orders.find(
            (order) => order.uuid === payload.uniqueOrderID
          );
          console.log(curr_order);
          if (curr_order) {
            dispatch(cancelOne({ id: curr_order.id, curr_order }));
            console.log(payload, curr_order, "to be  ");
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
