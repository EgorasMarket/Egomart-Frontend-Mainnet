import { ethers, parseEther, parseUnits } from "ethers";
import { v4 as uuid } from "uuid";

export const _priceChangeStyling = ({ pair }) => {
  //destructure thr pair

  if (parseFloat(pair?.open24h) > parseFloat(pair?.close24h)) {
    return "#ff445d";
  }

  if (parseFloat(pair?.open24h) < parseFloat(pair?.close24h)) {
    return "#12b66f";
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
  if (sellOrders.length === 0)
    return {
      price: null,
    };

  const highestSellOrder = sellOrders.reduce((maxOrder, currentOrder) => {
    return parseFloat(currentOrder.price) < parseFloat(maxOrder.price)
      ? currentOrder
      : maxOrder;
  }, sellOrders[0]);
  if (highestSellOrder === undefined)
    return {
      price: null,
    };

  return highestSellOrder;
};
export const _lowestBuyOrder = ({ orders = [], ticker }) => {
  const buyOrders = orders.filter(
    (order) =>
      order.type === "BUY" && order.status === "OPEN" && order.ticker === ticker
  );
  if (buyOrders.length === 0) {
    return {
      price: null,
    };
  }
  const lowBuy = buyOrders.reduce((max, order) => {
    return parseFloat(order.price) > parseFloat(max.price) ? order : max;
  });

  if (lowBuy === undefined)
    return {
      price: null,
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
export const _all_prices = ({
  orders = [],
  ticker,
  marketType,
  targetAmount = 0,
}) => {
  let accumulatedAmount = 0.0;
  const resultArr = [];

  if (marketType === "BUY") {
    const sortedArray = orders
      .filter(
        (order) =>
          order.type === "BUY" &&
          order.status === "OPEN" &&
          order.ticker === ticker
      )
      .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    for (const order of sortedArray) {
      if (accumulatedAmount >= targetAmount) break;

      resultArr.push(order);
      accumulatedAmount += parseFloat(order?.amount);
    }

    if (resultArr.length == 0) return [];

    return resultArr.map((data) => {
      return data?.price * 1000000000000000000;
    });
  }
  if (marketType === "SELL") {
    // alert("somomo");

    const sortedArray = orders
      .filter(
        (order) =>
          order.type === "SELL" &&
          order.status === "OPEN" &&
          order.ticker === ticker
      )
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    for (const order of sortedArray) {
      if (accumulatedAmount >= targetAmount) break;

      resultArr.push(order);
      accumulatedAmount += order?.amount;
    }

    if (resultArr.length == 0) return [];

    return resultArr.map((data) => {
      return parseEther(data?.price, "wei");
      // return data?.price * 1000000000000000000;
    });
  }
};
export const _all_amount = ({
  orders = [],
  ticker,
  marketType,
  targetAmount = 0,
}) => {
  let accumulatedAmount = 0.0;
  const resultArr = [];

  if (marketType === "BUY") {
    const sortedArray = orders
      .filter(
        (order) =>
          order.type === "BUY" &&
          order.status === "OPEN" &&
          order.ticker === ticker
      )
      .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    for (const order of sortedArray) {
      if (accumulatedAmount >= targetAmount) break;

      resultArr.push(order);
      accumulatedAmount += parseFloat(order?.amount);
    }

    if (resultArr.length == 0) return [];

    return resultArr.map((data) => {
      return data?.price * 1000000000000000000;
    });
  }
  if (marketType === "SELL") {
    let newOrder = orders
      .filter(
        (data) =>
          data.ticker === ticker &&
          data.status === "OPEN" &&
          data.type === "SELL"
      )
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    let budget = targetAmount; // EGOD
    let totalShares = 0; // To track how many shares you can afford

    // newOrder.forEach((order) => {
    for (const order of newOrder) {
      const pricePerShare =
        parseFloat(order.price) *
        (parseFloat(order.amount) - parseFloat(order?.filled));

      const remainingShares =
        parseFloat(order.amount) - parseFloat(order.filled);

      if (budget === 0) {
        break;
      }
      if (budget >= pricePerShare) {
        // Buy all remaining shares in this order
        totalShares += remainingShares;
        budget -= pricePerShare;
      } else {
        // Buy as many shares as budget allows
        const affordableShares = budget / parseFloat(order.price);
        totalShares += affordableShares;
        budget = 0; // Budget is exhausted
      }
    }

    console.log(totalShares, "lokoko");
    return parseEther(parseFloat(totalShares).toFixed(4), "wei");
  }
};
export const _all_prices2 = ({
  orders = [],
  ticker,
  marketType,
  targetAmount = 0,
  threshold = 0,
}) => {
  let accumulatedAmount = 0.0;
  const resultArr = [];

  if (marketType === "BUY") {
    const sortedArray = orders
      .filter(
        (order) =>
          order.type === "BUY" &&
          order.status === "OPEN" &&
          order.ticker === ticker &&
          parseFloat(order.price) >= threshold
        // &&
        // order.price >= threshold
      )
      .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    for (const order of sortedArray) {
      if (accumulatedAmount >= targetAmount) break;

      resultArr.push(order);
      accumulatedAmount += parseFloat(order?.amount);
    }

    if (resultArr.length == 0) return [];

    return resultArr.map((data) => {
      return data?.price * 1000000000000000000;
    });
  }
  if (marketType === "SELL") {
    // alert("somomo");

    const sortedArray = orders
      .filter(
        (order) =>
          order.type === "SELL" &&
          order.status === "OPEN" &&
          order.ticker === ticker &&
          parseFloat(order.price) <= threshold
      )
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    for (const order of sortedArray) {
      if (accumulatedAmount >= targetAmount) break;

      resultArr.push(order);
      accumulatedAmount += order?.amount;
    }

    if (resultArr.length == 0) return [];

    return resultArr.map((data) => {
      return data?.price * 1000000000000000000;
    });
  }
};

export const uuidFromUuidV4 = () => {
  const newUuid = uuid();

  return newUuid;
};

// export const _all_prices = ({ orders = [], ticker, marketType }) => {
//   if (marketType === "BUY") {
//     const _sell_arr = orders
//       .filter(
//         (order) =>
//           order.type === "BUY" &&
//           order.status === "OPEN" &&
//           order.ticker === ticker
//       )
//       .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
//       .map((o) => {
//         // return parseEther(
//         //   parseFloat(o.price).toFixed(3).toString(),
//         //   "wei"
//         // ).toString();

//         return o.price * 1000000000000000000;
//       });

//     if (_sell_arr.length == 0) return [];
//     return _sell_arr;
//   }
//   if (marketType === "SELL") {
//     const _sell_arr = orders
//       .filter(
//         (order) =>
//           order.type === "SELL" &&
//           order.status === "OPEN" &&
//           order.ticker === ticker
//       )
//       .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

//       .map((o) => {
//         // return parseEther(
//         //   parseFloat(o.price).toFixed(5).toString(),
//         //   "wei"
//         // ).toString();
//         return o.price * 1000000000000000000;
//       });

//     if (_sell_arr.length == 0) return [];
//     return _sell_arr;
//   }
// };
