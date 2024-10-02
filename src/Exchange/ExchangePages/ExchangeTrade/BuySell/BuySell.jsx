import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingCart01Icon,
  ArrowDown02Icon,
  ArrowUp02Icon,
} from "hugeicons-react";
import { Slider } from "antd";
import { Select } from "antd";
import { ConfigProvider } from "antd";

import {
  useWriteContract,
  useReadContract,
  useAccount,
  useWatchContractEvent,
} from "wagmi";
import contractAbi from "../../../../web3/contracts/Egomart.json";
import "./index.css";
import useFetchBalance from "../../../../hooks/useFetchBalance";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster, toast } from "react-hot-toast";
import {
  _all_prices,
  _buyManager,
  _highestBuyOrder,
  _highestSellOrder,
  _lowestBuyOrder,
} from "../../../../helpers/helper";
import { parseEther } from "viem";
import { parseUnits } from "ethers";

const BuySell = ({ payload, activeBtn, toggleActiveBtn, marketPrice }) => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const {
    data: hash,
    writeContract,
    isPending: loading,
    isError,
    isSuccess,
    error,
  } = useWriteContract();

  const { address } = useAccount();

  const [selectedValue, setSelectedValue] = useState("Limit");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState("");
  const [buyOffersArr, setBuyOffersArr] = useState([]);
  const [balanceOf, setBalance] = useState(0);
  const [total_sum, setTotalSum] = useState(0);
  const [dummyValue, setDummyValue] = useState("");

  const balance = useFetchBalance(
    activeBtn === "buy" ? payload?.tickerB : payload?.tickerA
  );
  useEffect(() => {
    console.log("refreshing");
    // refetch();
  }, [hash]);

  console.log("====================================");
  console.log(payload?.tickerB, payload?.tickerA);
  console.log("====================================");
  // console.log(formatEther(aa), "aa balance");

  const marks = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  };
  useEffect(() => {
    setPrice(marketPrice);
  }, [marketPrice]);

  const handleChange = (value) => {
    setSelectedValue(value);
    console.log(`selected ${value}`);
  };

  console.log("====================================");
  console.log(selectedValue);
  console.log("====================================");

  const sliderChange = (value) => {
    console.log("====================================");
    console.log(value);
    // console.log(value);
    console.log("====================================");

    if (selectedValue === "Limit" && activeBtn === "buy") {
      setTotalSum(
        parseFloat(
          ((value === 100 ? 99.9 : value) / 100) * balance.toFixed()
        ).toFixed(3)
      );
      setAmount(
        parseFloat(
          parseFloat(
            ((value === 100 ? 99.9 : value) / 100 / parseFloat(price)) *
              balance.toFixed()
          )
        ).toFixed(3)
      );
      return;
    }
    setTotalSum(
      parseFloat(
        parseFloat(price) *
          parseFloat(((value === 100 ? 99.9 : value) / 100) * balance.toFixed())
      ).toFixed(3)
    );
    setAmount(
      parseFloat(
        ((value === 100 ? 99.9 : value) / 100) * balance.toFixed()
      ).toFixed(3)
    );
  };

  //total change
  const handleTotalChange = (event) => {
    setTotalSum(event.target.value);
    setAmount(
      parseFloat(parseFloat(event.target.value) / parseFloat(price)).toFixed(3)
    );
  };

  //  price change
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setTotalSum(
      parseFloat(parseFloat(event.target.value) * parseFloat(amount)).toFixed(3)
    );
  };

  //  amount change
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setTotalSum(
      parseFloat(parseFloat(price) * parseFloat(event.target.value)).toFixed(3)
    );
  };

  // calculating the total
  const parsedPrice = parseFloat(price);
  const parsedAmount = parseFloat(amount);
  const Total = parsedPrice * parsedAmount;

  const setOrder = ({ _ticker, _marketType, _address, _price, _amount }) => {
    try {
      if (payload?.meta?.minimum_order_size > Total) {
        toast.error(
          <div className="toast_success_div">
            <div className="toast_error_div_title">Error !!</div>
            <div className="toast_success_div_para">
              {"Minimum order of " +
                payload.meta.minimum_order_size +
                "Egod is required "}
            </div>
          </div>,
          {
            duration: 5000,
            className: "toast_success",
          }
        );
        return;
      }
      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "matchingEngine",
        args: [
          _ticker,
          [
            _marketType,
            _address,
            _price,
            _amount,
            // parseEther(price, "wei").toString(),
            // parseEther(amount, "wei").toString(),
            0,
            0,
          ],
        ],
      });
    } catch (error) {
      console.log(error, "error");
      console.log("====================================");
      console.log("gdgdg");
      console.log("====================================");
    }
  };
  const marketOrder = ({
    _ticker,
    _marketType,
    _address,
    _price,
    _amount,
    arrData = [],
  }) => {
    const marketType = activeBtn === "sell" ? true : false;
    try {
      // const highestSellOrder = _highestSellOrder({
      //   orders: orders,
      //   ticker: payload?.ticker,
      // });

      // console.log(highestSellOrder, _amount, "sese");

      // console.log([
      //   payload?.ticker,
      //   [
      //     marketType,
      //     address,
      //     parseEther(marketManager?.price, "wei"),
      //     marketManager?.price,
      //     // marketType
      //     //   ? parseEther(amount.toString(), "wei").toString()
      //     //   : parseEther(amount.toString(), "wei").toString(),

      //     0,
      //     0,
      //   ],
      //   _all_prices({
      //     orders,
      //     ticker: payload?.ticker,
      //     marketType: marketType ? "BUY" : "SELL",
      //   }),
      // ]);

      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "marketOrderEngine",

        args: [
          _ticker,
          [_marketType, _address, _price, _amount, 0, 0],

          arrData,
        ],
      });
    } catch (error) {
      console.log(error, "error");
      console.log("====================================");
      console.log("gdgdg");
      console.log("====================================");
    }
  };

  // const matchingEngine = async () => {
  //   const marketType = activeBtn === "sell" ? true : false;

  //   const marketManager = _buyManager({
  //     market: marketType ? "SELL" : "BUY",
  //     orders,
  //     ticker: payload?.ticker,
  //   });

  //   let _amount = parseFloat(
  //     amount / parseFloat(marketManager.price)
  //   ).toString();
  //   console.log(marketManager, "marketManager", "activebtn", activeBtn);

  //   // const value = _highestBuyOrder({ orders, ticker: payload?.ticker });

  //   //check if the selected order type is limit or Market Order
  //   if (selectedValue === "market") {
  //     if (activeBtn === "sell") {
  //       alert("hob");
  //       console.log([
  //         payload?.ticker,
  //         [
  //           marketType,
  //           address,
  //           marketManager.price * 1000000000000000000,
  //           amount * 1000000000000000000,
  //           0,
  //           0,
  //         ],
  //         [5000000000000000000, 3000000000000000000],
  //         // _all_prices({
  //         //   orders,
  //         //   ticker: payload?.ticker,
  //         //   marketType: marketType ? "BUY" : "SELL",
  //         // }),
  //       ]);

  //       await marketOrder({
  //         _ticker: payload?.ticker,
  //         _marketType: marketType,
  //         _address: address,

  //         _price: marketManager.price * 1000000000000000000,
  //         _amount: amount * 1000000000000000000,

  //         arrData: [5000000000000000000, 3000000000000000000],
  //         // arrData: [marketManager.price * 1000000000000000000],
  //       });
  //       return;
  //     }
  //     await marketOrder({
  //       _address: address,
  //       _amount: marketType
  //         ? parseEther(amount.toString(), "wei").toString()
  //         : parseEther(_amount.toString(), "wei").toString(),
  //       _marketType: marketType,
  //       _price: parseEther(marketManager?.price, "wei"),
  //       _ticker: payload?.ticker,
  //       arrData: _all_prices({
  //         orders,
  //         ticker: payload?.ticker,
  //         marketType: marketType ? "BUY" : "SELL",
  //       }),
  //     });
  //     // await marketOrder({
  //     //   _address: address,
  //     //   _amount: marketType
  //     //     ? parseEther(amount.toString(), "wei").toString()
  //     //     : parseEther(_amount.toString(), "wei").toString(),
  //     //   _marketType: marketType,
  //     //   _price: parseEther(marketManager?.price, "wei"),
  //     //   _ticker: payload?.ticker,
  //     //   arrData: _all_prices({
  //     //     orders,
  //     //     ticker: payload?.ticker,
  //     //     marketType: marketType ? "BUY" : "SELL",
  //     //   }),

  //     //   // arrData: [
  //     //   //   parseEther(parseFloat(marketManager.price).toFixed(4), "wei"),
  //     //   // ],
  //     // });
  //   }

  //   if (selectedValue === "Limit") {
  //     //check if it 's a buy order

  //     if (activeBtn === "buy") {
  //       //call the lowest sell order
  //       const value = _highestSellOrder({ orders, ticker: payload?.ticker });
  //       if (!value || value === undefined || value === null) {
  //         await setOrder({
  //           _price: parseEther(price, "wei").toString(),
  //           _amount: parseEther(amount, "wei").toString(),
  //           _marketType: marketType,
  //           _ticker: payload?.ticker,
  //           _address: address,
  //         });
  //         return;
  //       }

  //       if (parseFloat(price).toFixed(30) > value.price) {
  //         alert("hohono");
  //         console.log(
  //           value,
  //           "sssssss",
  //           parseEther(parseFloat(value?.price).toFixed(4), "wei")
  //         );

  //         await setOrder({
  //           _price: parseEther(value?.price, "wei").toString(),
  //           _amount: parseEther(amount, "wei").toString(),
  //           _marketType: marketType,
  //           _ticker: payload?.ticker,
  //           _address: address,
  //         });
  //         // await marketOrder({
  //         //   _address: address,
  //         //   _amount: parseEther(amount.toString(), "wei").toString(),
  //         //   _marketType: marketType,
  //         //   _price: parseEther(price.toString(), "wei"),
  //         //   _ticker: payload?.ticker,
  //         //   arrData: [5000000000000000000],
  //         //   // arrData: [parseEther(parseFloat(value?.price).toFixed(4), "wei")],
  //         //   // arrData: [parseEther(value?.price, "wei")],
  //         // });
  //         return;
  //       }

  //       await setOrder({
  //         _price: parseEther(price, "wei").toString(),
  //         _amount: parseEther(amount, "wei").toString(),
  //         _marketType: marketType,
  //         _ticker: payload?.ticker,
  //         _address: address,
  //       });
  //     }

  //     if (activeBtn === "sell") {
  //       // const value = _lowestBuyOrder({ orders, ticker: payload?.ticker });
  //       // if (!value || value === undefined || value === null) {
  //       //   await setOrder({
  //       //     _price: parseEther(price, "wei").toString(),
  //       //     _amount: parseEther(amount, "wei").toString(),
  //       //     _marketType: marketType,
  //       //     _ticker: payload?.ticker,
  //       //     _address: address,
  //       //   });
  //       //   return;
  //       // }

  //       if (parseFloat(price).toFixed(30) < marketManager.price) {
  //         alert("lololo");
  //         console.log(
  //           marketManager.price,
  //           "sssssss",
  //           parseEther(parseFloat(marketManager?.price).toFixed(4), "wei")
  //         );
  //         await setOrder({
  //           _price: parseEther(marketManager?.price, "wei").toString(),
  //           _amount: parseEther(amount, "wei").toString(),
  //           _marketType: marketType,
  //           _ticker: payload?.ticker,
  //           _address: address,
  //         });
  //         return;
  //       }
  //       await setOrder({
  //         _price: parseEther(price, "wei").toString(),
  //         _amount: parseEther(amount, "wei").toString(),
  //         _marketType: marketType,
  //         _ticker: payload?.ticker,
  //         _address: address,
  //       });
  //     }
  //   }
  // };

  const matchingEngine = async () => {
    const marketType = activeBtn === "sell" ? true : false;

    console.log(selectedValue, "lalala");
    try {
      if (selectedValue === "Limit") {
        const marketManager = _buyManager({
          market: marketType ? "SELL" : "BUY",
          orders,
          ticker: payload?.ticker,
        });
        if (activeBtn === "buy" && price > marketManager.price) {
          alert("jibbo");
          return;
        }
        writeContract({
          address: import.meta.env.VITE_CONTRACT_ADDRESS,
          abi: contractAbi,
          functionName: "matchingEngine",
          args: [
            payload?.ticker,
            [
              marketType,
              address,
              price * 1000000000000000000,
              amount * 1000000000000000000,
              0,
              0,
            ],
          ],
        });
        return;
      }
      if (selectedValue === "market") {
        let arr = _all_prices({
          orders,
          ticker: payload?.ticker,
          marketType: marketType ? "BUY" : "SELL",
          targetAmount: amount,
        });
        const marketManager = _buyManager({
          market: marketType ? "SELL" : "BUY",
          orders,
          ticker: payload?.ticker,
        });
        console.log(
          arr,
          activeBtn === "buy"
            ? (amount / marketManager?.price) * 1000000000000000000
            : amount * 1000000000000000000,
          marketType,
          payload?.ticker
        );

        // return;
        writeContract({
          address: import.meta.env.VITE_CONTRACT_ADDRESS,
          abi: contractAbi,
          functionName: "marketOrderTrade",
          args: [
            arr,
            activeBtn === "buy"
              ? (amount / marketManager?.price) * 1000000000000000000
              : amount * 1000000000000000000,
            marketType,
            payload?.ticker,
          ],
          // args: [[5000000000000000000], 1000000000000000, false, "ETRI-EGOD"],
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (error) {
      console.log(hash);
      console.log(error, "error");
      toast.error(
        <div className="toast_success_div">
          <div className="toast_error_div_title">Error!!</div>
          <div className="toast_success_div_para">{error.shortMessage}</div>
        </div>,
        {
          duration: 5000,
          className: "toast_success",
        }
      );
    }
    if (hash) {
      // toast.success(`Order have been placed successfuly!!!`);
      console.log("Order have been placed successfully!!!");
      console.log(hash);
      // toast.success("Order have been placed successfully");
      toast.success(
        <div className="toast_success_div">
          <div className="toast_success_div_title">Order Placed!!</div>
          <div className="toast_success_div_order_cont">
            <div
              className="toast_success_div_order_cont_1_div1"
              style={{ color: activeBtn === "sell" ? "#ff445d" : "#2fe276" }}
            >
              {activeBtn === "sell" ? "Sell" : "Buy"}
            </div>
            <div className="toast_success_div_order_cont_1_div2">{amount}</div>
            <div className="toast_success_div_order_cont_1_div3">
              {price}
              <span className="toast_success_div_order_cont_1_div3_span">
                Egod
              </span>{" "}
            </div>
            <div className="toast_success_div_order_cont_1_div4">Limit</div>
          </div>
        </div>,
        {
          duration: 5000,
          className: "toast_success",
        }
      );
    }
  }, [hash, loading, error]);

  return (
    <div>
      <div className="buy_modal_div_div1_cont1">
        <div className="buy_modal_div_div1_cont1_btns">
          <div
            id="buy"
            className={
              activeBtn === "buy"
                ? "buy_modal_div_div1_cont1_btns_btn1 buy_btn"
                : "buy_modal_div_div1_cont1_btns_btn1_buy"
            }
            onClick={toggleActiveBtn}
          >
            <div className="buy_modal_div_div1_cont1_btns_btn1_Span">Buy</div>
          </div>
          <div
            id="sell"
            className={
              activeBtn === "sell"
                ? "buy_modal_div_div1_cont1_btns_btn1 sell_btn"
                : "buy_modal_div_div1_cont1_btns_btn1_sell"
            }
            onClick={toggleActiveBtn}
          >
            <div className="buy_modal_div_div1_cont1_btns_btn1_Span">Sell</div>
          </div>
        </div>
        <div className="buy_modal_div_div1_cont1_body">
          <div className="buy_modal_div_div1_cont1_body_cont1_head1">
            <div className="buy_modal_div_div1_cont1_body_cont1_head1_txt1">
              Avbl
            </div>
            <div className="buy_modal_div_div1_cont1_body_cont1_head1_txt2">
              {balance.toFixed(4)}
              {activeBtn === "buy"
                ? payload?.ticker?.split("-")[1]
                : payload?.ticker?.split("-")[0]}
            </div>
          </div>
          <div className="buy_modal_div_div1_cont1_body_1">
            {" "}
            <div className="market_select_input_div">
              <Select
                value={selectedValue}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "45px",
                  fontSize: "14px",
                }}
                options={[
                  {
                    value: "Limit",
                    label: "Limit",
                  },
                  {
                    value: "market",
                    label: "Market",
                  },
                ]}
              />
            </div>
            {selectedValue === "market" ? (
              <label
                htmlFor="price"
                className="buy_modal_div_div1_cont1_body_1_label"
              >
                <p className="buy_modal_div_div1_cont1_body_para">
                  <div className="buy_modal_div_div1_cont1_body_para1">
                    Price
                  </div>
                </p>
                <input
                  name="price"
                  id="price"
                  type="text"
                  autocapitalize="off"
                  autocorrect="off"
                  autocomplete="off"
                  spellcheck="false"
                  className="buy_modal_div_div1_cont1_body_1_label_input"
                  value={"Market Price"}
                />
              </label>
            ) : (
              <label
                htmlFor="price"
                className="buy_modal_div_div1_cont1_body_1_label"
              >
                <p className="buy_modal_div_div1_cont1_body_para">
                  <div className="buy_modal_div_div1_cont1_body_para1">
                    Price
                  </div>{" "}
                </p>
                <input
                  name="price"
                  id="price"
                  type="number"
                  autocapitalize="off"
                  autocorrect="off"
                  autocomplete="off"
                  spellcheck="false"
                  className="buy_modal_div_div1_cont1_body_1_label_input"
                  value={price}
                  onChange={handlePriceChange}
                />
              </label>
            )}
            <div className="est_val">
              {/* {selectedValue === "market" ? null : "≈0.00 USD"} */}
            </div>
            <label htmlFor="" className="buy_modal_div_div1_cont1_body_1_label">
              <p className="buy_modal_div_div1_cont1_body_para">
                <div className="buy_modal_div_div1_cont1_body_para1">
                  Amount
                </div>
                <div className="buy_modal_div_div1_cont1_body_para1">
                  {selectedValue === "market" && activeBtn == "buy"
                    ? payload?.ticker?.split("-")[1]
                    : payload?.ticker?.split("-")[0]}{" "}
                </div>
              </p>
              <input
                type="number"
                autocapitalize="off"
                autocorrect="off"
                autocomplete="off"
                spellcheck="false"
                className="buy_modal_div_div1_cont1_body_1_label_input"
                onChange={handleAmountChange}
                value={amount}
              />
            </label>
            <div className="amount_slider">
              <ConfigProvider
                theme={{
                  components: {
                    Slider: {
                      dotActiveBorderColor: "#12b66f",
                      handleActiveColor: "#12b66f",
                      handleActiveOutlineColor: "#12b66f",
                      handleColor: "#12b66f",
                      trackBg: "#12b66f",
                      trackHoverBg: "#12b66f",
                    },
                  },
                }}
              >
                <Slider
                  marks={marks}
                  defaultValue={0}
                  className="amount_slider_input"
                  onChange={sliderChange}
                />
              </ConfigProvider>
            </div>
            {selectedValue === "market" ? null : (
              <label
                htmlFor=""
                className="buy_modal_div_div1_cont1_body_1_label"
              >
                <p className="buy_modal_div_div1_cont1_body_para">
                  <div className="buy_modal_div_div1_cont1_body_para1">
                    Total
                  </div>{" "}
                  <div className="buy_modal_div_div1_cont1_body_para1">
                    {payload?.pair?.split("-")[1]}
                  </div>
                </p>
                <input
                  type="number"
                  autocapitalize="off"
                  autocorrect="off"
                  autocomplete="off"
                  onChange={handleTotalChange}
                  spellcheck="false"
                  className="buy_modal_div_div1_cont1_body_1_label_input"
                  value={total_sum}
                />
              </label>
            )}
          </div>

          <div className="buy_modal_div_div1_cont1_body_button_div">
            {activeBtn === "buy" ? (
              <>
                {selectedValue === "market" ? (
                  <>
                    <button
                      onClick={matchingEngine}
                      // onClick={marketOrder}
                      disabled={loading}
                      className="ProductDetailPage_div_body_div2_div7_btn"
                    >
                      {/* Buy */}
                      {loading ? <ClipLoader color="#fff" size={18} /> : "Buy"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={matchingEngine}
                      disabled={loading}
                      className="ProductDetailPage_div_body_div2_div7_btn"
                    >
                      {loading ? <ClipLoader color="#fff" size={18} /> : "Buy"}
                      {/* {hash && <p> laoding...</p>} */}
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {selectedValue === "market" ? (
                  <button
                    onClick={matchingEngine}
                    disabled={loading}
                    className="ProductDetailPage_div_body_div2_div7_btn_sell"
                  >
                    {/* Sell */}
                    {loading ? <ClipLoader color="#fff" size={18} /> : "Sell"}
                  </button>
                ) : (
                  <button
                    onClick={matchingEngine}
                    disabled={loading}
                    className="ProductDetailPage_div_body_div2_div7_btn_sell"
                  >
                    {loading ? <ClipLoader color="#fff" size={18} /> : "Sell"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster />

      {/* <ToastContainer /> */}
    </div>
  );
};

export default BuySell;
