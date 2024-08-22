import React, { useEffect, useRef, useState } from "react";
import { ArrowUp02Icon, ArrowDown02Icon } from "hugeicons-react";
import "./index.css";
import { format, getTime, parseISO } from "date-fns";

const DesktopOrderBook = () => {
  const [showOrders, setShowOrders] = useState("All");
  const [activeTab, setActiveTab] = useState("book");
  const toggleBuyOrders = (e) => {
    setShowOrders(e.currentTarget.id);
  };
  const buyOffers = [
    { id: "1", price: "90", amount: "1000" },
    { id: "2", price: "89", amount: "150" },
    { id: "3", price: "88", amount: "750" },
    { id: "4", price: "87", amount: "1200" },
    { id: "5", price: "86", amount: "200" },
    { id: "6", price: "85", amount: "35" },
    { id: "7", price: "84", amount: "950" },
    { id: "8", price: "83", amount: "300" },
    { id: "9", price: "82", amount: "450" },
    { id: "10", price: "81", amount: "700" },
    { id: "11", price: "80", amount: "2500" },
    { id: "12", price: "79", amount: "600" },
    { id: "13", price: "78", amount: "800" },
    { id: "14", price: "77", amount: "50" },
    { id: "15", price: "76", amount: "1100" },
    { id: "16", price: "75", amount: "10" },
    { id: "17", price: "74", amount: "90" },
    { id: "18", price: "73", amount: "1300" },
    { id: "19", price: "72", amount: "60" },
    { id: "20", price: "71", amount: "400" },
    { id: "21", price: "70", amount: "500" },
    { id: "22", price: "69", amount: "1700" },
    { id: "23", price: "68", amount: "30" },
    { id: "24", price: "67", amount: "280" },
    { id: "25", price: "66", amount: "600" },
    { id: "26", price: "65", amount: "1400" },
    { id: "27", price: "64", amount: "100" },
    { id: "28", price: "63", amount: "320" },
    { id: "29", price: "62", amount: "800" },
    { id: "30", price: "61", amount: "50" },
    { id: "31", price: "60", amount: "1900" },
    { id: "32", price: "59", amount: "400" },
    { id: "33", price: "58", amount: "2000" },
    { id: "34", price: "57", amount: "600" },
    { id: "35", price: "56", amount: "700" },
    { id: "36", price: "55", amount: "1000" },
    { id: "37", price: "54", amount: "300" },
    { id: "38", price: "53", amount: "1200" },
    { id: "39", price: "52", amount: "900" },
    { id: "40", price: "51", amount: "400" },
    { id: "41", price: "50", amount: "2500" },
    { id: "42", price: "49", amount: "300" },
    { id: "43", price: "48", amount: "1000" },
    { id: "44", price: "47", amount: "600" },
    { id: "45", price: "46", amount: "750" },
    { id: "46", price: "45", amount: "1100" },
    { id: "47", price: "44", amount: "500" },
    { id: "48", price: "43", amount: "200" },
    { id: "49", price: "42", amount: "700" },
    { id: "50", price: "41", amount: "1500" },
  ];
  const sellOffers = [
    { id: "1", price: "100", amount: "1500" },
    { id: "2", price: "101", amount: "200" },
    { id: "3", price: "102", amount: "1000" },
    { id: "4", price: "103", amount: "50" },
    { id: "5", price: "104", amount: "600" },
    { id: "6", price: "105", amount: "1100" },
    { id: "7", price: "106", amount: "300" },
    { id: "8", price: "107", amount: "1200" },
    { id: "9", price: "108", amount: "700" },
    { id: "10", price: "109", amount: "1300" },
    { id: "11", price: "110", amount: "400" },
    { id: "12", price: "111", amount: "800" },
    { id: "13", price: "112", amount: "500" },
    { id: "14", price: "113", amount: "100" },
    { id: "15", price: "114", amount: "900" },
    { id: "16", price: "115", amount: "60" },
    { id: "17", price: "116", amount: "2000" },
    { id: "18", price: "117", amount: "300" },
    { id: "19", price: "118", amount: "1400" },
    { id: "20", price: "119", amount: "700" },
    { id: "21", price: "120", amount: "500" },
    { id: "22", price: "121", amount: "200" },
    { id: "23", price: "122", amount: "600" },
    { id: "24", price: "123", amount: "1100" },
    { id: "25", price: "124", amount: "300" },
    { id: "26", price: "125", amount: "1000" },
    { id: "27", price: "126", amount: "400" },
    { id: "28", price: "127", amount: "50" },
    { id: "29", price: "128", amount: "900" },
    { id: "30", price: "129", amount: "60" },
    { id: "31", price: "130", amount: "1500" },
    { id: "32", price: "131", amount: "800" },
    { id: "33", price: "132", amount: "100" },
    { id: "34", price: "133", amount: "1200" },
    { id: "35", price: "134", amount: "300" },
    { id: "36", price: "135", amount: "1100" },
    { id: "37", price: "136", amount: "700" },
    { id: "38", price: "137", amount: "400" },
    { id: "39", price: "138", amount: "2000" },
    { id: "40", price: "139", amount: "500" },
    { id: "41", price: "140", amount: "900" },
    { id: "42", price: "141", amount: "100" },
    { id: "43", price: "142", amount: "600" },
    { id: "44", price: "143", amount: "1300" },
    { id: "45", price: "144", amount: "200" },
    { id: "46", price: "145", amount: "800" },
    { id: "47", price: "146", amount: "50" },
    { id: "48", price: "147", amount: "1000" },
    { id: "49", price: "148", amount: "150" },
    { id: "50", price: "149", amount: "500" },
  ];

  const trades = [
    { time: "2024-07-15T12:00:00Z", type: "buy", price: 1915.3, amount: 0.5 },
    { time: "2024-07-15T12:00:05Z", type: "buy", price: 1915.0, amount: 0.3 },
    { time: "2024-07-15T12:00:10Z", type: "sell", price: 1914.75, amount: 1.2 },
    { time: "2024-07-15T12:00:15Z", type: "buy", price: 1915.1, amount: 1.5 },
    { time: "2024-07-15T12:00:20Z", type: "buy", price: 1915.25, amount: 2.0 },
    { time: "2024-07-15T12:00:25Z", type: "sell", price: 1914.5, amount: 0.7 },
    { time: "2024-07-15T12:00:30Z", type: "buy", price: 1915.4, amount: 1.1 },
    { time: "2024-07-15T12:00:35Z", type: "buy", price: 1915.15, amount: 0.9 },
    { time: "2024-07-15T12:00:40Z", type: "sell", price: 1914.8, amount: 0.8 },
    { time: "2024-07-15T12:00:45Z", type: "buy", price: 1915.35, amount: 1.4 },
    { time: "2024-07-15T12:00:50Z", type: "buy", price: 1915.2, amount: 0.6 },
    { time: "2024-07-15T12:00:55Z", type: "sell", price: 1914.9, amount: 1.3 },
    { time: "2024-07-15T12:01:00Z", type: "buy", price: 1915.45, amount: 0.7 },
    { time: "2024-07-15T12:01:05Z", type: "buy", price: 1915.5, amount: 0.3 },
    { time: "2024-07-15T12:01:10Z", type: "sell", price: 1914.6, amount: 0.4 },
    { time: "2024-07-15T12:01:15Z", type: "buy", price: 1915.1, amount: 1.9 },
    { time: "2024-07-15T12:01:20Z", type: "buy", price: 1915.3, amount: 0.4 },
    { time: "2024-07-15T12:01:25Z", type: "sell", price: 1914.95, amount: 2.1 },
    { time: "2024-07-15T12:01:30Z", type: "buy", price: 1915.0, amount: 2.3 },
    { time: "2024-07-15T12:01:35Z", type: "buy", price: 1915.2, amount: 1.7 },
    { time: "2024-07-15T12:01:40Z", type: "buy", price: 1915.35, amount: 1.0 },
    { time: "2024-07-15T12:01:45Z", type: "sell", price: 1914.85, amount: 0.2 },
    { time: "2024-07-15T12:01:50Z", type: "buy", price: 1915.5, amount: 0.8 },
    { time: "2024-07-15T12:01:55Z", type: "buy", price: 1915.25, amount: 1.6 },
    { time: "2024-07-15T12:02:00Z", type: "sell", price: 1914.7, amount: 0.7 },
    { time: "2024-07-15T12:02:05Z", type: "buy", price: 1915.4, amount: 0.5 },
    { time: "2024-07-15T12:02:10Z", type: "buy", price: 1915.1, amount: 1.1 },
    { time: "2024-07-15T12:02:15Z", type: "sell", price: 1914.65, amount: 1.2 },
    { time: "2024-07-15T12:02:20Z", type: "buy", price: 1915.15, amount: 0.2 },
    { time: "2024-07-15T12:02:25Z", type: "buy", price: 1915.0, amount: 1.3 },
    { time: "2024-07-15T12:02:30Z", type: "buy", price: 1915.35, amount: 0.6 },
    { time: "2024-07-15T12:02:35Z", type: "sell", price: 1914.75, amount: 1.9 },
    { time: "2024-07-15T12:02:40Z", type: "buy", price: 1915.25, amount: 1.0 },
    { time: "2024-07-15T12:02:45Z", type: "buy", price: 1915.4, amount: 0.7 },
    { time: "2024-07-15T12:02:50Z", type: "sell", price: 1914.95, amount: 1.1 },
    { time: "2024-07-15T12:02:55Z", type: "buy", price: 1915.3, amount: 0.5 },
    { time: "2024-07-15T12:03:00Z", type: "buy", price: 1915.0, amount: 0.3 },
    { time: "2024-07-15T12:03:05Z", type: "buy", price: 1915.1, amount: 1.5 },
    { time: "2024-07-15T12:03:10Z", type: "sell", price: 1914.5, amount: 0.7 },
    { time: "2024-07-15T12:03:15Z", type: "buy", price: 1915.25, amount: 2.0 },
    { time: "2024-07-15T12:03:20Z", type: "buy", price: 1915.4, amount: 1.1 },
    { time: "2024-07-15T12:03:25Z", type: "sell", price: 1914.8, amount: 0.8 },
    { time: "2024-07-15T12:03:30Z", type: "buy", price: 1915.15, amount: 0.9 },
    { time: "2024-07-15T12:03:35Z", type: "buy", price: 1915.35, amount: 1.4 },
    { time: "2024-07-15T12:03:40Z", type: "sell", price: 1914.9, amount: 1.3 },
    { time: "2024-07-15T12:03:45Z", type: "buy", price: 1915.2, amount: 0.6 },
    { time: "2024-07-15T12:03:50Z", type: "buy", price: 1915.45, amount: 0.7 },
    { time: "2024-07-15T12:03:55Z", type: "buy", price: 1915.5, amount: 0.3 },
  ];

  const maxAmount = Math.max(
    ...buyOffers.map((offer) => parseInt(offer.amount))
  );
  // Calculate the maximum amount
  const maxSellAmount = Math.max(
    ...sellOffers.map((offer) => parseInt(offer.amount))
  );

  return (
    <div>
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
          {trades
            .sort((a, b) => new Date(b?.time) - new Date(a?.time))
            .map((data) => {
              return (
                <div className="ProductDetailPage_div_body_div2_body_area_trades_body">
                  <div className="ProductDetailPage_div_body_div2_body_area_trades_body_cont1">
                    {format(parseISO(data?.time), "h:mm:ssaa")}
                  </div>
                  <div
                    className="ProductDetailPage_div_body_div2_body_area_trades_body_cont2"
                    style={{
                      color: data?.type === "sell" ? "#ff445d" : "#12b66f",
                    }}
                  >
                    {parseFloat(data?.price).toFixed(2)}
                  </div>
                  <div className="ProductDetailPage_div_body_div2_body_area_trades_body_cont3">
                    {data?.amount}
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
              USDT
            </div>

            <div className="walletSelectModalDiv_body_header_tab_cont">
              Amount
              <br />
              EGAX
            </div>
          </div>
          {showOrders === "Buy" ? (
            <>
              {" "}
              <div className="executed_price_div" style={{ color: "#ff445d" }}>
                $1,000.00
                <span className="executed_price_div_span">≈ $1,000</span>
              </div>
              <div className="walletSelectModalDiv_body_amount_display_body_display_full">
                {buyOffers.map((data) => {
                  // Calculate the width percentage
                  const widthPercentage =
                    (parseInt(data.amount) / maxAmount) * 100;

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id}
                      key={data.id}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#16b979" }}
                      >
                        {data.price}
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
              <div className="walletSelectModalDiv_body_amount_display_body_display_full">
                {sellOffers.map((data) => {
                  // Calculate the width percentage
                  const widthPercentage =
                    (parseInt(data.amount) / maxSellAmount) * 100;

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id}
                      key={data.id}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#e74c3c" }}
                      >
                        {data.price}
                      </div>
                      <div
                        style={{ width: `${widthPercentage}%` }}
                        className="amount_bg_stat_Sell"
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="executed_price_div" style={{ color: "#ff445d" }}>
                1,000.00
                <span className="executed_price_div_span">≈ $1,000</span>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="walletSelectModalDiv_body_amount_display_body_display">
                {sellOffers.map((data) => {
                  // Calculate the width percentage
                  const widthPercentage =
                    (parseInt(data.amount) / maxSellAmount) * 100;

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id}
                      key={data.id}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#e74c3c" }}
                      >
                        {data.price}
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
                // onClick={() => {
                //   setPrice(parseFloat(trades[0]?.userAmount).toFixed(2));
                // }}
                // style={{ color: "#ff445d" }}
                // style={{
                //   color: trades[0]?.action === "BUY" ? "#16b979" : "#ff445d",
                // }}
              >
                1,000.00
                <span className="executed_price_div_span">≈ $1,000</span>
              </div>
              <div className="walletSelectModalDiv_body_amount_display_body_display">
                {buyOffers.map((data) => {
                  // Calculate the width percentage
                  const widthPercentage =
                    (parseInt(data.amount) / maxAmount) * 100;

                  return (
                    <div
                      className="walletSelectModalDiv_body_amount_display"
                      id={data.id}
                      key={data.id}
                    >
                      <div className="walletSelectModalDiv_body_amount_display_cont1">
                        {data.amount}
                      </div>
                      <div
                        className="walletSelectModalDiv_body_amount_display_cont1"
                        style={{ color: "#16b979" }}
                      >
                        {data.price}
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
    </div>
  );
};

export default DesktopOrderBook;
