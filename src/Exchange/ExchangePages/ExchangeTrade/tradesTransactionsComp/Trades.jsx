import React, { useEffect, useState } from "react";
import "./index.css";
import { userTrades } from "../../../../Components/Static";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";

const Trades = ({ ticker }) => {
  const { address } = useAccount();
  const [allOrders, setOrders] = useState([]);
  const { orders } = useSelector((state) => state.orders);
  const { trades } = useSelector((state) => state.trades);

  useEffect(() => {
    const arr = trades.filter(
      (order) =>
        order.buyer === address ||
        (order.seller === address && order.ticker === ticker)
    );
    setOrders(arr);
    //filter the records that is native for just user wallet
  }, [ticker]);

  return (
    <div className="TradesDiv">
      <div className="TradesDiv_head">
        <div className="TradesDiv_head_cont1">Time</div>
        <div className="TradesDiv_head_cont1">Market/Action</div>
        {/* <div className="TradesDiv_head_cont1">Type</div> */}
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
              <div className="TradesDiv_body_cont1">{data.createdAt}</div>
              <div className="TradesDiv_body_cont1">
                <img
                  src={data.img}
                  alt=""
                  className="TradesDiv_body_cont1_img"
                />
                <div className="TradesDiv_body_cont1_cont">
                  <div className="TradesDiv_body_cont1_cont_div1">
                    {data.ticker}
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
                      {data.buyer === address ? "BUY" : "SELL"}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="TradesDiv_body_cont1"> {data.type}</div> */}
              <div className="TradesDiv_body_cont1">
                {parseFloat(data.price)}
              </div>
              <div className="TradesDiv_body_cont1">
                {parseFloat(data.amount)}{" "}
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
