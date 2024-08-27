import React, { useState } from "react";
import "./index.css";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import { markets } from "../../Components/Static";

import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  InformationCircleIcon,
} from "hugeicons-react";

const ExchangeHeader = () => {
  const [marketsDrop, setMarketsDrop] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const toggleMarketsDropDown = () => {
    setMarketsDrop(!marketsDrop);
  };
  return (
    <div className="exchangeHeader">
      <div className="container_fluid">
        <div className="exchangeHeader_area">
          <div className="exchangeHeader_div1">
            <img
              src="/img/vertex_logo.svg"
              alt=""
              className="exchangeHeader_div1_img"
            />
            <div className="exchangeHeader_div1_links">
              <Link
                to={"/app/portfolio/overview"}
                className="exchangeHeader_div1_links_tab1"
              >
                Portfolio
              </Link>
              <div
                className="exchangeHeader_div1_links_tab1"
                onMouseOver={() => {
                  setMarketsDrop(true);
                }}
                onMouseOut={() => {
                  setMarketsDrop(false);
                }}
              >
                Trade{" "}
                <ArrowDown01Icon
                  className="exchangeHeader_div1_links_tab1_icon"
                  size={18}
                />
                {marketsDrop && (
                  <div
                    className="ExchangeTrade_div1_cont1_markets_dropb"
                    onMouseOver={() => {
                      setMarketsDrop(true);
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
                            <div
                              className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1"
                              onClick={() => {
                                navigate("/app/trade/spot/" + market?.pair);
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
                            </div>
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
              >
                Markets
              </Link>
              <div className="exchangeHeader_div1_links_tab1">More </div>
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
