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
  _highestSellOrder,
} from "../../../../helpers/helper";
import { parseEther } from "viem";
import { parseUnits } from "ethers";
const BuySell = ({ payload, activeBtn, toggleActiveBtn }) => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const {
    data: hash,
    writeContract,
    isPending: loading,
    isError,
    isSuccess,
    error,
    writeContractAsync,
  } = useWriteContract();
  const {
    data: marketHash,
    writeContract: write,
    isPending: marketOrderLoading,
    isError: isMarketOrderError,
    isSuccess: isMarketOrderSuccess,
    error: marketOrderError,
  } = useWriteContract();

  const { address } = useAccount();

  const [selectedValue, setSelectedValue] = useState("Limit");
  const [price, setPrice] = useState("10.00");
  const [amount, setAmount] = useState("");
  const [buyOffersArr, setBuyOffersArr] = useState([]);
  const [balanceOf, setBalance] = useState(0);
  const [total_sum, setTotalSum] = useState(0);

  const aa = useFetchBalance(
    activeBtn === "buy" ? payload?.tickerB : payload?.tickerA
  );

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

  const handleChange = (value) => {
    setSelectedValue(value);
    console.log(`selected ${value}`);
  };

  const sliderChange = (value) => {
    setTotalSum(
      parseFloat(parseFloat(price) * parseFloat((value / 100) * aa)).toFixed(3)
    );
    // setAmount(parseFloat(value).toFixed(3));
    // console.log(aa, "balance");
    setAmount(parseFloat((value / 100) * aa).toFixed(3));
    // setAmount( parseFloat(value).toFixed(3));
  };

  //total change
  const handleTotalChange = (event) => {
    setTotalSum(event.target.value);
    setAmount(parseFloat(event.target.value) / parseFloat(price));
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

  const setOrder = () => {
    const marketType = activeBtn === "sell" ? true : false;
    try {
      if (payload.meta.minimum_order_size > Total) {
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
          payload?.pair,
          [
            marketType,
            address,
            parseEther(price).toString(),
            parseEther(amount).toString(),
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
  const marketOrder = () => {
    const marketType = activeBtn === "sell" ? true : false;
    try {
      const marketManager = _buyManager({
        market: marketType ? "SELL" : "BUY",
        orders,
        ticker: payload?.pair,
      });

      console.log(marketManager, "marketManager");

      // const highestSellOrder = _highestSellOrder({
      //   orders: orders,
      //   ticker: payload?.pair,
      // });

      let _amount = parseFloat(
        amount / parseFloat(marketManager.price)
      ).toString();

      // console.log(highestSellOrder, _amount, "sese");

      console.log([
        payload?.pair,
        [
          marketType,
          address,
          parseEther(marketManager?.price, "wei"),
          marketManager?.price,
          // marketType
          //   ? parseEther(amount.toString(), "wei").toString()
          //   : parseEther(amount.toString(), "wei").toString(),

          0,
          0,
        ],
        _all_prices({
          orders,
          ticker: payload?.pair,
          marketType: marketType ? "BUY" : "SELL",
        }),
      ]);

      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "marketOrderEngine",

        args: [
          payload?.pair,
          [
            marketType,
            address,
            // marketType
            // ? parseEther(price.toString(), "wei")
            parseEther(marketManager.price, "wei"),
            // parseEther(highestSellOrder.price),
            parseEther(amount.toString(), "wei").toString(),

            // marketType
            //   ? parseEther(amount.toString(), "wei").toString()
            //   : parseEther(_amount.toString(), "wei").toString(),
            0,
            0,
          ],
          // _sell_arr,
          _all_prices({
            orders,
            ticker: payload?.pair,
            marketType: marketType ? "BUY" : "SELL",
          }),
        ],
      });
    } catch (error) {
      console.log(error, "error");
      console.log("====================================");
      console.log("gdgdg");
      console.log("====================================");
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
              {aa}
              {activeBtn === "buy"
                ? payload?.pair?.split("-")[1]
                : payload?.pair?.split("-")[0]}
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
                    value: "limit",
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
                  type="number"
                  autocapitalize="off"
                  autocorrect="off"
                  autocomplete="off"
                  spellcheck="false"
                  className="buy_modal_div_div1_cont1_body_1_label_input"
                  value={price}
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
                  {payload?.pair?.split("-")[0]}
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
                  // value={Total}
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
                      onClick={marketOrder}
                      className="ProductDetailPage_div_body_div2_div7_btn"
                    >
                      Buy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={setOrder}
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
                    onClick={marketOrder}
                    className="ProductDetailPage_div_body_div2_div7_btn_sell"
                  >
                    Sell
                    <ClipLoader color="#fff" size={18} />
                  </button>
                ) : (
                  <button
                    onClick={setOrder}
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
