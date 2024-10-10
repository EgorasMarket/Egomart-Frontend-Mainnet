import React, { useEffect, useRef, useState } from "react";
import { ArrowUp02Icon, ArrowDown02Icon } from "hugeicons-react";
import "./index.css";
import { format, getTime, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addOrders } from "../../../../../features/orders/OrderSlice";
import {
  GET_EXCHANGE_EVENT,
  GET_EXCHANGE_TRADES,
  GET_USER_TRADE_ORDERS,
} from "../../../../../services/trade.services";
import { DECIMAL_COUNT } from "../../../../../constants/config";
import { setTrade } from "../../../../../features/trades/TradeSlice";
import { _priceChangeStyling } from "../../../../../helpers/helper";
import { numberWithCommas } from "../../../../../assets/js/numberWithCommas";
import { useAccount } from "wagmi";
import DotIndicator from "../../../../../Components/DotIndicator";

const DesktopOrderBook = ({ current, onPriceUpdate }) => {
  const { address } = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {}, [current]);

  const { orders } = useSelector((state) => state.orders);
  const { trades } = useSelector((state) => state.trades);

  const [showOrders, setShowOrders] = useState("All");
  const [activeTab, setActiveTab] = useState("book");
  const toggleBuyOrders = (e) => {
    setShowOrders(e.currentTarget.id);
  };

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

  const fillTrades = async () => {
    const res = await GET_EXCHANGE_TRADES();
    console.log(res, "bbbb");

    if (!res?.returned) return;

    let data = {};
    const arr = [];

    res?.data[0].forEach((order, position) => {
      data = {
        id: order?.id,
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
    fillorder();
    fillTrades();
  }, []);
  const filteredTrades = trades.filter((t) => t.ticker === current?.ticker);
  const filledTrades =
    filteredTrades.length < 25
      ? [
          ...filteredTrades,
          ...Array(25 - filteredTrades.length).fill({
            price: "--",
            amount: "--",
            type: "--",
            createdAt: "--",
          }),
        ]
      : filteredTrades; // No changes if length is 25 or more
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

  const sellOffers = sortedGroupedSellOffersArr;

  // Check if the length is less than 25
  const filledSellOffers =
    sellOffers.length < 25
      ? [
          ...sellOffers,
          ...Array(25 - sellOffers.length).fill({ price: "--", amount: "--" }),
        ]
      : sellOffers; // No changes if length is 25 or more
  const buyOffers = sortedGroupedBuyOffersArr;

  // Check if the length is less than 25
  const filledBuyOffers =
    buyOffers.length < 25
      ? [
          ...buyOffers,
          ...Array(25 - buyOffers.length).fill({ price: "--", amount: "--" }),
        ]
      : buyOffers; // No changes if length is 25 or more

  console.log(buyOffers);

  return (
    <>
      <div className="ExchangeTrade_div2_cont1_header">
        <div className="ExchangeTrade_div2_cont1_header_contb">
          <div
            className={
              activeTab === "book"
                ? "ExchangeTrade_div2_cont1_header_cont1b"
                : "ExchangeTrade_div2_cont1_header_cont2b"
            }
            onClick={() => {
              setActiveTab("book");
            }}
          >
            Book
          </div>
          <div
            className={
              activeTab === "trade"
                ? "ExchangeTrade_div2_cont1_header_cont1b"
                : "ExchangeTrade_div2_cont1_header_cont2b"
            }
            onClick={() => {
              setActiveTab("trade");
            }}
          >
            Trades
          </div>
        </div>
      </div>

      {activeTab === "trade" ? (
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
      ) : (
        <>
          {" "}
          <div className="walletSelectModalDiv_body_header">
            <div
              className={
                showOrders === "All"
                  ? "walletSelectModalDiv_body_header_cont1_active"
                  : "walletSelectModalDiv_body_header_cont1"
              }
              id="All"
              onClick={toggleBuyOrders}
            >
              <svg
                class="sc-eqUAAy cMqsAc mx-icon svg-icon orderbook_iconBuySell__HkmTg"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 20 20"
                data-icon="IconOrderbookUpgreen"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9947 5.46776C15.9947 5.88493 15.6565 6.22312 15.2393 6.22312L4.76122 6.22312C4.34404 6.22312 4.00586 5.88493 4.00586 5.46776C4.00586 5.05059 4.34404 4.7124 4.76122 4.7124L15.2393 4.7124C15.6565 4.7124 15.9947 5.05059 15.9947 5.46776Z"
                  fill="#EE2C5A"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9947 14.5322C15.9947 14.9494 15.6565 15.2876 15.2393 15.2876L4.76122 15.2876C4.34404 15.2876 4.00586 14.9494 4.00586 14.5322C4.00586 14.115 4.34404 13.7769 4.76122 13.7769L15.2393 13.7769C15.6565 13.7769 15.9947 14.115 15.9947 14.5322Z"
                  fill="#16B979"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 8.48924C13.4256 8.90642 13.0874 9.2446 12.6703 9.2446L4.76122 9.2446C4.34404 9.2446 4.00586 8.90642 4.00586 8.48924C4.00586 8.07207 4.34404 7.73389 4.76122 7.73389L12.6703 7.73389C13.0874 7.73389 13.4256 8.07207 13.4256 8.48924Z"
                  fill="#EE2C5A"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 11.5107C13.4256 11.9279 13.0874 12.2661 12.6703 12.2661L4.76122 12.2661C4.34404 12.2661 4.00586 11.9279 4.00586 11.5107C4.00586 11.0936 4.34404 10.7554 4.76122 10.7554L12.6703 10.7554C13.0874 10.7554 13.4256 11.0936 13.4256 11.5107Z"
                  fill="#16B979"
                ></path>
              </svg>
            </div>
            <div
              className={
                showOrders === "Buy"
                  ? "walletSelectModalDiv_body_header_cont1_active"
                  : "walletSelectModalDiv_body_header_cont1"
              }
              id="Buy"
              onClick={toggleBuyOrders}
            >
              <svg
                class="sc-eqUAAy cMqsAc mx-icon iconfont svg-icon orderbook_iconBuySell__HkmTg"
                focusable="false"
                width="1em"
                height="1em"
                fill="#0aa869"
                aria-hidden="true"
                viewBox="0 0 20 20"
                data-icon="IconOrderbookBuy"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9947 14.5322C15.9947 14.1151 15.6565 13.7769 15.2393 13.7769L4.76122 13.7769C4.34404 13.7769 4.00586 14.1151 4.00586 14.5322C4.00586 14.9494 4.34404 15.2876 4.76122 15.2876L15.2393 15.2876C15.6565 15.2876 15.9947 14.9494 15.9947 14.5322Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 11.5108C13.4256 11.0936 13.0874 10.7554 12.6703 10.7554L4.76122 10.7554C4.34404 10.7554 4.00586 11.0936 4.00586 11.5108C4.00586 11.9279 4.34404 12.2661 4.76122 12.2661L12.6703 12.2661C13.0874 12.2661 13.4256 11.9279 13.4256 11.5108Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 8.48927C13.4256 8.0721 13.0874 7.73391 12.6703 7.73391L4.76122 7.73391C4.34404 7.73391 4.00586 8.0721 4.00586 8.48927C4.00586 8.90644 4.34404 9.24463 4.76122 9.24463L12.6703 9.24463C13.0874 9.24463 13.4256 8.90644 13.4256 8.48927Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 5.46779C13.4256 5.05062 13.0874 4.71243 12.6703 4.71243L4.76122 4.71243C4.34404 4.71243 4.00586 5.05062 4.00586 5.46779C4.00586 5.88496 4.34404 6.22314 4.76122 6.22314L12.6703 6.22314C13.0874 6.22314 13.4256 5.88496 13.4256 5.46779Z"
                ></path>
              </svg>
            </div>
            <div
              className={
                showOrders === "Sell"
                  ? "walletSelectModalDiv_body_header_cont1_active"
                  : "walletSelectModalDiv_body_header_cont1"
              }
              id="Sell"
              onClick={toggleBuyOrders}
            >
              <svg
                class="sc-eqUAAy cMqsAc mx-icon iconfont svg-icon orderbook_iconBuySell__HkmTg"
                focusable="false"
                width="1em"
                height="1em"
                fill="#fe445c"
                aria-hidden="true"
                viewBox="0 0 20 20"
                data-icon="IconOrderbookSell"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9947 5.4677C15.9947 5.88487 15.6565 6.22306 15.2393 6.22306L4.76122 6.22306C4.34404 6.22306 4.00586 5.88487 4.00586 5.4677C4.00586 5.05053 4.34404 4.71234 4.76122 4.71234L15.2393 4.71234C15.6565 4.71234 15.9947 5.05053 15.9947 5.4677Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 8.48918C13.4256 8.90635 13.0874 9.24454 12.6703 9.24454L4.76122 9.24454C4.34404 9.24454 4.00586 8.90635 4.00586 8.48918C4.00586 8.07201 4.34404 7.73383 4.76122 7.73383L12.6703 7.73383C13.0874 7.73383 13.4256 8.07201 13.4256 8.48918Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 11.5107C13.4256 11.9278 13.0874 12.266 12.6703 12.266L4.76122 12.266C4.34404 12.266 4.00586 11.9278 4.00586 11.5107C4.00586 11.0935 4.34404 10.7553 4.76122 10.7553L12.6703 10.7553C13.0874 10.7553 13.4256 11.0935 13.4256 11.5107Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4256 14.5323C13.4256 14.9494 13.0874 15.2876 12.6703 15.2876L4.76122 15.2876C4.34404 15.2876 4.00586 14.9494 4.00586 14.5323C4.00586 14.1151 4.34404 13.7769 4.76122 13.7769L12.6703 13.7769C13.0874 13.7769 13.4256 14.1151 13.4256 14.5323Z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="walletSelectModalDiv_body_header_tab">
            <div className="walletSelectModalDiv_body_header_tab_cont">
              Price
              <br />
              {/* {current?.pair.split("-")[1]} */}
              {/* acacd */}
              {current?.ticker?.split("-")[1]}
            </div>

            <div
              className="walletSelectModalDiv_body_header_tab_cont"
              style={{ textAlign: "center" }}
            >
              Amount
              <br />
              {current?.ticker?.split("-")[0]}
            </div>
            <div className="walletSelectModalDiv_body_header_tab_cont">
              Total
              <br />
              {current?.ticker?.split("-")[1]}
            </div>
          </div>
          {showOrders === "Buy" ? (
            <>
              <div
                className="executed_price_div"
                style={{ color: _priceChangeStyling({ pair: current }) }}
                // style={{ color:  "#ff445d" }}
              >
                {numberWithCommas(
                  parseFloat(
                    trades.find((obj) => obj.ticker === current?.ticker)?.price
                  ).toFixed(2) || 0
                )}

                <span className="executed_price_div_span">
                  ≈ ${" "}
                  {numberWithCommas(
                    parseFloat(
                      trades.find((obj) => obj.ticker === current?.ticker)
                        ?.price
                    ).toFixed(2) || 0
                  )}{" "}
                </span>
              </div>
              <div className="walletSelectModalDiv_body_amount_display_body_display_full">
                {/* {sortedGroupedBuyOffersArr.map((data, index) => {
                  // Calculate the width percentage

                  const widthPercentage =
                    (parseInt(data.amount) / maxAmount) * 100;
                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id}
                      key={index}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {parseFloat(data?.price).toFixed(DECIMAL_COUNT)}
                      </div>
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {parseFloat(data.amount).toFixed(DECIMAL_COUNT)}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#16b979" }}
                      >
                        {parseFloat(
                          parseFloat(data?.amount) * parseFloat(data?.price)
                        ).toFixed(DECIMAL_COUNT)}
                      </div>
                      <div
                        style={{ width: `${widthPercentage}%` }}
                        className="amount_bg_stat"
                      ></div>
                    </div>
                  );
                })} */}
                {filledBuyOffers.map((data, index) => {
                  const widthPercentage =
                    data.amount !== "--"
                      ? (parseInt(data?.amount) / maxAmount) * 100
                      : 0;

                  const total =
                    data.price !== "--" && data.amount !== "--"
                      ? (
                          (parseFloat(data.amount) - parseFloat(data.filled)) *
                          parseFloat(data.price)
                        ).toFixed(DECIMAL_COUNT)
                      : "--";

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id || `placeholder-${index}`}
                      key={data.id || `placeholder-${index}`}
                      onClick={() => {
                        if (data.price !== "--") {
                          onPriceUpdate(
                            parseFloat(data?.price).toFixed(DECIMAL_COUNT)
                          );
                          return;
                        }
                      }}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {total}
                      </div>
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount !== "--"
                          ? numberWithCommas(
                              parseFloat(
                                parseFloat(data?.amount) -
                                  parseFloat(data?.filled)
                              ).toFixed(DECIMAL_COUNT)
                            )
                          : "--"}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#16b979" }}
                      >
                        {address
                          ? data.address === address && <DotIndicator />
                          : null}

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
            </>
          ) : showOrders === "Sell" ? (
            <>
              <div
                className="walletSelectModalDiv_body_amount_display_body_display_full"
                style={{ flexDirection: "column-reverse" }}
              >
                {filledSellOffers.map((data, index) => {
                  // Calculate width percentage only if amount is valid
                  const widthPercentage =
                    data.amount !== "--"
                      ? (parseFloat(data?.amount) / maxSellAmount) * 100
                      : 0;
                  console.log(data);

                  // Calculate total and other fields only if price and amount are valid
                  const total =
                    data.amount !== "--" && data.price !== "--"
                      ? (
                          (parseFloat(data.amount) - parseFloat(data.filled)) *
                          parseFloat(data.price)
                        ).toFixed(DECIMAL_COUNT)
                      : "--";

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id || `placeholder-${index}`}
                      key={data.id || `placeholder-${index}`}
                      onClick={() => {
                        if (data.price !== "--") {
                          onPriceUpdate(
                            parseFloat(data?.price).toFixed(DECIMAL_COUNT)
                          );
                          return;
                        }
                      }}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {total}
                      </div>
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount !== "--"
                          ? numberWithCommas(
                              parseFloat(
                                parseFloat(data?.amount) -
                                  parseFloat(data?.filled)
                              ).toFixed(DECIMAL_COUNT)
                            )
                          : "--"}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#e74c3c" }}
                      >
                        {/* check if it's user order  */}
                        {address
                          ? data.address === address && <DotIndicator />
                          : null}
                        {data.price !== "--"
                          ? numberWithCommas(
                              parseFloat(data.price).toFixed(DECIMAL_COUNT)
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
              <div
                className="executed_price_div"
                style={{ color: _priceChangeStyling({ pair: current }) }}
              >
                {numberWithCommas(
                  parseFloat(
                    trades.find((obj) => obj.ticker === current?.ticker)?.price
                  ).toFixed(2) || 0
                )}

                <span className="executed_price_div_span">
                  ≈ ${" "}
                  {numberWithCommas(
                    parseFloat(
                      trades.find((obj) => obj.ticker === current?.ticker)
                        ?.price
                    ).toFixed(2) || 0
                  )}
                </span>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div
                className="walletSelectModalDiv_body_amount_display_body_display"
                style={{ flexDirection: "column-reverse" }}
              >
                {filledSellOffers.map((data, index) => {
                  // Calculate width percentage only if amount is valid
                  const widthPercentage =
                    data.amount !== "--"
                      ? (parseFloat(data.amount) / maxSellAmount) * 100
                      : 0;

                  // Calculate total and other fields only if price and amount are valid
                  const total =
                    data.amount !== "--" && data.price !== "--"
                      ? (
                          (parseFloat(data.amount) - parseFloat(data.filled)) *
                          parseFloat(data.price)
                        ).toFixed(DECIMAL_COUNT)
                      : "--";

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id || `placeholder-${index}`}
                      key={data.id || `placeholder-${index}`}
                      onClick={() => {
                        if (data.price !== "--") {
                          onPriceUpdate(
                            parseFloat(data?.price).toFixed(DECIMAL_COUNT)
                          );
                          return;
                        }
                      }}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {total}
                      </div>
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount !== "--"
                          ? numberWithCommas(
                              parseFloat(
                                parseFloat(data?.amount) -
                                  parseFloat(data?.filled)
                              ).toFixed(DECIMAL_COUNT)
                            )
                          : "--"}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#e74c3c" }}
                      >
                        {address
                          ? data.address === address && <DotIndicator />
                          : null}

                        {data.price !== "--"
                          ? numberWithCommas(
                              parseFloat(data.price).toFixed(DECIMAL_COUNT)
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
              <div
                className="executed_price_div"
                style={{ color: _priceChangeStyling({ pair: current }) }}
              >
                {numberWithCommas(
                  parseFloat(
                    trades.find((obj) => obj.ticker === current?.ticker)?.price
                  ).toFixed(2) || 0
                )}
                <span className="executed_price_div_span">
                  ≈ ${" "}
                  {numberWithCommas(
                    parseFloat(
                      trades.find((obj) => obj.ticker === current?.ticker)
                        ?.price
                    ).toFixed(2) || 0
                  )}
                </span>
              </div>
              <div className="walletSelectModalDiv_body_amount_display_body_display">
                {filledBuyOffers.map((data, index) => {
                  const widthPercentage =
                    data.amount !== "--"
                      ? (parseInt(data?.amount) / maxAmount) * 100
                      : 0;

                  const total =
                    data.price !== "--" && data.amount !== "--"
                      ? (
                          (parseFloat(data.amount) - parseFloat(data.filled)) *
                          parseFloat(data.price)
                        ).toFixed(DECIMAL_COUNT)
                      : "--";

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id || `placeholder-${index}`}
                      key={data.id || `placeholder-${index}`}
                      onClick={() => {
                        if (data.price !== "--") {
                          onPriceUpdate(
                            parseFloat(data?.price).toFixed(DECIMAL_COUNT)
                          );
                          return;
                        }
                      }}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {total}
                      </div>
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount !== "--"
                          ? numberWithCommas(
                              parseFloat(
                                parseFloat(data?.amount) -
                                  parseFloat(data?.filled)
                              ).toFixed(DECIMAL_COUNT)
                            )
                          : "--"}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#16b979" }}
                      >
                        {address
                          ? data.address === address && <DotIndicator />
                          : null}

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
            </>
          )}
        </>
      )}
    </>
  );
};

export default DesktopOrderBook;
