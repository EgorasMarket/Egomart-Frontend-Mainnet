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
  const sellOrders = orders
    .filter(
      (order) =>
        order.type === "SELL" &&
        order.status === "OPEN" &&
        order.ticker === ticker
    )
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  console.log(sellOrders);
  if (sellOrders.length === 0)
    return {
      price: "0.0000000000000000000000",
    };

  const highestSellOrder = sellOrders.reduce((maxOrder, currentOrder) => {
    return parseFloat(currentOrder.price) < parseFloat(maxOrder.price)
      ? currentOrder
      : maxOrder;
  }, sellOrders[0]);
  if (highestSellOrder === undefined)
    return {
      price: "0.0000000000000000000000",
    };

  return highestSellOrder;
};
export const _lowestBuyOrder = ({ orders = [], ticker }) => {
  const buyOrders = orders.filter(
    (order) =>
      order.type === "BUY" && order.status === "OPEN" && order.ticker === ticker
  );
  if (buyOrders.length === 0)
    return {
      price: 0,
    };
  const lowBuy = buyOrders.reduce((max, order) => {
    return parseFloat(order.price) > parseFloat(max.price) ? order : max;
  });

  if (lowBuy === undefined)
    return {
      price: 0,
    };

  return lowBuy;
};

export const _buyManager = ({ market, ticker, orders }) => {
  if (market === "BUY") {
    return _highestSellOrder({ orders, ticker });
  }
  if (market === "SELL") {
    return _lowestBuyOrder({ orders, ticker });
  }
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
  if (marketType === "BUY") {
    const _sell_arr = orders
      .filter(
        (order) =>
          order.type === "BUY" &&
          order.status === "OPEN" &&
          order.ticker === ticker
      )
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      .map((o) => {
        // console.log(parseUnits(o.price, 18));
        return parseEther(o.price.toString(), "wei").toString();
      });

    if (_sell_arr.length == 0) return [];
    return _sell_arr;
  }
  if (marketType === "SELL") {
    const _sell_arr = orders
      .filter(
        (order) =>
          order.type === "SELL" &&
          order.status === "OPEN" &&
          order.ticker === ticker
      )
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      .map((o) => {
        return parseEther(
          parseFloat(o.price).toFixed(5).toString(),
          "wei"
        ).toString();
      });

    if (_sell_arr.length == 0) return [];
    return _sell_arr;
  }
};
