import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAccount, useWriteContract } from "wagmi";
import { format } from "date-fns";
import { formatEther, parseEther } from "ethers";

const PortfolioOpenOrders = () => {
  const { orders } = useSelector((state) => state.orders);
  const { address } = useAccount();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    let arr = orders.filter(
      (order) => order.address === address && order.status === "OPEN"
    );
    setPositions(arr);
    console.log(arr);
  }, [orders]);

  return (
    <div className="OpenOrders_div">
      <div className="OpenOrders_div_area1">
        <div className="OpenOrders_div_area1_title">Open Orders</div>
        <div className="OpenOrders_div_area1_para">{positions?.length}</div>
      </div>
      <div className="OpenOrders_div_area2">
        <div className="TradesDiv_head">
          <div className="TradesDiv_head_cont1">Time</div>
          <div className="TradesDiv_head_cont1">Market/Action</div>
          <div className="TradesDiv_head_cont1">Type</div>
          <div className="TradesDiv_head_cont1">Avg.Price</div>
          <div className="TradesDiv_head_cont1">Amount</div>
          <div className="TradesDiv_head_cont1">Total</div>
          <div className="TradesDiv_head_cont1">Filled Amount</div>
          <div className="TradesDiv_head_cont1">Unfilled Amount</div>
          <div className="TradesDiv_head_cont1_last"></div>
        </div>
        <div className="TradesDiv_body">
          {positions?.map((data) => {
            function formatDate(dateString) {
              const date = new Date(dateString);

              return format(date, "MMM do, yyyy / h:mm aaa");
            }
            return (
              <div className="TradesDiv_body_cont">
                <div className="TradesDiv_body_cont1">
                  {/* Aug 1st, 2024 / 10:00 pm */}
                  {formatDate(data?.createdAt || new Date())}
                </div>
                <div className="TradesDiv_body_cont1">
                  <div className="TradesDiv_body_cont1_div_flex">
                    {/* <img
                      src={
                        data?.ticker === "EGAX-EGOD"
                          ? "/img/egax_logo.png"
                          : null
                      }
                      alt=""
                      className="TradesDiv_body_cont1_img"
                    /> */}
                    <div className="TradesDiv_body_cont1_cont">
                      <div className="TradesDiv_body_cont1_cont_div1">
                        {data?.ticker}
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
                </div>
                <div className="TradesDiv_body_cont1">LIMIT</div>
                <div className="TradesDiv_body_cont1">
                  <div className="TradesDiv_body_cont1_div_flex">
                    {parseFloat(data.price).toFixed(4)}
                    <span className="TradesDiv_body_cont1_span">EGOD</span>
                  </div>
                </div>
                <div className="TradesDiv_body_cont1">
                  <div className="TradesDiv_body_cont1_div_flex">
                    {parseFloat(data?.amount).toFixed(4)}{" "}
                    <span className="TradesDiv_body_cont1_span">
                      {data.ticker.split("-")[0]}
                    </span>
                  </div>
                </div>
                <div className="TradesDiv_body_cont1">
                  <div className="TradesDiv_body_cont1_div_flex">
                    {parseFloat(
                      parseFloat(data?.amount).toFixed(4) *
                        parseFloat(data.price).toFixed(4)
                    ).toFixed(4)}{" "}
                    <span className="TradesDiv_body_cont1_span">EGOD</span>
                  </div>
                </div>
                <div className="TradesDiv_body_cont1">
                  <div className="TradesDiv_body_cont1_div_flex">
                    {parseFloat(data.filled)}{" "}
                    <span className="TradesDiv_body_cont1_span">
                      {data.ticker.split("-")[0]}
                    </span>
                  </div>

                  {/* <span className="TradesDiv_body_cont1_span">{data.token}</span> */}
                </div>
                <div className="TradesDiv_body_cont1">
                  {/* {parseFloat(data.total - data.filled).toFixed(2)}{" "} */}
                  <div className="TradesDiv_body_cont1_div_flex">
                    {parseFloat(data.amount) - parseFloat(data.filled)}{" "}
                    <span className="TradesDiv_body_cont1_span">
                      {data.ticker.split("-")[0]}
                    </span>
                  </div>
                </div>
                <div className="TradesDiv_body_cont1_last">
                  {/* <button
                    onClick={() => {
                      cancelOrder(data);
                    }}
                    className="TradesDiv_body_cont1_last_btn"
                  >
                    Cancel
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOpenOrders;
