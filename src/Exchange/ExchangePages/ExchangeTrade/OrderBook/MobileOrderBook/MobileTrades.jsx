import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { DECIMAL_COUNT } from "../../../../../constants/config";

const MobileTrades = ({ current }) => {
  const dispatch = useDispatch();
  useEffect(() => {}, [current]);
  const { trades } = useSelector((state) => state.trades);

  const fillTrade = async () => {
    const arr = [
      {
        createdAt: "2024-07-15T12:00:00Z",
        address: "0x690B4cBEF361ccD9F2f4eAf0a47BE649b9910b7d",
        ticker: "EGAX-EGOD",
        type: "BUY",
        price: 1915.3,
        amount: 0.5,
      },
    ];

    // dispatch(setTrade([]));
  };
  useEffect(() => {
    fillTrade();
  }, []);

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
      {trades
        .filter((t) => t.ticker === current?.pair)
        .map((data) => {
          return (
            <div className="ProductDetailPage_div_body_div2_body_area_trades_body">
              <div className="ProductDetailPage_div_body_div2_body_area_trades_body_cont1">
                {/* {format(parseISO(data?.createdAt), "h:mm:ssaa")} */}
              </div>
              <div
                className="ProductDetailPage_div_body_div2_body_area_trades_body_cont2"
                style={{
                  color: data?.type === "SELL" ? "#ff445d" : "#12b66f",
                }}
              >
                {parseFloat(data?.price).toFixed(DECIMAL_COUNT)}
              </div>

              <div className="ProductDetailPage_div_body_div2_body_area_trades_body_cont3">
                {parseFloat(data?.amount).toFixed(DECIMAL_COUNT)}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MobileTrades;
