import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useWriteContract } from "wagmi";
import contractAbi from "../../../../web3/contracts/Egomart.json";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

const OrdersModel = ({ data, ticker_img, ticker }) => {
  const [activeSelection, setActiveSelection] = useState({});

  const {
    data: cancelledOrder,
    writeContract,
    isPending: loading,
    isError,
    isSuccess,
    error,
  } = useWriteContract();

  useEffect(() => {
    if (loading === false && error) {
      console.log(error.shortMessage, "error from cancellation");

      toast.error(error.shortMessage);
      // dispatch(cancelOne({ id: activeSelection.id, activeSelection }));
    }
  }, [loading, error, isError]);
  useEffect(() => {
    if (cancelledOrder) {
      toast.success("Order cancelled successfully!!!");
      console.log("order was successful");
    }
  }, [cancelledOrder]);
  function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, "MMM do, yyyy / h:mm aaa");
  }

  const cancelOrder = (data) => {
    console.log(activeSelection, "active selection");
    try {
      console.log(
        data.ticker.toString(),
        "ticker",
        // parseEther(parseFloat(data?.price.toString())).toString(),
        parseFloat(data?.price) * 1000000000000000000,
        "amount",
        data.type === "BUY" ? 0 : 1,
        "markettype",
        data.customId,
        "custom id"
      );

      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "cancelOrder",
        args: [
          data.ticker.toString(),
          parseFloat(data?.price) * 1000000000000000000,

          // parseEther(parseFloat(data?.price.toString()).toString()),
          data.type === "BUY" ? 0 : 1,
          data.customId,
        ],
      });
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div>
      <div className="TradesDiv_body_cont">
        <div className="TradesDiv_body_cont1">
          {/* Aug 1st, 2024 / 10:00 pm */}
          {formatDate(data?.createdAt || new Date())}
        </div>
        <div className="TradesDiv_body_cont1">
          <img src={ticker_img} alt="" className="TradesDiv_body_cont1_img" />
          <div className="TradesDiv_body_cont1_cont">
            <div className="TradesDiv_body_cont1_cont_div1">{data?.ticker}</div>
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
          <div className="TradesDiv_body_cont1_div_flex">
            {parseFloat(data.price).toFixed(4)}
            <span className="TradesDiv_body_cont1_span">EGOD</span>
          </div>
        </div>
        <div className="TradesDiv_body_cont1">
          <div className="TradesDiv_body_cont1_div_flex">
            {parseFloat(data?.amount).toFixed(4)}{" "}
            <span className="TradesDiv_body_cont1_span">
              {ticker.split("-")[0]}
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
              {ticker.split("-")[0]}
            </span>
          </div>

          {/* <span className="TradesDiv_body_cont1_span">{data.token}</span> */}
        </div>
        <div className="TradesDiv_body_cont1">
          {/* {parseFloat(data.total - data.filled).toFixed(2)}{" "} */}
          <div className="TradesDiv_body_cont1_div_flex">
            {parseFloat(data.amount) - parseFloat(data.filled)}{" "}
            <span className="TradesDiv_body_cont1_span">
              {ticker.split("-")[0]}
            </span>
          </div>
        </div>
        <div className="TradesDiv_body_cont1_last">
          <button
            onClick={() => {
              setActiveSelection(data);
              cancelOrder(data);
            }}
            className="TradesDiv_body_cont1_last_btn"
          >
            {loading ? <ClipLoader color="#fff" size={18} /> : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersModel;
