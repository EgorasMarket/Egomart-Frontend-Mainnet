import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import TradingChart from "./TradingChart/TradingChart";
import BuySell from "./BuySell/BuySell";
import MarketDepth from "./MarketDepth/MarketDepth";
import DesktopOrderBook from "./OrderBook/DeskTopOrderBook/DesktopOrderBook";
import TokenDetail from "./TokenDetail/TokenDetail";
import { useAccount, useWatchContractEvent, useWriteContract } from "wagmi";
import abi from "../../../web3/contracts/Egomart.json";
import { useDispatch, useSelector } from "react-redux";
import { markets } from "../../../Components/Static";
import { Link, useNavigate, useParams } from "react-router-dom";
import Trades from "./tradesTransactionsComp/Trades";
import OpenOrders from "./tradesTransactionsComp/OpenOrders";
import Orders from "./tradesTransactionsComp/Orders";
import Modal from "../../../Components/Modal/Modal";
import Deposit from "../../Funding/Deposit";
import Withdraw from "../../Funding/Withdraw";
import MobileOrderBook from "./OrderBook/MobileOrderBook/MobileOrderBook";
import MobileTrades from "./OrderBook/MobileOrderBook/MobileTrades";
import CustomBottomSheet from "../../../Components/CustomBottomSheet/CustomBottomSheet";
import { useQuery } from "@tanstack/react-query";
import { GET_24_HOUR_VOLUME } from "../../../services/trade.services";
// import { updateTicker } from "../../../features/PairsSlice";
import { _priceChangeStyling, _symbolChecker } from "../../../helpers/helper";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import { TVChartContainer } from "../../../Tradingview/TVChartContainer";
import useFetchBalance from "../../../hooks/useFetchBalance";

const ExchangeTrade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticker } = useParams();
  const [activeTab, setActiveTab] = useState("price");
  const [mobActiveTab, setMobActiveTab] = useState("mobOrderBook");
  const [activeTxTab, setActiveTxTab] = useState("position");
  const [marketsDrop, setMarketsDrop] = useState(false);
  const [marketsDropMobile, setMarketsDropMobile] = useState(false);
  const { address } = useAccount();
  const { tickers } = useSelector((state) => state.pairs);
  const { trades } = useSelector((state) => state.trades);
  const [currentMarket, setCurrentMarket] = useState(null);
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [mobBuySellModal, setMobBuySellModal] = useState(false);
  const [activeBtn, setActiveBtn] = useState("buy");
  const [priceUpdate, setPriceUpdate] = useState(0);
  console.log(ticker);

  const splitTicker = ticker?.split("-");
  console.log(splitTicker[0]);
  console.log(splitTicker);

  // useEffect(() => {
  //   if (tickers.length > 0) {
  //     setCurrentMarket(tickers[0]);
  //   }
  // }, [tickers]);

  // useWatchContractEvent({
  //   address: import.meta.env.VITE_CONTRACT_ADDRESS,
  //   abi,
  //   eventName: "Deposit",
  //   onLogs(logs) {},
  // });
  // const {
  //   isPending: depositing,
  //   data: deposit,
  //   writeContract: initiateDeposit,
  //   isError,
  //   error,
  // } = useWriteContract();

  // const get24hr = async () => {
  //   if (!ticker) {
  //     return;
  //   }

  //   const res = await GET_24_HOUR_VOLUME(ticker);
  //   console.log(res, "24hr volume ");

  //   if (!res.success) return {};

  //   let _open24 = res.dailyStats?.openPrice || 0;
  //   let _close24 = res.dailyStats?.closePrice || 0;
  //   let _volume24h = res.dailyStats?.volume || 0;
  //   let _lowPrice24h = res.dailyStats?.lowPrice || 0;
  //   let _high24 = res.dailyStats?.highPrice || 0;
  //   // let _change24h =( (closingPrice  - openPrice )/  openprice  ) *100
  //   let _change24h =
  //     parseFloat(
  //       (parseFloat(_close24) - parseFloat(_open24)) / parseFloat(_open24)
  //     ) * 100;

  //   const payload = {
  //     open24h: _open24,
  //     close24h: res.dailyStats.closePrice || 0,
  //     volume24h: res.dailyStats.volume || 0,
  //     lowPrice24h: res.dailyStats.lowPrice || 0,
  //     highPrice24h: res.dailyStats.highPrice || 0,
  //     change24h: _change24h,
  //   };

  //   dispatch(updateTicker({ pair: ticker, data: payload }));

  //   return res;
  // };
  // const {
  //   data,
  //   isPending: pending,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["24hour"],
  //   queryFn: get24hr,
  // });

  // useEffect(() => {
  //   get24hr();
  // }, []);
  const toggleActiveBtn = async (e) => {
    setActiveBtn(e.currentTarget.id);
  };
  const toggleMarketsDropDown = () => {
    setMarketsDrop(!marketsDrop);
  };
  const toggleMarketsDropDownMobile = () => {
    setMarketsDropMobile(!marketsDropMobile);
  };
  const SetCurrentMarketFunc = (data) => {
    setCurrentMarket(data);
    // toggleMarketsDropDown();
  };
  const fetchTicker = async () => {
    if (ticker) {
      let currMarket =
        tickers.find((tick) => tick.ticker === ticker) || tickers[0];
      SetCurrentMarketFunc(currMarket);
    } else {
      SetCurrentMarketFunc(tickers[0]);
    }
  };
  useEffect(() => {
    fetchTicker();
    console.log("i just ran now ");
    // Only run the effect when 'tickers' change
  }, [ticker, trades, tickers]);

  const closeDepositModal = () => {
    setDeposit(false);
  };
  const openDepositModal = () => {
    setDeposit(true);
  };
  const closeWithdrawModal = () => {
    setWithdraw(false);
  };
  const openWithdrawModal = () => {
    setWithdraw(true);
  };
  const openMobBuySellModal = () => {
    setMobBuySellModal(true);
  };
  const closeMobBuySellModal = () => {
    setMobBuySellModal(false);
  };

  const handlePriceUpdate = (price) => {
    console.log(parseFloat(price).toFixed(2));
    setPriceUpdate(parseFloat(price).toFixed(2));
  };
  // console.log(currentMarket);

  const tickerABal =
    parseFloat(
      trades.find((obj) => obj.ticker === currentMarket?.ticker)?.price || 0
    ).toFixed(2) * useFetchBalance(currentMarket?.tickerA);
  const tickerBBal = useFetchBalance(currentMarket?.tickerB);
  const totalBalance = tickerABal + tickerBBal;
  console.log(currentMarket);
  console.log(totalBalance);
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
                    src={currentMarket?.img}
                    alt=""
                    className="ExchangeTrade_div1_cont1_div1_img"
                  />
                  {currentMarket?.ticker}
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
                                parseFloat(market?.volume24h || 0).toFixed(3)
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
                              parseFloat(market?.close24h || 0)
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
                              parseFloat(market?.change24h || 0).toFixed(3) || 0
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

        <div className="ExchangeTrade_div1_cont2">
          <div className="ExchangeTrade_div1_cont2_cont1">
            <div className="ExchangeTrade_div1_cont2_cont1_cont1">
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont1_span1
              "
                style={{ color: _priceChangeStyling({ pair: currentMarket }) }}
              >
                {parseFloat(currentMarket?.open24h) <
                parseFloat(currentMarket?.close24h) ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 256 256"
                    className="text-positive"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M215.39,163.06A8,8,0,0,1,208,168H48a8,8,0,0,1-5.66-13.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,215.39,163.06Z"></path>
                  </svg>
                ) : parseFloat(currentMarket?.open24h) >
                  parseFloat(currentMarket?.close24h) ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 256 256"
                    className="text-negative"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z"></path>
                  </svg>
                ) : null}
                {numberWithCommas(
                  parseFloat(
                    trades.find((obj) => obj.ticker === currentMarket?.ticker)
                      ?.price || 0
                  ).toFixed(2)
                )}
                {/* Egod */}
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont1_span2
              "
              >
                ≈$
                {numberWithCommas(
                  parseFloat(
                    trades.find((obj) => obj.ticker === currentMarket?.ticker)
                      ?.price || 0
                  ).toFixed(2) || 0
                )}
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
                style={{ color: _priceChangeStyling({ pair: currentMarket }) }}
              >
                {/* {parseFloat(currentMarket?.open24h) <
                  parseFloat(currentMarket?.close24h) && "+"} */}
                {_symbolChecker({ pair: currentMarket })}
                {numberWithCommas(
                  parseFloat(currentMarket?.change24h || 0).toFixed(3)
                )}
                %
              </span>
            </div>
            <div className="ExchangeTrade_div1_cont2_cont1_cont2">
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span1
              "
              >
                24h High
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span2
              "
                style={{ color: "#12b66f" }}
              >
                {numberWithCommas(
                  parseFloat(currentMarket?.highPrice24h || 0).toFixed(2) || 0
                )}
              </span>
            </div>
            <div className="ExchangeTrade_div1_cont2_cont1_cont2">
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span1
              "
              >
                24h Low
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont2_span2
              "
                style={{ color: "#ff445d" }}
              >
                {numberWithCommas(
                  parseFloat(currentMarket?.lowPrice24h || 0).toFixed(2) || 0
                )}
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
                $
                {numberWithCommas(
                  parseFloat(currentMarket?.volume24h || 0).toFixed(3)
                )}
              </span>
            </div>
          </div>
          <div className="ExchangeTrade_div1_cont2_cont2">
            <InformationCircleIcon className="ExchangeTrade_div1_cont2_cont2_icon" />
            Market Details
          </div>
        </div>
      </div>
      {/* ===== */}
      {/* ===== */}
      {/* ===== */}
      {/* ===== */}
      <div className="ExchangeTrade_div1_mobile">
        <div className="ExchangeTrade_div1_mobile_div1">
          <div
            className="ExchangeTrade_div1_mobile_div1_title"
            onClick={toggleMarketsDropDownMobile}
          >
            <div className="ExchangeTrade_div1_mobile_div1_title_txt">
              {currentMarket?.ticker}
            </div>
            {marketsDropMobile ? (
              <ArrowUp01Icon className="ExchangeTrade_div1_cont1_div2_icon" />
            ) : (
              <ArrowDown01Icon className="ExchangeTrade_div1_cont1_div2_icon" />
            )}
          </div>
          <div
            className="ExchangeTrade_div1_mobile_div1_price"
            style={{ color: _priceChangeStyling({ pair: currentMarket }) }}
          >
            {numberWithCommas(
              parseFloat(
                trades.find((obj) => obj.ticker === currentMarket?.ticker)
                  ?.price || 0
              ).toFixed(2)
            )}
            <span className="ExchangeTrade_div1_mobile_div1_price_span">
              ≈${" "}
              {numberWithCommas(
                parseFloat(
                  trades.find((obj) => obj.ticker === currentMarket?.ticker)
                    ?.price || 0
                ).toFixed(2) || 0
              )}
              <div
                className="ExchangeTrade_div1_mobile_div1_price_span_change"
                style={{ color: _priceChangeStyling({ pair: currentMarket }) }}
              >
                {/* {parseFloat(currentMarket?.open24h) <
                  parseFloat(currentMarket?.close24h) && "+"} */}
                {_symbolChecker({ pair: currentMarket })}
                {numberWithCommas(
                  parseFloat(currentMarket?.change24h || 0).toFixed(2)
                )}
                %
              </div>
            </span>
          </div>
        </div>
        <div className="ExchangeTrade_div1_mobile_div2">
          <div className="ExchangeTrade_div1_mobile_div2_cont1">
            <div className="ExchangeTrade_div1_mobile_div2_cont1_title">
              24h High
            </div>
            <div
              className="ExchangeTrade_div1_mobile_div2_cont1_para"
              // style={{ color: "#12b66f" }}
            >
              {numberWithCommas(
                parseFloat(currentMarket?.highPrice24h || 0).toFixed(2) || 0
              )}
            </div>
          </div>

          <div className="ExchangeTrade_div1_mobile_div2_cont1">
            <div className="ExchangeTrade_div1_mobile_div2_cont1_title">
              24h Low
            </div>
            <div
              className="ExchangeTrade_div1_mobile_div2_cont1_para"
              // style={{ color: "#ff445d" }}
            >
              {numberWithCommas(
                parseFloat(currentMarket?.lowPrice24h || 0).toFixed(2) || 0
              )}
            </div>
          </div>
          <div className="ExchangeTrade_div1_mobile_div2_cont1">
            <div className="ExchangeTrade_div1_mobile_div2_cont1_title">
              24h Vol (EGOD)
            </div>
            <div className="ExchangeTrade_div1_mobile_div2_cont1_para">
              {numberWithCommas(
                parseFloat(currentMarket?.volume24h || 0).toFixed(3)
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ===== */}
      {/* ===== */}
      {/* ===== */}
      {/* ===== */}
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
            {activeTab === "price" ? (
              <TVChartContainer ticker={ticker} />
            ) : // <TradingChart />
            activeTab === "depth" ? (
              <MarketDepth current={currentMarket} />
            ) : (
              <TokenDetail payload={currentMarket} />
            )}
          </div>
        </div>
        <div className="ExchangeTrade_div2_cont2_mobile">
          <div className="ExchangeTrade_div2_cont1_header_mobile">
            <div className="ExchangeTrade_div2_cont1_header_cont">
              <div
                className={
                  mobActiveTab === "mobOrderBook"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setMobActiveTab("mobOrderBook");
                }}
              >
                Order Book
              </div>
              <div
                className={
                  mobActiveTab === "mobDepth"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setMobActiveTab("mobDepth");
                }}
              >
                Trades
              </div>
              <div
                className={
                  mobActiveTab === "mobDetail"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setMobActiveTab("mobDetail");
                }}
              >
                Info
              </div>
            </div>
          </div>

          <>
            {mobActiveTab === "mobDepth" ? (
              <MobileTrades current={currentMarket} />
            ) : mobActiveTab === "mobDetail" ? (
              <TokenDetail payload={currentMarket} />
            ) : (
              <>
                {" "}
                <div className="ExchangeTrade_div2_cont2_mobile_depth">
                  <MarketDepth current={currentMarket} />
                </div>
                <MobileOrderBook
                  current={currentMarket}
                  onPriceUpdate={handlePriceUpdate}
                />
              </>
            )}
          </>
        </div>
        <div className="ExchangeTrade_div2_cont2">
          <DesktopOrderBook
            current={currentMarket}
            onPriceUpdate={handlePriceUpdate}
          />
        </div>
        <div className="ExchangeTrade_div2_cont3">
          <BuySell
            payload={currentMarket}
            activeBtn={activeBtn}
            toggleActiveBtn={toggleActiveBtn}
            marketPrice={
              priceUpdate == 0
                ? parseFloat(
                    trades.find((obj) => obj.ticker === currentMarket?.ticker)
                      ?.price || 0
                  ).toFixed(2)
                : priceUpdate
            }
          />
        </div>
      </div>
      <div className="ExchangeTrade_div3">
        <div className="ExchangeTrade_div3_cont1">
          <div className="ExchangeTrade_div2_cont1_header">
            <div className="ExchangeTrade_div2_cont1_header_cont">
              <div
                className={
                  activeTxTab === "position"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTxTab("position");
                }}
              >
                Positions
              </div>
              <div
                className={
                  activeTxTab === "order"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTxTab("order");
                }}
              >
                Orders
              </div>
              <div
                className={
                  activeTxTab === "trades"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTxTab("trades");
                }}
              >
                Trades
              </div>
            </div>
          </div>
          <div className="ExchangeTrade_div2_cont1_body">
            {activeTxTab === "position" && (
              <OpenOrders
                ticker={currentMarket?.ticker}
                ticker_img={currentMarket?.img}
              />
            )}
            {activeTxTab === "order" && (
              <Orders
                ticker={currentMarket?.ticker}
                ticker_img={currentMarket?.img}
              />
            )}
            {activeTxTab === "trades" && (
              <Trades
                ticker={currentMarket?.ticker}
                ticker_img={currentMarket?.img}
              />
            )}
          </div>
        </div>
        <div className="ExchangeTrade_div3_cont2">
          <div className="ExchangeTrade_div3_cont2_title">Account</div>
          <div className="ExchangeTrade_div3_cont2_conts">
            <div className="ExchangeTrade_div3_cont2_conts_div1">
              <div className="ExchangeTrade_div3_cont2_conts_div1_txt">
                {currentMarket?.ticker.split("-")[0]} Bal{" "}
                <InformationCircleIcon className="ExchangeTrade_div3_cont2_conts_div1_txt_icon" />
              </div>
              <div className="ExchangeTrade_div3_cont2_conts_div1_para">
                ${tickerABal}
              </div>
            </div>
            <div className="ExchangeTrade_div3_cont2_conts_div1">
              <div className="ExchangeTrade_div3_cont2_conts_div1_txt">
                {currentMarket?.ticker.split("-")[1]} Bal{" "}
                <InformationCircleIcon className="ExchangeTrade_div3_cont2_conts_div1_txt_icon" />
              </div>
              <div className="ExchangeTrade_div3_cont2_conts_div1_para">
                ${tickerBBal}
              </div>
            </div>
            <div className="ExchangeTrade_div3_cont2_conts_div1">
              <div className="ExchangeTrade_div3_cont2_conts_div1_txt">
                Total Bal{" "}
                <InformationCircleIcon className="ExchangeTrade_div3_cont2_conts_div1_txt_icon" />
              </div>
              <div className="ExchangeTrade_div3_cont2_conts_div1_para">
                ${totalBalance}
              </div>
            </div>
          </div>
          <div className="ExchangeTrade_div3_cont2_conts_button">
            <button
              onClick={openDepositModal}
              className="ExchangeTrade_div3_cont2_conts_button_1"
            >
              Deposit
            </button>
            <button
              onClick={openWithdrawModal}
              className="ExchangeTrade_div3_cont2_conts_button_1"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div className="mobileBuySellBtnsDiv">
        <button
          className="mobileBuySellBtnsDiv_buy"
          onClick={() => {
            openMobBuySellModal();
            setActiveBtn("buy");
          }}
        >
          Buy
        </button>
        <button
          className="mobileBuySellBtnsDiv_sell"
          onClick={() => {
            openMobBuySellModal();
            setActiveBtn("sell");
          }}
        >
          Sell
        </button>
      </div>
      <Modal isOpen={deposit} title={"Deposit"} closeModal={closeDepositModal}>
        <Deposit symbol={splitTicker[0]} />
      </Modal>
      <Modal
        isOpen={withdraw}
        title={"Withdraw"}
        closeModal={closeWithdrawModal}
      >
        <Withdraw symbol={splitTicker[0]} />
      </Modal>
      <CustomBottomSheet
        isOpen={marketsDropMobile}
        content="fullHeight"
        title={"All Markets"}
        closeModal={toggleMarketsDropDownMobile}
      >
        <div className="mobile_markets_drop">
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
                  <div
                    className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1"
                    onClick={() => {
                      navigate("/app/trade/spot/" + market?.ticker);
                      setMarketsDropMobile(false);
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
                          $ {numberWithCommas(parseFloat(market?.volume24h))}
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
                        {numberWithCommas(parseFloat(market?.close24h || 0))}
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
                          parseFloat(market?.change24h || 0) || 0
                        )}
                        %
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CustomBottomSheet>
      <CustomBottomSheet
        isOpen={mobBuySellModal}
        content="fullHeight"
        title={currentMarket?.ticker}
        closeModal={closeMobBuySellModal}
      >
        {" "}
        <div className="mobile_trade_">
          <div className="mobile_trade__div1">
            <div className="mobile_trade__div1_cont1">
              <BuySell
                payload={currentMarket}
                activeBtn={activeBtn}
                toggleActiveBtn={toggleActiveBtn}
                marketPrice={
                  priceUpdate == 0
                    ? parseFloat(
                        trades.find(
                          (obj) => obj.ticker === currentMarket?.ticker
                        )?.price || 0
                      ).toFixed(2)
                    : priceUpdate
                }
              />{" "}
            </div>
            <div className="mobile_trade__div1_cont2">
              <DesktopOrderBook
                current={currentMarket}
                onPriceUpdate={handlePriceUpdate}
              />
            </div>
          </div>
          <div className="mobile_trade__div2">
            <div className="ExchangeTrade_div2_cont1_header_mobile">
              <div
                className={
                  activeTxTab === "position"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTxTab("position");
                }}
              >
                Positions
              </div>
              <div
                className={
                  activeTxTab === "order"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTxTab("order");
                }}
              >
                Orders
              </div>
              <div
                className={
                  activeTxTab === "trades"
                    ? "ExchangeTrade_div2_cont1_header_cont1"
                    : "ExchangeTrade_div2_cont1_header_cont2"
                }
                onClick={() => {
                  setActiveTxTab("trades");
                }}
              >
                Trades
              </div>
            </div>
            <div className="ExchangeTrade_div2_cont1_body">
              {activeTxTab === "position" && (
                <OpenOrders ticker={currentMarket?.ticker} />
              )}
              {activeTxTab === "order" && (
                <Orders ticker={currentMarket?.ticker} />
              )}
              {activeTxTab === "trades" && (
                <Trades ticker={currentMarket?.ticker} />
              )}
            </div>
          </div>
        </div>
      </CustomBottomSheet>
    </div>
  );
};

export default ExchangeTrade;
