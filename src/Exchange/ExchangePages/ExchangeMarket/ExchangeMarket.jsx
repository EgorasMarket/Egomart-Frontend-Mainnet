import React, { useEffect, useState } from "react";
import "./index.css";
import { markets } from "../../../Components/Static";
import { useDispatch, useSelector } from "react-redux";
import { _priceChangeStyling, _symbolChecker } from "../../../helpers/helper";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";

const ExchangeMarket = () => {
  // const { tickers } = useSelector((state) => state.pairs);
  const { tickers } = useSelector((state) => state.pairs);

  console.log(tickers);
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
                <div className="ExchangeMarket_div2_body_header_1">Change</div>
                <div className="ExchangeMarket_div2_body_header_1">
                  24h High
                </div>
                <div className="ExchangeMarket_div2_body_header_1">24h Low</div>
                <div className="ExchangeMarket_div2_body_header_1">24h Vol</div>
                <div
                  className="ExchangeMarket_div2_body_header_1_last
                "
                ></div>
              </div>
              <div className="ExchangeMarket_div2_body_cont">
                {tickers.map((market) => {
                  // Function to calculate percentage difference

                  return (
                    <div className="ExchangeMarket_div2_body_cont_div1">
                      <div className="ExchangeMarket_div2_body_cont_div1_cont1">
                        <img
                          src={market?.img}
                          alt=""
                          className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_img"
                        />
                        {market.pair}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        {numberWithCommas(parseFloat(market?.close24h || 0))}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        <div
                          className="ExchangeMarket_div2_body_cont_div1_cont2_change "
                          style={{
                            color: _priceChangeStyling({
                              pair: market,
                            }),
                          }}
                        >
                          {_symbolChecker({ pair: market })}
                          {parseFloat(market.change24h || 0)}%
                        </div>
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        {parseFloat(market.highPrice24h || 0)}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        {parseFloat(market.lowPrice24h || 0)}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        ${parseFloat(market.volume24h || 0)}
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
