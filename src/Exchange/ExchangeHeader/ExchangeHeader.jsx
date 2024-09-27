import React, { useState } from "react";
import "./index.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import { markets } from "../../Components/Static";
import { useSelector } from "react-redux";

import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Menu01Icon,
  Cancel01Icon,
  GiftIcon,
  ArrowRight01Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import { Padding } from "@mui/icons-material";
import { numberWithCommas } from "../../assets/js/numberWithCommas";
import { _priceChangeStyling, _symbolChecker } from "../../helpers/helper";

const ExchangeHeader = () => {
  const { tickers } = useSelector((state) => state.pairs);
  const [marketsDrop, setMarketsDrop] = useState(false);
  const [mobileDrop, setMobileDrop] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount({});
  const { open, close } = useWeb3Modal();
  const toggleMarketsDropDown = () => {
    setMarketsDrop(!marketsDrop);
  };
  console.log("====================================");
  console.log(tickers);
  console.log("====================================");
  const toggleMobileDrop = () => {
    setMobileDrop(!mobileDrop);
  };
  return (
    <div className="exchangeHeader">
      <div className="container_fluid">
        <div className="exchangeHeader_area">
          <div className="exchangeHeader_div1">
            <div className="exchangeHeader_div1_cont1">
              <img
                src="/egomart_logo.png"
                alt=""
                className="exchangeHeader_div1_img"
              />
              Egomart
            </div>

            <div className="exchangeHeader_div1_links">
              <Link
                to={"/app/portfolio/overview"}
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(false);
                }}
              >
                Portfolio
              </Link>
              <div
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(true);
                }}
              >
                Trade{" "}
                {marketsDrop ? (
                  <ArrowUp01Icon
                    className="exchangeHeader_div1_links_tab1_icon"
                    size={18}
                  />
                ) : (
                  <ArrowDown01Icon
                    className="exchangeHeader_div1_links_tab1_icon"
                    size={18}
                  />
                )}
                {marketsDrop && (
                  <div
                    className="ExchangeTrade_div1_cont1_markets_dropb"
                    onMouseOut={() => {
                      setMarketsDrop(false);
                    }}
                  >
                    <div className="ExchangeTrade_div1_cont1_markets_drop_cont1">
                      <input
                        type="search"
                        placeholder="search"
                        className="ExchangeTrade_div1_cont1_markets_drop_cont1_input"
                      />
                    </div>
                    <div className="ExchangeTrade_div1_cont1_markets_drop_cont2">
                      <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_head">
                        <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_head_txt1">
                          Market/Volume
                        </div>
                        <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_head_txt1">
                          Price
                        </div>
                      </div>
                      <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body">
                        {tickers.map((market) => {
                          // Function to calculate percentage difference

                          return (
                            <Link
                              to={"/app/trade/spot/" + market?.ticker}
                              className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1"
                              onClick={() => {
                                setMarketsDrop(false);
                              }}
                            >
                              <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1">
                                <img
                                  src={market?.img}
                                  alt=""
                                  className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_img"
                                />
                                <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1">
                                  <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_title">
                                    {market.ticker}
                                  </div>
                                  <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_vol">
                                    ${" "}
                                    {numberWithCommas(
                                      parseFloat(market?.volume24h).toFixed(2)
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2">
                                <div
                                  className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_price"
                                  style={{
                                    color: _priceChangeStyling({
                                      pair: market,
                                    }),
                                  }}
                                >
                                  {/* {parseFloat(market.change24h) || 0}ss */}
                                  {numberWithCommas(
                                    parseFloat(market?.close24h || 0).toFixed(2)
                                  )}
                                </div>
                                <div
                                  className={
                                    market.OpenPrice < market.currentPrice
                                      ? "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent"
                                      : "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent_loss"
                                  }
                                  style={{
                                    color: _priceChangeStyling({
                                      pair: market,
                                    }),
                                  }}
                                >
                                  {_symbolChecker({ pair: market })}
                                  {numberWithCommas(
                                    parseFloat(market?.change24h || 0).toFixed(
                                      2
                                    ) || 0
                                  )}
                                  %
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to={"/app/market"}
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(false);
                }}
              >
                Markets
              </Link>
              <Link
                to={"/app/earn"}
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(false);
                }}
              >
                Earn{" "}
                <span style={{ marginLeft: "5px" }}>
                  <GiftIcon size={16} />
                </span>
              </Link>
              <Link
                to={"/app/bond"}
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(false);
                }}
              >
                Bond
              </Link>
              {/* <div
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(false);
                }}
              >
                More{" "}
              </div> */}
            </div>
          </div>
          <div className="exchangeHeader_div2">
            <w3m-button size="sm" />
            {/* <div className="exchangeHeader_mobile_btn"> */}
            {mobileDrop ? (
              <Cancel01Icon
                className="exchangeHeader_mobile_btn_icon"
                size={18}
                onClick={toggleMobileDrop}
              />
            ) : (
              <Menu01Icon
                className="exchangeHeader_mobile_btn_icon"
                size={18}
                onClick={toggleMobileDrop}
              />
            )}
            {/* </div> */}
          </div>
        </div>
      </div>
      {mobileDrop ? (
        <div className="MobileDropDiv">
          <div className="MobileDropDiv_cont">
            <div className="MobileDropDiv_cont_1">
              Portfolio <ArrowRight01Icon />
            </div>

            <details className="MobileDropDiv_cont_1">
              <summary className="baccordion_title"> Trade</summary>
              <div className="accordion_body">
                <div className="accordion_body_cont1">
                  {/* <div className="mobile_nav_links_div"> */}
                  <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body">
                    {tickers.map((market) => {
                      // Function to calculate percentage difference

                      return (
                        <div
                          className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1"
                          onClick={() => {
                            toggleMobileDrop();
                            navigate("/app/trade/spot/" + market?.ticker);
                          }}
                        >
                          <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1">
                            <img
                              src={market?.img}
                              alt=""
                              className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_img"
                            />
                            <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1">
                              <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_title">
                                {market.ticker}
                              </div>
                              <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_vol">
                                ${" "}
                                {numberWithCommas(
                                  parseFloat(market?.volume24h).toFixed(2)
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2">
                            <div
                              className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_price"
                              style={{
                                color: _priceChangeStyling({
                                  pair: market,
                                }),
                              }}
                            >
                              {/* {parseFloat(market.change24h) || 0}ss */}
                              {numberWithCommas(
                                parseFloat(market?.close24h || 0).toFixed(2)
                              )}
                            </div>
                            <div
                              className={
                                market.OpenPrice < market.currentPrice
                                  ? "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent"
                                  : "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent_loss"
                              }
                              style={{
                                color: _priceChangeStyling({
                                  pair: market,
                                }),
                              }}
                            >
                              {_symbolChecker({ pair: market })}
                              {numberWithCommas(
                                parseFloat(market?.change24h || 0).toFixed(2) ||
                                  0
                              )}
                              %
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* </div> */}
              </div>
            </details>

            <div className="MobileDropDiv_cont_1">
              Markets <ArrowRight01Icon />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExchangeHeader;
