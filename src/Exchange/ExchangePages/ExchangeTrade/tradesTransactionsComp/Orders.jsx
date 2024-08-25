import React, { useEffect, useState } from "react";
import "./index.css";
import { userOrders } from "../../../../Components/Static";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { format } from "date-fns";

const Orders = ({ ticker }) => {
  const { address } = useAccount();
  const [allOrders, setOrders] = useState([]);

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    const arr = orders.filter(
      (order) => order.address === address && order.ticker === ticker
    );
    setOrders(arr);

    //filter the records that is native for just user wallet
    console.log(arr, "orders is here");
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
        <div className="TradesDiv_head_cont1_last">Status</div>
      </div>
      <div className="TradesDiv_body">
        {allOrders.map((data) => {
          function formatDate(dateString) {
            const date = new Date(dateString);
            return format(date, "MMM do, yyyy / h:mm aaa");
          }
          return (
            <div className="TradesDiv_body_cont">
              <div className="TradesDiv_body_cont1">
                {formatDate(data?.createdAt || new Date())}
              </div>
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
                        data.type === "BUY"
                          ? "TradesDiv_body_cont1_span_type_buy"
                          : "TradesDiv_body_cont1_span_type_sell"
                      }
                    >
                      {data.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="TradesDiv_body_cont1">LIMIT</div>
              <div className="TradesDiv_body_cont1">
                {parseFloat(data.price).toFixed(2)}
              </div>
              <div className="TradesDiv_body_cont1">
                {parseFloat(data.amount).toFixed(2)}{" "}
                <span className="TradesDiv_body_cont1_span">EGOD</span>
              </div>
              <div className="TradesDiv_body_cont1">
                {data.total}{" "}
                <span className="TradesDiv_body_cont1_span">{data.token}</span>
              </div>

              <div className="TradesDiv_body_cont1_last">
                <button className="TradesDiv_body_cont1_last_btn_status">
                  {data.status}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
