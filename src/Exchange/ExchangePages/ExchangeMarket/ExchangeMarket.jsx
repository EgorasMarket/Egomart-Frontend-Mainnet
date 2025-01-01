import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { _priceChangeStyling, _symbolChecker } from "../../../helpers/helper";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import { ALL_24HOUR_STAT } from "../../../services/trade.services";
import formatNumber from "../../../assets/js/formatNumber";
import { Link } from "react-router-dom";
import WhatshotSharpIcon from "@mui/icons-material/WhatshotSharp";

const ExchangeMarket = () => {
  // const { tickers } = useSelector((state) => state.pairs);
  const { tickers } = useSelector((state) => state.pairs);
  const [payload, setPayload] = useState(null);

  console.log(tickers);

  const getAll24hourStat = async () => {
    const res = await ALL_24HOUR_STAT();
    console.log(res, "all 24 hour stat");
    setPayload(res?.data);
  };
  useEffect(() => {
    getAll24hourStat();
  }, []);

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
                  $
                  {formatNumber(
                    parseFloat(payload?.allTimeVolume24 || 0).toFixed(2)
                  )}
                </div>
              </div>
              <div className="ExchangeMarket_div1_body_cont1">
                <div className="ExchangeMarket_div1_body_cont1_title">
                  24h Trades
                </div>
                <div className="ExchangeMarket_div1_body_cont1_amount">
                  {formatNumber(
                    parseFloat(payload?.totalTrades24 || 0).toFixed(2)
                  )}
                </div>
              </div>
              <div className="ExchangeMarket_div1_body_cont1">
                <div className="ExchangeMarket_div1_body_cont1_title">
                  All Time Volume
                </div>
                <div className="ExchangeMarket_div1_body_cont1_amount">
                  $
                  {formatNumber(
                    parseFloat(payload?.allTimeVolume || 0).toFixed(2)
                  )}
                </div>
              </div>
              <div className="ExchangeMarket_div1_body_cont1">
                <div className="ExchangeMarket_div1_body_cont1_title">
                  All Time Trades
                </div>
                <div className="ExchangeMarket_div1_body_cont1_amount">
                  {formatNumber(
                    parseFloat(payload?.totalTrade || 0).toFixed(2)
                  )}
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
                  console.log(_priceChangeStyling({ pair: market }));
                  return (
                    <Link
                      to={`/app/trade/spot/${market.ticker}`}
                      className="ExchangeMarket_div2_body_cont_div1"
                    >
                      <div className="ExchangeMarket_div2_body_cont_div1_cont1">
                        <img
                          src={market?.img}
                          alt=""
                          className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_img"
                        />
                        <span className="Mobile_ticker_span">
                          <div className="Mobile_ticker_spa1">
                            {market.ticker}{" "}
                            <WhatshotSharpIcon className="fireIcon" />
                          </div>
                          <div className="Mobile_ticker_span_span">
                            ${parseFloat(market.volume24h || 0).toFixed(2)}
                          </div>
                        </span>
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        <span className="Mobile_ticker_span">
                          {numberWithCommas(
                            parseFloat(market?.close24h || 0).toFixed(2)
                          )}
                          <div className="Mobile_ticker_span_span">
                            $
                            {numberWithCommas(
                              parseFloat(market?.close24h || 0).toFixed(2)
                            )}
                          </div>
                        </span>
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2 ">
                        <div
                          className="ExchangeMarket_div2_body_cont_div1_cont2_change "
                          style={{
                            color: _priceChangeStyling({
                              pair: market,
                            }),
                          }}
                        >
                          {_symbolChecker({ pair: market })}
                          {parseFloat(market.change24h || 0).toFixed(2)}%
                        </div>
                        <div
                          className="  change_mobile"
                          style={{
                            background:
                              _priceChangeStyling({ pair: market }) == "#12b66f"
                                ? "#12b66f"
                                : _priceChangeStyling({ pair: market }) ==
                                  "#ff445d"
                                ? "#ff445d"
                                : "#374943",
                          }}
                        >
                          {_symbolChecker({ pair: market })}
                          {parseFloat(market.change24h || 0).toFixed(2)}%
                        </div>
                      </div>
                      <div
                        className="ExchangeMarket_div2_body_cont_div1_cont2"
                        style={{ color: "#12b66f" }}
                      >
                        ${parseFloat(market.highPrice24h || 0).toFixed(2)}
                      </div>
                      <div
                        className="ExchangeMarket_div2_body_cont_div1_cont2"
                        style={{ color: "#ff445d" }}
                      >
                        ${parseFloat(market.lowPrice24h || 0).toFixed(2)}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2">
                        ${parseFloat(market.volume24h || 0).toFixed(2)}
                      </div>
                      <div className="ExchangeMarket_div2_body_cont_div1_cont2_last">
                        <button className="ExchangeMarket_div2_body_cont_div1_cont2_last_btn">
                          Trade
                        </button>
                      </div>
                    </Link>
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
