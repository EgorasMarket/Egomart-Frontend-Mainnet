import React, { useEffect, useState } from "react";
import "./index.css";
import { userTrades } from "../../../../Components/Static";
import { useAccount } from "wagmi";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Trades = ({ ticker, ticker_img }) => {
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
  console.log("====================================");
  console.log(allOrders);
  console.log("====================================");
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
          function formatDate(dateString) {
            const date = new Date(dateString);
            return format(date, "MMM do, yyyy / h:mm aaa");
          }
          const tradeFee = data.amount * 0.001;
          return (
            <div className="TradesDiv_body_cont">
              <div className="TradesDiv_body_cont1">
                {" "}
                {formatDate(data?.createdAt || new Date())}
              </div>
              <div className="TradesDiv_body_cont1">
                <img
                  src={ticker_img}
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
                        data.type === "BUY"
                          ? "TradesDiv_body_cont1_span_type_buy"
                          : "TradesDiv_body_cont1_span_type_sell"
                      }
                    >
                      {" "}
                      {data.type}
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
                <span className="TradesDiv_body_cont1_span">
                  {data.ticker.split("-")[0]}
                </span>
              </div>
              <div className="TradesDiv_body_cont1">
                {parseFloat(
                  parseFloat(data.price) * parseFloat(data.amount)
                ).toFixed(2)}{" "}
                <span className="TradesDiv_body_cont1_span">EGOD</span>
              </div>
              <div className="TradesDiv_body_cont1">
                {tradeFee}{" "}
                <span className="TradesDiv_body_cont1_span">
                  {" "}
                  {data.ticker.split("-")[0]}
                </span>
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
