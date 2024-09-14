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
import { useNavigate, useParams } from "react-router-dom";
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
import { updateTicker } from "../../../features/PairsSlice";
import { _priceChangeStyling } from "../../../helpers/helper";

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
  const [currentMarket, setCurrentMarket] = useState(tickers[0]);
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [mobBuySellModal, setMobBuySellModal] = useState(false);
  const [activeBtn, setActiveBtn] = useState("buy");
  console.log(ticker);

  const splitTicker = ticker.split("-");
  console.log(splitTicker[0]);

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

  const get24hr = async () => {
    if (!ticker) {
      return;
    }

    const res = await GET_24_HOUR_VOLUME(ticker);
    console.log(res, "24hr volume ");

    if (!res.success) return {};

    let _open24 = res.dailyStats?.openPrice || 0;
    let _close24 = res.dailyStats?.closePrice || 0;
    let _volume24h = res.dailyStats?.volume || 0;
    let _lowPrice24h = res.dailyStats?.lowPrice || 0;
    let _high24 = res.dailyStats?.highPrice || 0;
    // let _change24h =( (closingPrice  - openPrice )/  openprice  ) *100
    let _change24h = (_close24 - _open24) / _open24;
    // let _change24h = ((_close24 - _open24) / _open24) * 100;
    console.log(_change24h, _open24, _close24, "slsasmsm");

    const payload = {
      open24h: _open24,
      close24h: res.dailyStats.closePrice || 0,
      volume24h: res.dailyStats.volume || 0,
      lowPrice24h: res.dailyStats.lowPrice || 0,
      highPrice24h: res.dailyStats.highPrice || 0,
      change24h: _change24h,
    };

    dispatch(updateTicker({ pair: ticker, data: payload }));

    return res;
  };
  // const {
  //   data,
  //   isPending: pending,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["24hour"],
  //   queryFn: get24hr,
  // });

  useEffect(() => {
    get24hr();
    console.log("refreshing...");
  }, [trades, currentMarket]);
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
    toggleMarketsDropDown();
  };

  const fetchTicker = async () => {
    if (ticker) {
      let currMarket = tickers.filter((tick) => tick.pair === ticker)[0];
      SetCurrentMarketFunc(currMarket);
    } else {
      SetCurrentMarketFunc(tickers[0]);
    }
  };
  useEffect(() => {
    fetchTicker();
  }, [currentMarket, ticker]);

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
                  {currentMarket?.pair}
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
                      <div
                        className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1"
                        onClick={() => {
                          navigate("/app/trade/spot/" + market?.pair);
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
                              {market.pair}
                            </div>
                            <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_vol">
                              $ {parseFloat(market?.volume24h)}
                            </div>
                          </div>
                        </div>
                        <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2">
                          <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_price">
                            {/* {parseFloat(market.change24h) || 0}ss */}
                            {parseFloat(market?.close24h || 0)}
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
                            {market?.open24h < market?.close24h && "+"}
                            {parseFloat(market?.change24h).toFixed(2) || 0}%
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
                style={{ color: _priceChangeStyling({ pair: currentMarket }) }}
              >
                {" "}
                {parseFloat(currentMarket?.open24h) <
                parseFloat(currentMarket?.close24h) ? (
                  <ArrowUp01Icon
                    size={14}
                    className="ExchangeTrade_div1_cont2_cont1_cont1_span1_icon"
                  />
                ) : (
                  <ArrowDown01Icon
                    size={14}
                    className="ExchangeTrade_div1_cont2_cont1_cont1_span1_icon"
                  />
                )}
                {parseFloat(
                  trades.find((obj) => obj.ticker === currentMarket?.pair)
                    ?.price
                ).toFixed(2) || 0}{" "}
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont1_span2
              "
              >
                ≈${" "}
                {parseFloat(
                  trades.find((obj) => obj.ticker === currentMarket?.pair)
                    ?.price
                ).toFixed(2) || 0}
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
                {parseFloat(currentMarket?.open24h) <
                  parseFloat(currentMarket?.close24h) && "+"}
                {parseFloat(currentMarket?.change24h).toFixed(2) || 0}%
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
                {parseFloat(currentMarket?.highPrice24h).toFixed(2) || 0}
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
                {parseFloat(currentMarket?.lowPrice24h).toFixed(2) || 0}
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
                ${parseFloat(currentMarket?.volume24h || 0)}
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
              {currentMarket?.pair}
            </div>
            {marketsDropMobile ? (
              <ArrowUp01Icon className="ExchangeTrade_div1_cont1_div2_icon" />
            ) : (
              <ArrowDown01Icon className="ExchangeTrade_div1_cont1_div2_icon" />
            )}
          </div>
          <div className="ExchangeTrade_div1_mobile_div1_price">
            {parseInt(currentMarket?.open24h)}
            <span className="ExchangeTrade_div1_mobile_div1_price_span">
              ≈$0.00{" "}
              <div className="ExchangeTrade_div1_mobile_div1_price_span_change">
                +0.00%
              </div>
            </span>
          </div>
        </div>
        <div className="ExchangeTrade_div1_mobile_div2">
          <div className="ExchangeTrade_div1_mobile_div2_cont1">
            <div className="ExchangeTrade_div1_mobile_div2_cont1_title">
              24h High
            </div>
            <div className="ExchangeTrade_div1_mobile_div2_cont1_para">
              0.00
            </div>
          </div>
          <div className="ExchangeTrade_div1_mobile_div2_cont1">
            <div className="ExchangeTrade_div1_mobile_div2_cont1_title">
              24h Vol (ESTA)
            </div>
            <div className="ExchangeTrade_div1_mobile_div2_cont1_para">
              0.00
            </div>
          </div>
          <div className="ExchangeTrade_div1_mobile_div2_cont1">
            <div className="ExchangeTrade_div1_mobile_div2_cont1_title">
              24h Low
            </div>
            <div className="ExchangeTrade_div1_mobile_div2_cont1_para">
              0.00
            </div>
          </div>
          <div className="ExchangeTrade_div1_mobile_div2_cont1">
            <div className="ExchangeTrade_div1_mobile_div2_cont1_title">
              24h Vol (EGOD)
            </div>
            <div className="ExchangeTrade_div1_mobile_div2_cont1_para">
              0.00
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
              <TradingChart />
            ) : activeTab === "depth" ? (
              <MarketDepth />
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
                  <MarketDepth />
                </div>
                <MobileOrderBook current={currentMarket} />
              </>
            )}
          </>
        </div>
        <div className="ExchangeTrade_div2_cont2">
          <DesktopOrderBook current={currentMarket} />
        </div>
        <div className="ExchangeTrade_div2_cont3">
          <BuySell
            payload={currentMarket}
            activeBtn={activeBtn}
            toggleActiveBtn={toggleActiveBtn}
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
              <OpenOrders ticker={currentMarket?.pair} />
            )}
            {activeTxTab === "order" && <Orders ticker={currentMarket?.pair} />}
            {activeTxTab === "trades" && (
              <Trades ticker={currentMarket?.pair} />
            )}
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
                      navigate("/app/trade/spot/" + market?.pair);
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
                          {market.pair}
                        </div>
                        <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div1_area1_vol">
                          $ {parseFloat(market?.open24h)}
                        </div>
                      </div>
                    </div>
                    <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2">
                      <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_price">
                        {parseFloat(market.change24h)}
                      </div>
                      <div
                        className={
                          market.open24h < market.close24h
                            ? "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent"
                            : "ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_percent_loss"
                        }
                      >
                        {market.open24h < market.close24h ? "+" : "-"}{" "}
                        {parseFloat(market?.change24h) || 0}%
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
        title={currentMarket?.pair}
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
              />{" "}
            </div>
            <div className="mobile_trade__div1_cont2">
              <DesktopOrderBook current={currentMarket} />
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
                <OpenOrders ticker={currentMarket?.pair} />
              )}
              {activeTxTab === "order" && (
                <Orders ticker={currentMarket?.pair} />
              )}
              {activeTxTab === "trades" && (
                <Trades ticker={currentMarket?.pair} />
              )}
            </div>
          </div>
        </div>
      </CustomBottomSheet>
    </div>
  );
};

export default ExchangeTrade;
