import React from "react";
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

import { sellOffers, buyOffers } from "../../../../Components/Static";

const MarketDepth = () => {
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
            {payload[0].payload.price}
          </p>
          <p className="intro">
            {" "}
            <span className="intro_span">Total Amount:</span>
            {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  };
  const CustomTooltip2 = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
      // console.log(payload, label, active);
      return (
        <div className="custom-tooltip">
          <p className="label">
            {" "}
            <span className="label_span2">Buying Price:</span>
            {payload[0].payload.price}
          </p>
          <p className="intro">
            {" "}
            <span className="intro_span">Total Amount:</span>
            {payload[0].value}
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
