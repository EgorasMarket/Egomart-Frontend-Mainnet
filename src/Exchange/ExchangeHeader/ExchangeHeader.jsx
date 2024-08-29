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
  InformationCircleIcon,
} from "hugeicons-react";

const ExchangeHeader = () => {
  const { tickers } = useSelector((state) => state.pairs);
  const [marketsDrop, setMarketsDrop] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const toggleMarketsDropDown = () => {
    setMarketsDrop(!marketsDrop);
  };
  console.log("====================================");
  console.log(tickers);
  console.log("====================================");
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
                        {markets.map((market) => {
                          // Function to calculate percentage difference
                          const calculatePercentageDifference = (
                            currentPrice,
                            openPrice
                          ) => {
                            return (
                              ((currentPrice - openPrice) / openPrice) * 100
                            );
                          };

                          const percentageDifference =
                            calculatePercentageDifference(
                              market.currentPrice,
                              market.OpenPrice
                            );
                          return (
                            <Link
                              to={"/app/trade/spot/" + market?.pair}
                              className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1"
                            >
                              <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1">
                                <img
                                  src={market?.img}
                                  alt=""
                                  className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_img"
                                />
                                <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1">
                                  <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_title">
                                    {market.pair}
                                  </div>
                                  <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_vol">
                                    $ {market?.volume24h}
                                  </div>
                                </div>
                              </div>
                              <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2">
                                <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_price">
                                  {market.currentPrice}
                                </div>
                                <div
                                  className={
                                    market.OpenPrice < market.currentPrice
                                      ? "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent"
                                      : "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent_loss"
                                  }
                                >
                                  {market.OpenPrice < market.currentPrice
                                    ? "+"
                                    : "-"}{" "}
                                  {parseFloat(percentageDifference).toFixed(2)}%
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
              <div
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(false);
                }}
              >
                More{" "}
              </div>
            </div>
          </div>
          <div className="exchangeHeader_div2">
            <w3m-button size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeHeader;
