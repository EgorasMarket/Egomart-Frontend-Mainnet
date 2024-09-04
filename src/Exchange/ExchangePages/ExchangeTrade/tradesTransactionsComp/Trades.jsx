import React, { useEffect, useState } from "react";
import "./index.css";
import { userTrades } from "../../../../Components/Static";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";

const Trades = ({ ticker }) => {
  const { address } = useAccount();
  const [allOrders, setOrders] = useState([]);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    const arr = orders.filter(
      (order) =>
        order.address === address &&
        order.ticker === ticker && order?.status === "COMPLETED"
    );
    setOrders(arr);
    //filter the records that is native for just user wallet
    console.log(arr, "trades");
  }, [ticker]);

  return (
    <div className="TradesDiv">
      <div className="TradesDiv_head">
        <div className="TradesDiv_head_cont1">Time</div>
        <div className="TradesDiv_head_cont1">Market/Action</div>
        <div className="TradesDiv_head_cont1">Type</div>
        <div className="TradesDiv_head_cont1">Avg.Price</div>
        <div className="TradesDiv_head_cont1">Amount</div>
        <div className="TradesDiv_head_cont1">Total</div>
        <div className="TradesDiv_head_cont1">Trade Fee</div>
        <div className="TradesDiv_head_cont1_last"></div>
      </div>
      <div className="TradesDiv_body">
        {allOrders.map((data) => {
          return (
            <div className="TradesDiv_body_cont">
              <div className="TradesDiv_body_cont1">
                Aug 1st, 2024 / 10:00 pm
              </div>
              <div className="TradesDiv_body_cont1">
                <img
                  src={data.img}
                  alt=""
                  className="TradesDiv_body_cont1_img"
                />
                <div className="TradesDiv_body_cont1_cont">
                  <div className="TradesDiv_body_cont1_cont_div1">
                    {data.pair}
                  </div>
                  <div className="TradesDiv_body_cont1_cont_div2">
                    <span
                      className={
                        data.action === "buy"
                          ? "TradesDiv_body_cont1_span_type_buy"
                          : "TradesDiv_body_cont1_span_type_sell"
                      }
                    >
                      {" "}
                      {data.action}
                    </span>
                  </div>
                </div>
              </div>
              <div className="TradesDiv_body_cont1"> {data.type}</div>
              <div className="TradesDiv_body_cont1">{data.price}</div>
              <div className="TradesDiv_body_cont1">
                {data.baseAmount}{" "}
                <span className="TradesDiv_body_cont1_span">EGOD</span>
              </div>
              <div className="TradesDiv_body_cont1">
                {data.total}{" "}
                <span className="TradesDiv_body_cont1_span">{data.token}</span>
              </div>
              <div className="TradesDiv_body_cont1">
                {data.tradeFee}{" "}
                <span className="TradesDiv_body_cont1_span">{data.token}</span>
              </div>
              <div className="TradesDiv_body_cont1_last"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trades;
