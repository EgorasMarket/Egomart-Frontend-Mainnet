import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import TradingChart from "./TradingChart/TradingChart";
import BuySell from "./BuySell/BuySell";
import DesktopOrderBook from "./OrderBook/DeskTopOrderBook/DesktopOrderBook";
import TokenDetail from "./TokenDetail/TokenDetail";
import { useAccount, useWatchContractEvent, useWriteContract } from "wagmi";
import abi from "../../../web3/contracts/Egomart.json";
import { useSelector } from "react-redux";
import { markets } from "../../../Components/Static";

const ExchangeTrade = () => {
  const [activeTab, setActiveTab] = useState("price");
  const [marketsDrop, setMarketsDrop] = useState(false);
  const [currentMarket, setCurrentMarket] = useState(markets[0]);

  const { address } = useAccount();

  const { tickers } = useSelector((state) => state.pairs);
  useWatchContractEvent({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    eventName: "Deposit",
    onLogs(logs) {
      console.log("New Deposit!", logs);
    },
  });
  const {
    isPending: depositing,
    data: deposit,
    writeContract: initiateDeposit,
    isError,
    error,
  } = useWriteContract();
  // avionic

  useEffect(() => {
    console.log(
      "depositing",
      depositing,
      "error",
      error,
      "success response",
      deposit
    );
  }, [depositing, isError, error]);

  const depositFn = async () => {
    initiateDeposit({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      functionName: "deposit",
      args: [
        "0x95dB95CD5C1D41c11bD30e50AaC703D5b717C5fa",
        10000000000000000000,
      ],
    });
  };
  const toggleMarketsDropDown = () => {
    setMarketsDrop(!marketsDrop);
  };
  const SetCurrentMarketFunc = (data) => {
    setCurrentMarket(data);
    toggleMarketsDropDown();
  };
  return (
    <div className="ExchangeTrade">
      <div className="ExchangeTrade_div1">
        <div className="ExchangeTrade_div1_cont1">
          <div
            className="ExchangeTrade_div1_cont1_area"
            onClick={toggleMarketsDropDown}
          >
            <div className="ExchangeTrade_div1_cont1_div1">
              {marketsDrop ? (
                <>Choose Market</>
              ) : (
                <>
                  {" "}
                  <img
                    src={currentMarket.img}
                    alt=""
                    className="ExchangeTrade_div1_cont1_div1_img"
                  />
                  {currentMarket.pair}
                </>
              )}
            </div>
            <div className="ExchangeTrade_div1_cont1_div2">
              {marketsDrop ? (
                <>
                  Close
                  <ArrowUp01Icon className="ExchangeTrade_div1_cont1_div2_icon" />
                </>
              ) : (
                <>
                  All Markets
                  <ArrowDown01Icon className="ExchangeTrade_div1_cont1_div2_icon" />
                </>
              )}
            </div>
          </div>
          {marketsDrop && (
            <div className="ExchangeTrade_div1_cont1_markets_drop">
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
                      return ((currentPrice - openPrice) / openPrice) * 100;
                    };

                    const percentageDifference = calculatePercentageDifference(
                      market.currentPrice,
                      market.OpenPrice
                    );
                    return (
                      <div
                        className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1"
                        onClick={() => {
                          SetCurrentMarketFunc(market);
                        }}
                      >
                        <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1">
                          <img
                            src={market.img}
                            alt=""
                            className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_img"
                          />
                          <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1">
                            <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_title">
                              {market.pair}
                            </div>
                            <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_vol">
                              ${market.volume24h}
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
                            {market.OpenPrice < market.currentPrice ? "+" : "-"}{" "}
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

        <div className="ExchangeTrade_div1_cont2">
          <div className="ExchangeTrade_div1_cont2_cont1">
            <div className="ExchangeTrade_div1_cont2_cont1_cont1">
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont1_span1
              "
              >
                60,000.00
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont1_span2
              "
              >
                ≈$60,000.00
              </span>
            </div>
            <div className="ExchangeTrade_div1_cont2_cont1_cont2">
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span1
              "
              >
                24h Change
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span2
              "
              >
                +0.76%
              </span>
            </div>
            <div className="ExchangeTrade_div1_cont2_cont1_cont3">
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span1
              "
              >
                24h Volume
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span2
              "
              >
                $1,201,530
              </span>
            </div>
          </div>
          <div className="ExchangeTrade_div1_cont2_cont2">
            <InformationCircleIcon className="ExchangeTrade_div1_cont2_cont2_icon" />
            Market Details
          </div>
        </div>
      </div>
      <div className="ExchangeTrade_div2">
        <div className="ExchangeTrade_div2_cont1">
          <div className="ExchangeTrade_div2_cont1_header">
            <div className="ExchangeTrade_div2_cont1_header_cont">
              <div
                className={
                  activeTab === "price"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTab("price");
                }}
              >
                Price
              </div>
              <div
                className={
                  activeTab === "depth"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTab("depth");
                }}
              >
                Depth
              </div>
              <div
                className={
                  activeTab === "detail"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTab("detail");
                }}
              >
                Details
              </div>
            </div>
          </div>
          <div className="ExchangeTrade_div2_cont1_body">
            {activeTab === "price" ? <TradingChart /> : <TokenDetail />}
          </div>
        </div>
        <div className="ExchangeTrade_div2_cont2">
          <DesktopOrderBook />
        </div>
        <div className="ExchangeTrade_div2_cont3">
          <BuySell />
        </div>
      </div>
      <div className="ExchangeTrade_div3">
        <div className="ExchangeTrade_div3_cont1">
          <div className="ExchangeTrade_div2_cont1_header">
            <div className="ExchangeTrade_div2_cont1_header_cont">
              <div className="ExchangeTrade_div2_cont1_header_cont1">
                Positions
              </div>
              <div className="ExchangeTrade_div2_cont1_header_cont2">
                Orders
              </div>
              <div className="ExchangeTrade_div2_cont1_header_cont2">
                History
              </div>
            </div>
          </div>
        </div>
        <div className="ExchangeTrade_div3_cont2">
          <div className="ExchangeTrade_div3_cont2_title">Account</div>
          <div className="ExchangeTrade_div3_cont2_conts">
            <div className="ExchangeTrade_div3_cont2_conts_div1">
              <div className="ExchangeTrade_div3_cont2_conts_div1_txt">
                Locked Bal{" "}
                <InformationCircleIcon className="ExchangeTrade_div3_cont2_conts_div1_txt_icon" />
              </div>
              <div className="ExchangeTrade_div3_cont2_conts_div1_para">
                $100.00
              </div>
            </div>
            <div className="ExchangeTrade_div3_cont2_conts_div1">
              <div className="ExchangeTrade_div3_cont2_conts_div1_txt">
                Avail Bal{" "}
                <InformationCircleIcon className="ExchangeTrade_div3_cont2_conts_div1_txt_icon" />
              </div>
              <div className="ExchangeTrade_div3_cont2_conts_div1_para">
                $870.00
              </div>
            </div>
            <div className="ExchangeTrade_div3_cont2_conts_div1">
              <div className="ExchangeTrade_div3_cont2_conts_div1_txt">
                Total Bal{" "}
                <InformationCircleIcon className="ExchangeTrade_div3_cont2_conts_div1_txt_icon" />
              </div>
              <div className="ExchangeTrade_div3_cont2_conts_div1_para">
                $970.00
              </div>
            </div>
          </div>
          <div className="ExchangeTrade_div3_cont2_conts_button">
            <button
              onClick={depositFn}
              className="ExchangeTrade_div3_cont2_conts_button_1"
            >
              Deposit
            </button>
            <button className="ExchangeTrade_div3_cont2_conts_button_1">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeTrade;
