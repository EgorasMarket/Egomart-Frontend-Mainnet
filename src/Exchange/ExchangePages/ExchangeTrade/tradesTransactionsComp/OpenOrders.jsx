import React, { useEffect, useState } from "react";
import "./index.css";
import { userOpenOrders } from "../../../../Components/Static";
import { useSelector } from "react-redux";
import { useAccount, useWriteContract } from "wagmi";
import { format } from "date-fns";
import contractAbi from "../../../../web3/contracts/Egomart.json";
import { formatEther, parseEther } from "ethers";
const OpenOrders = ({ ticker }) => {
  const {
    data: cancelledOrder,
    writeContract,
    isPending: loading,
    isError,
    isSuccess,
    error,
  } = useWriteContract();
  const { address } = useAccount();

  const { orders } = useSelector((state) => state.orders);

  const [positions, setPositions] = useState([]);
  useEffect(() => {
    const arr = orders.filter(
      (order) =>
        order.address === address &&
        order.status === "OPEN" &&
        order.ticker === ticker
    );
    setPositions(arr);
  }, [ticker]);

  useEffect(() => {
    if (loading === false && error) {
      console.log(error, "error from cancellation");
    }
  }, [loading, error, isError]);

  const cancelOrder = (data) => {
    // console.log(data, "order info");
    try {
      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "cancelOrder",
        args: [
          parseEther(data.indexId),
          data.ticker,
          parseEther(data?.price).toString(),
          data.type === "BUY" ? 0 : 1,
          //
        ],
      });
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div className="TradesDiv">
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
        {positions.map((data) => {
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
                <img
                  src={data?.img}
                  alt=""
                  className="TradesDiv_body_cont1_img"
                />
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
              <div className="TradesDiv_body_cont1">LIMIT</div>
              <div className="TradesDiv_body_cont1">
                {parseFloat(data.price).toFixed(2)}
              </div>
              <div className="TradesDiv_body_cont1">
                {parseFloat(data?.amount).toFixed(2)}{" "}
                <span className="TradesDiv_body_cont1_span">EGOD</span>
              </div>
              <div className="TradesDiv_body_cont1">
                {data.total}{" "}
                <span className="TradesDiv_body_cont1_span">{data.token}</span>
              </div>
              <div className="TradesDiv_body_cont1">
                {data.filled}{" "}
                <span className="TradesDiv_body_cont1_span">{data.token}</span>
              </div>
              <div className="TradesDiv_body_cont1">
                {parseFloat(data.total - data.filled).toFixed(2)}{" "}
                <span className="TradesDiv_body_cont1_span">{data.token}</span>
              </div>
              <div className="TradesDiv_body_cont1_last">
                <button
                  onClick={() => {
                    cancelOrder(data);
                  }}
                  className="TradesDiv_body_cont1_last_btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpenOrders;
