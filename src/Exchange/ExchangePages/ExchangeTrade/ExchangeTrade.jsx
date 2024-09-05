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
import { useSelector } from "react-redux";
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

const ExchangeTrade = () => {
  const navigate = useNavigate();
  const { ticker } = useParams();
  const [activeTab, setActiveTab] = useState("price");
  const [mobActiveTab, setMobActiveTab] = useState("mobOrderBook");
  const [activeTxTab, setActiveTxTab] = useState("position");
  const [marketsDrop, setMarketsDrop] = useState(false);
  const { address } = useAccount();
  const { tickers } = useSelector((state) => state.pairs);
  const [currentMarket, setCurrentMarket] = useState(tickers[0]?.open24h);
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

  // const depositFn = async () => {
  //   initiateDeposit({
  //     address: import.meta.env.VITE_CONTRACT_ADDRESS,
  //     abi,
  //     functionName: "deposit",
  //     args: [
  //       "0xae65f10A157d99E35AD81782B86E4C1e6Ec6e78D",
  //       1000000000000000000000,
  //     ],
  //   });
  // };
  const toggleActiveBtn = async (e) => {
    setActiveBtn(e.currentTarget.id);
  };
  const toggleMarketsDropDown = () => {
    setMarketsDrop(!marketsDrop);
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
                              $ {market?.open24h}
                            </div>
                          </div>
                        </div>
                        <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2">
                          <div className="ExchangeTrade_div1_cont1_markets_drop_cont2_body_cont1_div2_price">
                            {market.change24h}
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
                {Number(currentMarket?.open24h)}
              </span>
              <span
                className="ExchangeTrade_div1_cont2_cont1_cont1_span2
              "
              >
                {/* ≈$60,000.00 */}
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
                {currentMarket?.change24h}
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
                ${currentMarket?.volume24h}
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
