import io from "socket.io-client";
import { setConnectionStatus, addMessage } from "./socketSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../core/core";
import { cancelOne, updateOne, updateOrder } from "../orders/OrderSlice";
import { updateTrade } from "../trades/TradeSlice";
import { formatEther } from "ethers";
import { setTickers, updateTicker, updateTickerTwo } from "../PairsSlice";

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

          // Find the order in the orders array
          const curr_order = getState().orders.orders.find(
            (order) => order.uuid === payload.uuid
          );

          if (curr_order) {
            // Calculate the new filled amount
            const sum_filled = (
              parseFloat(curr_order.filled) + parseFloat(payload.amount)
            ).toFixed(30);

            // Update the order status based on filled amount
            const updatedStatus =
              parseFloat(curr_order.amount) - parseFloat(sum_filled) <= 0.00001
                ? "COMPLETED"
                : "OPEN";

            // Create the updated order object
            const updatedOrder = {
              ...curr_order,
              filled: sum_filled,
              status: updatedStatus,
            };

            // Dispatch the updates
            dispatch(updateOne({ id: curr_order.id, newData: updatedOrder }));
            dispatch(updateTrade(payload));

            console.log("Updated and sent to store:", payload, updatedOrder);
          } else {
            console.log("Order not found, not sent to store.");
          }
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

      socket.on("/get-24-stats", (logs) => {
        const ticker = logs.ticker;
        console.log(logs, "24 Stats Event!!!");
        let _open24 = logs?.openPrice;
        let _close24 = logs?.closePrice;
        let _volume24h = logs?.volume;
        let _lowPrice24h = logs?.lowPrice;
        let _high24 = logs?.highPrice;
        let _change24h = ((_close24 - _open24) / _open24) * 100;

        const payload = {
          open24h: _open24,
          close24h: logs.closePrice,
          volume24h: logs.volume,
          lowPrice24h: logs.lowPrice,
          highPrice24h: logs.highPrice,
          change24h: _change24h,
        };

        dispatch(updateTickerTwo({ pair: ticker, data: payload }));

        //look for the ticker
      });

      socket.on("/get-ticker-stats", (logs) => {
        console.log(logs, "new tickers updated stats!!!");
        const ticker = logs.ticker;

        //loop through the pairs

        logs.forEach((log) => {
          log.img = JSON.parse(log.img)[0];
          log.meta = JSON.parse(log.meta);
          log.tickerA = log.tokenA;
          log.tickerB = log.tokenB;
        });
        console.log(logs, "latest");

        dispatch(setTickers(logs));
        // let _open24 = logs?.openPrice;
        // let _close24 = logs?.closePrice;
        // let _volume24h = logs?.volume;
        // let _lowPrice24h = logs?.lowPrice;
        // let _high24 = logs?.highPrice;
        // let _change24h = ((_close24 - _open24) / _open24) * 100;

        // const payload = {
        //   open24h: logs.open24h,
        //   close24h: logs.close24h,
        //   volume24h: logs.volume24h,
        //   lowPrice24h: logs.lowPrice24,
        //   highPrice24h: logs.highPrice24h,
        //   change24h: logs.change24h,
        // };

        // dispatch(updateTickerTwo({ pair: ticker, data: payload }));

        //look for the ticker
      });
    }

    if (action.type === "socket/disconnect") {
      if (socket) socket.disconnect();
    }

    next(action);
  };
};

export default socketMiddleware;
