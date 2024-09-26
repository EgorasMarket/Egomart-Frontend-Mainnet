import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { format, getTime, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { DECIMAL_COUNT } from "../../../../../constants/config";
import { numberWithCommas } from "../../../../../assets/js/numberWithCommas";

const MobileTrades = ({ current }) => {
  const dispatch = useDispatch();
  useEffect(() => {}, [current]);
  const { trades } = useSelector((state) => state.trades);

  const fillTrades = async () => {
    const res = await GET_EXCHANGE_TRADES();
    console.log(res, "bbbb");

    if (!res?.returned) return;

    let data = {};
    const arr = [];

    res?.data[0].forEach((order, position) => {
      data = {
        id: trades.length + 1,
        price: order?.value,
        indexId: order.orderId,
        ticker: order?.ticker,
        type: order?.typeOfTrade,
        amount: order?.numberOfShares,
        buyer: order?.buyer,
        seller: order?.seller,
        status: order?.state, //ENUM OPEN, CANCELLED,COMPLETED,
        createdAt: order?.timedAdded,
        transactionHash: order?.transactionHash,
      };
      arr.push(data);
    });

    dispatch(setTrade(arr));
  };
  useEffect(() => {
    fillTrades();
  }, []);
  const filteredTrades = trades
    .filter((t) => t.ticker === current?.ticker)
    .slice(0, 25); // Filter and limit to first 25 trades
  const filledTrades = [
    ...filteredTrades,
    ...Array(25 - filteredTrades.length).fill({
      price: "--",
      amount: "--",
      type: "--",
      createdAt: "--",
    }),
  ]; // Fill remaining spots with placeholders
  return (
    <div className="ProductDetailPage_div_body_div2_body_area_trades">
      <div className="ProductDetailPage_div_body_div2_body_area_trades_head">
        <div className="ProductDetailPage_div_body_div2_body_area_trades_head_cont1">
          Time
        </div>
        <div className="ProductDetailPage_div_body_div2_body_area_trades_head_cont1_2">
          Price
        </div>
        <div className="ProductDetailPage_div_body_div2_body_area_trades_head_cont1_last">
          Amount
        </div>
      </div>

      {/* filter sort map */}
      {filledTrades.map((data, index) => {
        function formatDate(dateString) {
          const date = new Date(dateString);

          return format(date, "MMM do, yyyy / h:mm aaa");
        }

        return (
          <div
            className="ProductDetailPage_div_body_div2_body_area_trades_body"
            key={data?.id || `placeholder-${index}`} // Provide unique key for placeholders
          >
            <div className="ProductDetailPage_div_body_div2_body_area_trades_body_cont1">
              {data.createdAt !== "--"
                ? format(parseISO(data.createdAt), "h:mm:ss aa")
                : "--"}
            </div>
            <div
              className="ProductDetailPage_div_body_div2_body_area_trades_body_cont2"
              style={{
                color:
                  data?.type === "SELL"
                    ? "#ff445d"
                    : data?.type === "BUY"
                    ? "#12b66f"
                    : "#fff",
              }}
            >
              {data?.price !== "--"
                ? numberWithCommas(
                    parseFloat(data?.price).toFixed(DECIMAL_COUNT)
                  )
                : "--"}
            </div>
            <div className="ProductDetailPage_div_body_div2_body_area_trades_body_cont3">
              {data?.amount !== "--"
                ? numberWithCommas(
                    parseFloat(data?.amount).toFixed(DECIMAL_COUNT)
                  )
                : "--"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileTrades;
