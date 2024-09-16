import { ethers, parseEther, parseUnits } from "ethers";

export const _priceChangeStyling = ({ pair }) => {
  //destructure thr pair

  if (parseFloat(pair?.open24h) > parseFloat(pair?.close24h)) {
    return "#ff445d";
  }

  if (parseFloat(pair?.open24h) < parseFloat(pair?.close24h)) {
    return " #12b66f";
  }
  return "#fff";
};

export const _symbolChecker = ({ pair }) => {
  if (parseFloat(pair?.open24h) > parseFloat(pair?.close24h)) {
    return "";
  }

  if (parseFloat(pair?.open24h) < parseFloat(pair?.close24h)) {
    return "+";
  }
  return "";
};

export const _highestSellOrder = ({ orders = [], ticker }) => {
  const sellOrders = orders.filter(
    (order) =>
      order.type === "SELL" &&
      order.status === "OPEN" &&
      order.ticker === ticker
  );
  if (sellOrders.length === 0)
    return {
      price: 0,
    };
  const highestSellOrder = sellOrders.reduce((maxOrder, currentOrder) => {
    return parseFloat(currentOrder.price) < parseFloat(maxOrder.price)
      ? currentOrder
      : maxOrder;
  }, sellOrders[0]);
  if (highestSellOrder === undefined)
    return {
      price: 0,
    };

  return highestSellOrder;
};
export const _highestBuyOrder = ({ orders = [], ticker }) => {
  const buyOrders = orders.filter(
    (order) =>
      order.type === "BUY" && order.status === "OPEN" && order.ticker === ticker
  );
  const highestBuyOrder = buyOrders.reduce((maxOrder, currentOrder) => {
    return parseFloat(currentOrder.price) < parseFloat(maxOrder.price)
      ? currentOrder
      : maxOrder;
  }, buyOrders[0]);
  if (highestBuyOrder === undefined) return 0;

  return highestBuyOrder;
};
export const _all_prices = ({ orders = [], ticker, marketType }) => {
  // newArr.sort((a, b) => {
  //   return new Date(b?.createdAt) - new Date(a?.createdAt);
  // });
  const _sell_arr = orders
    .filter(
      (order) =>
        order.type === marketType &&
        order.status === "OPEN" &&
        order.ticker === ticker
    )
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    .map((o) => {
      console.log(parseUnits(o.price, 18));
      return parseEther(o.price.toString(), "wei").toString();
    });

  if (_sell_arr.length == 0) return [];

  return _sell_arr;
};
