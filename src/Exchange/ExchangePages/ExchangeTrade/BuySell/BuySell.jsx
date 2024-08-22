import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingCart01Icon,
  ArrowDown02Icon,
  ArrowUp02Icon,
} from "hugeicons-react";
import { Slider } from "antd";
import { Select } from "antd";
import { ConfigProvider } from "antd";
import "./index.css";

const BuySell = () => {
  const [selectedValue, setSelectedValue] = useState("Limit");
  const [price, setPrice] = useState("10.00");
  const [amount, setAmount] = useState("");
  const [activeBtn, setActiveBtn] = useState("buy");
  const [buyOffersArr, setBuyOffersArr] = useState([]);

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
    setAmount(parseFloat(value).toFixed(3));
  };

  //  price change
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  //  amount change
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // calculating the total
  const parsedPrice = parseInt(price);
  const parsedAmount = parseInt(amount);
  const Total = parsedPrice * parsedAmount;

  const toggleActiveBtn = (e) => {
    setActiveBtn(e.currentTarget.id);
  };

  return (
    <div>
      {" "}
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
            {" "}
            <div className="buy_modal_div_div1_cont1_btns_btn1_Span">Sell</div>
          </div>
        </div>
        <div className="buy_modal_div_div1_cont1_body">
          <div className="buy_modal_div_div1_cont1_body_cont1_head1">
            <div className="buy_modal_div_div1_cont1_body_cont1_head1_txt1">
              Avbl
            </div>
            <div className="buy_modal_div_div1_cont1_body_cont1_head1_txt2">
              10 USDT
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
                <div className="buy_modal_div_div1_cont1_body_para1">USDT</div>
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
                  <div className="buy_modal_div_div1_cont1_body_para1">BTC</div>{" "}
                </p>
                <input
                  type="number"
                  autocapitalize="off"
                  autocorrect="off"
                  autocomplete="off"
                  spellcheck="false"
                  className="buy_modal_div_div1_cont1_body_1_label_input"
                  value={Total}
                />
              </label>
            )}
          </div>

          <div className="buy_modal_div_div1_cont1_body_button_div">
            {activeBtn === "buy" ? (
              <>
                {selectedValue === "market" ? (
                  <>
                    <button className="ProductDetailPage_div_body_div2_div7_btn">
                      Buy
                    </button>
                  </>
                ) : (
                  <>
                    <button className="ProductDetailPage_div_body_div2_div7_btn">
                      Buy
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                {selectedValue === "market" ? (
                  <button className="ProductDetailPage_div_body_div2_div7_btn_sell">
                    Sell
                  </button>
                ) : (
                  <button className="ProductDetailPage_div_body_div2_div7_btn_sell">
                    Sell
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySell;
