import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { markets, userAssets } from "../../../../Components/Static";
import Modal from "../../../../Components/Modal/Modal";
import Deposit from "../../../Funding/Deposit";
import Withdraw from "../../../Funding/Withdraw";

const Overview = () => {
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
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

  const closeDepositModal = () => {
    setDeposit(false);
  };
  const openDepositModal = () => {
    setDeposit(true);
  };
  const closeWithdrawModal = () => {
    setWithdraw(false);
  };
  const openWithdrawModal = () => {
    setWithdraw(true);
  };
  return (
    <div className="exPortoflioOverviewDiv">
      <div className="exPortoflioOverviewDiv_1">
        <div className="exPortoflioOverviewDiv_1_cont1">Welcome</div>
        <div className="exPortoflioOverviewDiv_1_cont2">
          <button
            className="exPortoflioOverviewDiv_1_cont2_btn1"
            onClick={openDepositModal}
          >
            Deposit
          </button>
          <button
            className="exPortoflioOverviewDiv_1_cont2_btn2"
            onClick={openWithdrawModal}
          >
            Withdraw
          </button>
        </div>
      </div>
      <div className="exPortoflioOverviewDiv_2">
        <div className="exPortoflioOverviewDiv_2_div1">
          <div className="exPortoflioOverviewDiv_2_div1_cont1">Account</div>
          <div className="exPortoflioOverviewDiv_2_div1_cont2">$0.00</div>
          <div className="exPortoflioOverviewDiv_2_div1_cont3">$0.00</div>
          <div className="exPortoflioOverviewDiv_2_div1_cont4">
            <div className="exPortoflioOverviewDiv_2_div1_cont4_div1">
              Details
            </div>
            <div className="exPortoflioOverviewDiv_2_div1_cont4_div2">
              <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1">
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div1">
                  Locked Funds
                </div>
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div2">
                  $150.00
                </div>
              </div>
              <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1">
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div1">
                  Funds Available
                </div>
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div2">
                  $850.00
                </div>
              </div>
              <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1">
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div1">
                  Total Funds
                </div>
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div2">
                  $1,000.00
                </div>
              </div>
            </div>
            <div className="exPortoflioOverviewDiv_2_div1_cont4_div3">
              <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1">
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div1">
                  Account Level
                </div>
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div2">
                  level5
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="exPortoflioOverviewDiv_2_div2">
          <div className="exPortoflioOverviewDiv_2_div2_title">
            <div className="exPortoflioOverviewDiv_2_div2_title_div">
              Account
            </div>
          </div>
          <div className="exPortoflioOverviewDiv_2_div2_body">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={130}
                height={10}
                data={data}
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#fff"
                  opacity={0.2}
                />
                <XAxis dataKey="amt" stroke="0" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stroke="#22ad62"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="exPortoflioOverviewDiv_3">
        <div className="ExchangeMarket_div2_title">
          <div className="ExchangeMarket_div2_title_div1">Assets</div>
        </div>
        <div className="exPortoflioOverviewDiv_3_body">
          <div className="exPortoflioOverviewDiv_3_body_head">
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Asset
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Total Balance
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Available Balance
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Locked Balance
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              USD Valuation
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1_last"></div>
          </div>
          <div className="exPortoflioOverviewDiv_3_body_cont">
            {userAssets.map((data) => (
              <div className="exPortoflioOverviewDiv_3_body_cont_div">
                <div className="exPortoflioOverviewDiv_3_body_cont_1">
                  <img
                    src={data.img}
                    alt=""
                    className="exPortoflioOverviewDiv_3_body_cont_1_img"
                  />
                  {data.token}
                </div>
                <div className="exPortoflioOverviewDiv_3_body_cont_1">
                  {data.bal}
                </div>
                <div className="exPortoflioOverviewDiv_3_body_cont_1">
                  {data.bal - data.lockedBal}
                </div>
                <div className="exPortoflioOverviewDiv_3_body_cont_1">
                  {data.lockedBal}
                </div>
                <div className="exPortoflioOverviewDiv_3_body_cont_1">
                  {data.usdVal}
                </div>
                <div className="exPortoflioOverviewDiv_3_body_cont_last">
                  <button
                    className="exPortoflioOverviewDiv_3_body_cont_last_btn1"
                    onClick={openDepositModal}
                  >
                    Deposit
                  </button>
                  <button
                    className="exPortoflioOverviewDiv_3_body_cont_last_btn2"
                    onClick={openWithdrawModal}
                  >
                    Withdraw
                  </button>
                  {data.tag === "erc404" ? (
                    <button className="exPortoflioOverviewDiv_3_body_cont_last_btn3">
                      Redeem
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={deposit} title={"Deposit"} closeModal={closeDepositModal}>
        <Deposit />
      </Modal>
      <Modal
        isOpen={withdraw}
        title={"Withdraw"}
        closeModal={closeWithdrawModal}
      >
        <Withdraw />
      </Modal>
    </div>
  );
};

export default Overview;
