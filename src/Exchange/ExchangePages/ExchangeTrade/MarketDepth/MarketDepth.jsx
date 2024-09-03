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
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

  const sortedBuyOffers = buyOffers.sort(
    (a, b) => parseInt(b.amount) - parseInt(a.amount)
  );

  console.log(sortedBuyOffers);

  const sortedSellOffers = sellOffers.sort(
    (a, b) => parseInt(a.amount) - parseInt(b.amount)
  );

  console.log(sortedSellOffers);

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
              <Tooltip />
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
              <Tooltip />
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
