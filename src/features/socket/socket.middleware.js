import io from "socket.io-client";
import { setConnectionStatus, addMessage } from "./socketSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../core/core";
import { updateOrder } from "../orders/OrderSlice";

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
      socket.on("/trade-event", (payload) => {
        console.log(payload, "latest Trade HIT!!!");
        let arr = [];
        let newP = {};

        // payload.forEach((log, index) => {
        //   newP = {
        //     id: getState().orders.orders.length + 1,
        //     price: parseFloat(log.amount).toFixed(30),
        //     indexId: log.index_id,
        //     ticker: log.ticker,
        //     type: log.orderType,
        //     amount: log.numberOfShares,
        //     address: log.userAddress,
        //     status: log.state,
        //     createdAt: log.timePlaced,
        //     transHash: log.transHash,
        //   };
        //   arr.push(newP);
        //   dispatch(updateOrder(newP));
        // });
      });
    }

    if (action.type === "socket/disconnect") {
      if (socket) socket.disconnect();
    }

    next(action);
  };
};

export default socketMiddleware;
