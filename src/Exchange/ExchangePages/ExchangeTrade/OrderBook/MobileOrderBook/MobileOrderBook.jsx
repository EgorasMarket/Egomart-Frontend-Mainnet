import React, { useEffect, useRef, useState } from "react";
import { ArrowUp02Icon, ArrowDown02Icon } from "hugeicons-react";
import "./index.css";
import { format, getTime, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addOrders } from "../../../../../features/orders/OrderSlice";
import { setTrade } from "../../../../../features/trades/TradeSlice";
import {
  GET_EXCHANGE_EVENT,
  GET_USER_TRADE_ORDERS,
} from "../../../../../services/trade.services";
import { DECIMAL_COUNT } from "../../../../../constants/config";
import { numberWithCommas } from "../../../../../assets/js/numberWithCommas";

const MobileOrderBook = ({ current }) => {
  const dispatch = useDispatch();
  useEffect(() => {}, [current]);
  const { orders } = useSelector((state) => state.orders);
  const fillorder = async () => {
    // dispatch(addOrders([]));

    const res = await GET_EXCHANGE_EVENT();
    console.log("see here...", res);
    if (!res?.success) {
      dispatch(addOrders([]));

      return;
    }

    let data = {};
    const arr = [];
    let count = 0;
    if (res?.data.length === 0) {
      dispatch(addOrders([]));
      return;
    }
    res?.data.forEach((order, position) => {
      data = {
        id: position + 1,
        price: order?.amount,
        indexId: order.index_id,
        ticker: order?.ticker,
        type: order?.orderType,
        uuid: order?.uniqueOrderID,
        amount: order?.numberOfShares,
        address: order?.userAddress,
        status: order?.state, //ENUM OPEN, CANCELLED,COMPLETED,
        createdAt: order?.createdAt,
        filled: order?.filled,
      };
      arr.push(data);
    });
    console.log(res, "order from backend");
    dispatch(addOrders(arr));
  };

  useEffect(() => {
    fillorder();
  }, []);

  const groupedByPrice = orders
    .filter(
      (order) =>
        order.type === "BUY" &&
        order.status === "OPEN" &&
        order?.ticker === current?.ticker
    )
    .reduce((acc, item) => {
      const price = item.price;
      if (!acc[price]) {
        acc[price] = { ...item, amount: 0 };
      }
      acc[price].amount += parseFloat(item.amount);
      return acc;
    }, {});
  const groupedSellPrice = orders
    .filter(
      (order) =>
        order.type === "SELL" &&
        order.status === "OPEN" &&
        order?.ticker === current?.ticker
    )
    .reduce((acc, item) => {
      const price = item.price;
      if (!acc[price]) {
        acc[price] = { ...item, amount: 0 };
      }
      acc[price].amount += parseFloat(item.amount);
      return acc;
    }, {});

  const groupedBuyOffersArr = Object.values(groupedByPrice);
  const groupedSellOffersArr = Object.values(groupedSellPrice);

  const sortedGroupedBuyOffersArr = groupedBuyOffersArr
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    .filter((f) => f?.status === "OPEN");

  const sortedGroupedSellOffersArr = groupedSellOffersArr
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    .filter((f) => f?.status === "OPEN");

  const maxAmount = Math.max(
    ...sortedGroupedBuyOffersArr.map((offer) => parseInt(offer.amount))
  );
  // Calculate the maximum amount
  const maxSellAmount = Math.max(
    ...sortedGroupedSellOffersArr.map((offer) => parseInt(offer.amount))
  );

  const buyOffers = sortedGroupedBuyOffersArr.slice(0, 25); // Get the first 25 buy offers
  const filledBuyOffers = [
    ...buyOffers,
    ...Array(25 - buyOffers.length).fill({ amount: "--", price: "--" }),
  ]; // Fill remaining spots with placeholders

  const sellOffers = sortedGroupedSellOffersArr.slice(0, 25);
  const filledSellOffers = [
    ...sellOffers,
    ...Array(25 - sellOffers.length).fill({ amount: "--", price: "--" }),
  ]; // Fill remaining spots with placeholders
  return (
    <div className="ProductDetailPage_div_body_div2_body_area">
      <div className="ProductDetailPage_div_body_div2_body_area_1">
        <div className="ProductDetailPage_div_body_div2_body_area_1_title">
          Buy
        </div>
        <div className="ProductDetailPage_div_body_div2_body_area_1_body">
          {filledBuyOffers.map((data, index) => {
            const widthPercentage =
              data.amount !== "--"
                ? (parseInt(data?.amount) / maxAmount) * 100
                : 0;

            return (
              <div
                className="walletSelectModalDiv_body_amount_display"
                id={data.id || `placeholder-${index}`} // Provide unique key for placeholders
                key={data.id || `placeholder-${index}`}
              >
                <div className="walletSelectModalDiv_body_amount_display_cont1">
                  {data.amount !== "--"
                    ? numberWithCommas(
                        parseFloat(data?.amount).toFixed(DECIMAL_COUNT)
                      )
                    : "--"}
                </div>
                <div
                  className="walletSelectModalDiv_body_amount_display_cont1"
                  style={{ color: "#16b979", marginRight: "1em" }}
                >
                  {data.price !== "--"
                    ? numberWithCommas(
                        parseFloat(data?.price).toFixed(DECIMAL_COUNT)
                      )
                    : "--"}
                </div>
                <div
                  style={{ width: `${widthPercentage}%` }}
                  className="amount_bg_stat"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ProductDetailPage_div_body_div2_body_area_2">
        <div className="ProductDetailPage_div_body_div2_body_area_1_title">
          Sell
        </div>
        <div className="ProductDetailPage_div_body_div2_body_area_1_body">
          {filledSellOffers.map((data, index) => {
            const widthPercentage =
              data.amount !== "--"
                ? (parseInt(data?.amount) / maxSellAmount) * 100
                : 0;

            return (
              <div
                className="walletSelectModalDiv_body_amount_display"
                id={data.id || `placeholder-${index}`} // Provide unique key for placeholders
                key={data.id || `placeholder-${index}`}
              >
                <div
                  className="walletSelectModalDiv_body_amount_display_cont1"
                  style={{ color: "#ff445d", marginLeft: "1em" }}
                >
                  {data.price !== "--"
                    ? numberWithCommas(
                        parseFloat(data?.price).toFixed(DECIMAL_COUNT)
                      )
                    : "--"}
                </div>
                <div className="walletSelectModalDiv_body_amount_display_cont1">
                  {data.amount !== "--"
                    ? numberWithCommas(
                        parseFloat(data?.amount).toFixed(DECIMAL_COUNT)
                      )
                    : "--"}
                </div>
                <div
                  style={{ width: `${widthPercentage}%` }}
                  className="amount_bg_stat_Sell"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileOrderBook;
