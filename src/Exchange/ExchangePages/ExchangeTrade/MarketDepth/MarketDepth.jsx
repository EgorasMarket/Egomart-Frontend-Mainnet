import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { sellOffers, buyOffers } from "../../../../Components/Static";
import { addOrders } from "../../../../features/orders/OrderSlice";
import { GET_EXCHANGE_EVENT } from "../../../../services/trade.services";

const MarketDepth = ({ current }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {}, [current]);

  const fillorder = async () => {
    // dispatch(addOrders([]));

    const res = await GET_EXCHANGE_EVENT();
    console.log("see here...", res);
    if (!res?.success) {
      dispatch(addOrders([]));

      return;
    }

    let data = {};
    const arr = [];
    let count = 0;
    if (res?.data.length === 0) {
      dispatch(addOrders([]));
      return;
    }
    res?.data.forEach((order, position) => {
      data = {
        id: position + 1,
        price: order?.amount,
        indexId: order.index_id,
        ticker: order?.ticker,
        type: order?.orderType,
        uuid: order?.uniqueOrderID,
        amount: order?.numberOfShares,
        address: order?.userAddress,
        status: order?.state, //ENUM OPEN, CANCELLED,COMPLETED,
        createdAt: order?.createdAt,
        filled: order?.filled,
      };
      arr.push(data);
    });
    console.log(res, "order from backend");
    dispatch(addOrders(arr));
  };

  useEffect(() => {
    fillorder();
  }, []);
  const groupedByPrice = orders
    .filter(
      (order) =>
        order.type === "BUY" &&
        order.status === "OPEN" &&
        order?.ticker === current?.pair
    )
    .reduce((acc, item) => {
      const price = item.price;
      if (!acc[price]) {
        acc[price] = { ...item, amount: 0 };
      }
      acc[price].amount += parseFloat(item.amount);
      return acc;
    }, {});
  const groupedSellPrice = orders
    .filter(
      (order) =>
        order.type === "SELL" &&
        order.status === "OPEN" &&
        order?.ticker === current?.pair
    )
    .reduce((acc, item) => {
      const price = item.price;
      if (!acc[price]) {
        acc[price] = { ...item, amount: 0 };
      }
      acc[price].amount += parseFloat(item.amount);
      return acc;
    }, {});

  const groupedBuyOffersArr = Object.values(groupedByPrice);
  const groupedSellOffersArr = Object.values(groupedSellPrice);

  const sortedGroupedBuyOffersArr = groupedBuyOffersArr
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    .filter((f) => f?.status === "OPEN");

  const sortedGroupedSellOffersArr = groupedSellOffersArr
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    .filter((f) => f?.status === "OPEN");

  const buyOffers = sortedGroupedBuyOffersArr;
  const sellOffers = sortedGroupedSellOffersArr;

  const sortedBuyOffers = buyOffers.sort(
    (a, b) => parseInt(b.amount) - parseInt(a.amount)
  );

  // console.log(sortedBuyOffers);

  const sortedSellOffers = sellOffers.sort(
    (a, b) => parseInt(a.amount) - parseInt(b.amount)
  );

  // console.log(sortedSellOffers);
  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
      // console.log(payload, label, active);
      return (
        <div className="custom-tooltip">
          <p className="label">
            {" "}
            <span className="label_span">Selling Price:</span>
            {parseFloat(payload[0].payload.price)}
          </p>
          <p className="intro">
            {" "}
            <span className="intro_span">Total Amount:</span>
            {parseFloat(payload[0].value)}
          </p>
        </div>
      );
    }

    return null;
  };

  console.log("====================================");
  console.log(buyOffers);
  console.log("====================================");
  const CustomTooltip2 = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
      // console.log(payload, label, active);
      return (
        <div className="custom-tooltip">
          <p className="label">
            {" "}
            <span className="label_span2">Buying Price:</span>
            {parseFloat(payload[0].payload.price)}
          </p>
          <p className="intro">
            {" "}
            <span className="intro_span">Total Amount:</span>
            {parseFloat(payload[0].value)}
          </p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="marketDepthDiv">
      <div className="marketDepthDiv_area">
        <div className="marketDepthDiv_depth1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={130}
              height={10}
              data={sortedBuyOffers}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="1%" stopColor="#51cb89" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#51cb89" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* <CartesianGrid strokeDasharray="3 3" stroke="#fff" opacity={0.2} /> */}
              {/* <XAxis dataKey="price" stroke="0" /> */}
              <Tooltip content={<CustomTooltip2 />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#22ad62"
                fillOpacity={1}
                fill="url(#colorUv)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="marketDepthDiv_depth1_mobile">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={130}
              height={10}
              data={sortedBuyOffers}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="1%" stopColor="#51cb89" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#51cb89" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* <CartesianGrid strokeDasharray="3 3" stroke="#fff" opacity={0.2} /> */}
              {/* <XAxis dataKey="price" stroke="0" /> */}
              {/* <Tooltip content={<CustomTooltip2 />} /> */}
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#22ad62"
                fillOpacity={1}
                fill="url(#colorUv)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="marketDepthDiv_depth2_mobile">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={130}
              height={10}
              data={sortedSellOffers}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="1%" stopColor="#de394f" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#de394f" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* <CartesianGrid strokeDasharray="3 3" stroke="#fff" opacity={0.2} /> */}
              {/* <XAxis dataKey="price" stroke="0" /> */}
              {/* <Tooltip content={<CustomTooltip />} /> */}
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#ff535b"
                fillOpacity={1}
                fill="url(#colorUv2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="marketDepthDiv_depth2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={130}
              height={10}
              data={sortedSellOffers}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="1%" stopColor="#de394f" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#de394f" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* <CartesianGrid strokeDasharray="3 3" stroke="#fff" opacity={0.2} /> */}
              {/* <XAxis dataKey="price" stroke="0" /> */}
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#ff535b"
                fillOpacity={1}
                fill="url(#colorUv2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketDepth;
