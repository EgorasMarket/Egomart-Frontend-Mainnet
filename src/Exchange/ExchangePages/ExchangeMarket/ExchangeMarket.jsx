import React from "react";
import "./index.css";
import { markets } from "../../../Components/Static";
const ExchangeMarket = () => {
  return (
    <div className="ExchangeMarket">
      <div className="container">
        <div className="ExchangeMarket_area">
          <div className="ExchangeMarket_div1">
            <div className="ExchangeMarket_div1_title">Markets</div>
            <div className="ExchangeMarket_div1_body">
              <div className="ExchangeMarket_div1_body_cont1">
                <div className="ExchangeMarket_div1_body_cont1_title">
                  24h Volume
                </div>
                <div className="ExchangeMarket_div1_body_cont1_amount">
                  $192M
                </div>
              </div>
              <div className="ExchangeMarket_div1_body_cont1">
                <div className="ExchangeMarket_div1_body_cont1_title">
                  24h Trades
                </div>
                <div className="ExchangeMarket_div1_body_cont1_amount">
                  105,931
                </div>
              </div>
              <div className="ExchangeMarket_div1_body_cont1">
                <div className="ExchangeMarket_div1_body_cont1_title">
                  All Time Volume
                </div>
                <div className="ExchangeMarket_div1_body_cont1_amount">
                  $113B
                </div>
              </div>
              <div className="ExchangeMarket_div1_body_cont1">
                <div className="ExchangeMarket_div1_body_cont1_title">
                  All Time Trades
                </div>
                <div className="ExchangeMarket_div1_body_cont1_amount">
                  553,000,000
                </div>
              </div>
            </div>
          </div>
          <div className="ExchangeMarket_div2">
            <div className="ExchangeMarket_div2_title">
              <div className="ExchangeMarket_div2_title_div1">Spot</div>
            </div>
            <div className="ExchangeMarket_div2_body">
              <div className="ExchangeMarket_div2_body_header">
                <div className="ExchangeMarket_div2_body_header_1">Market</div>
                <div className="ExchangeMarket_div2_body_header_1">Price</div>
                <div className="ExchangeMarket_div2_body_header_1">
                  24h Change
                </div>
                <div className="ExchangeMarket_div2_body_header_1">24h Vol</div>
                <div
                  className="ExchangeMarket_div2_body_header_1_last
                "
                ></div>
              </div>
              <div className="ExchangeMarket_div2_body_cont">
                {markets.map((data) => {
                  // Function to calculate percentage difference
                  const calculatePercentageDifference = (
                    currentPrice,
                    openPrice
                  ) => {
                    return ((currentPrice - openPrice) / openPrice) * 100;
                  };

                  const percentageDifference = calculatePercentageDifference(
                    data.currentPrice,
                    data.OpenPrice
                  );

                  return (
                    <div className="ExchangeMarket_div2_body_cont_div1">
                      <div className="ExchangeMarket_div2_body_cont_div1_cont1">
                        <img
                          src={data.img}
                          alt=""
                          className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_img"
                        />
                        {data.pair}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        {data.currentPrice}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        <div className="ExchangeMarket_div2_body_cont_div1_cont2_change">
                          {parseFloat(percentageDifference).toFixed(2)}%
                        </div>
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        {data.volume24h}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2_last">
                        <button className="ExchangeMarket_div2_body_cont_div1_cont2_last_btn">
                          Trade
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeMarket;
