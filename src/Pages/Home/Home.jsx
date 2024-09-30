import React, { useState, useEffect } from "react";
import "./index.css";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { ALL_24HOUR_STAT } from "../../services/trade.services";
import { numberWithCommas } from "../../assets/js/numberWithCommas";
import { useDispatch, useSelector } from "react-redux";
import formatNumber from "../../assets/js/formatNumber";
import CloseIcon from "@mui/icons-material/Close";

const Home = () => {
  const { tickers } = useSelector((state) => state.pairs);
  const [payload, setPayload] = useState(null);
  const [adModal, setAdModal] = useState(false);

  console.log(tickers);

  const getAll24hourStat = async () => {
    const res = await ALL_24HOUR_STAT();
    console.log(res);
    setPayload(res?.data);
  };
  useEffect(() => {
    getAll24hourStat();
  }, []);

  useEffect(() => {
    setAdModal(true);
  }, []);

  return (
    <div className="homeDiv">
      <section className="homeDiv_section1">
        <div className="container">
          <div className="homeDiv_section1_area">
            <div className="homeDiv_section1_area_1">
              <div className="homeDiv_section1_area_1_tag">
                Built On
                <span className="homeDiv_section1_area_1_tag_span">
                  <img
                    src="/img/egax_logo.png"
                    alt=""
                    className="homeDiv_section1_area_1_tag_span_img"
                  />{" "}
                  Egochain
                </span>
              </div>
              <div className="homeDiv_section1_area_1_title">
                Decentralized Trading <br />
                <span className="homeDiv_section1_area_1_title_span">
                  Reimagined
                </span>{" "}
              </div>
              <div className="homeDiv_section1_area_1_para">
                Capitalize on rising electronics and commodity prices in
                developing countries by trading with low fees, a fast order
                book, and minimal slippage.
              </div>
              <a
                href="/app/trade/spot/ETRI-EGOD"
                className="homeDiv_section1_area_1_btn"
              >
                Trade Now
              </a>
              <div className="homeDiv_section1_area_1_stats">
                <div className="homeDiv_section1_area_1_stats_cont1">
                  <div className="homeDiv_section1_area_1_stats_cont1_title">
                    Markets
                  </div>
                  <div className="homeDiv_section1_area_1_stats_cont1_txt">
                    {tickers?.length}
                  </div>
                </div>
                <div className="homeDiv_section1_area_1_stats_cont1">
                  <div className="homeDiv_section1_area_1_stats_cont1_title">
                    24h Volume
                  </div>
                  <div className="homeDiv_section1_area_1_stats_cont1_txt">
                    $
                    {formatNumber(
                      parseFloat(payload?.allTimeVolume24 || 0).toFixed(2)
                    )}
                  </div>
                </div>
                <div className="homeDiv_section1_area_1_stats_cont1">
                  <div className="homeDiv_section1_area_1_stats_cont1_title">
                    All Time Volume
                  </div>
                  <div className="homeDiv_section1_area_1_stats_cont1_txt">
                    $
                    {formatNumber(
                      parseFloat(payload?.allTimeVolume || 0).toFixed(2)
                    )}
                  </div>
                </div>
                <div className="homeDiv_section1_area_1_stats_cont1">
                  <div className="homeDiv_section1_area_1_stats_cont1_title">
                    All Time Trades
                  </div>
                  <div className="homeDiv_section1_area_1_stats_cont1_txt">
                    {formatNumber(
                      parseFloat(payload?.totalTrade || 0).toFixed(2)
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="homeDiv_section1_area_2">
          <img
            src="/img/hero_section_img.png"
            alt=""
            className="homeDiv_section1_area_2_img"
          />
        </div>
      </section>
      {/* =============== */}
      {/* =============== */}
      {/* =============== */}
      {/* =============== */}
      {/* =============== */}
      <section className="homeDiv_section2">
        <div className="container">
          <div className="homeDiv_section2_area">
            <div className="homeDiv_section2_area_head">
              <div className="homeDiv_section2_area_head_tag">GET STARTED</div>
              <div className="homeDiv_section2_area_head_title">
                Unlock Earnings with Egomart
              </div>
              <div className="homeDiv_section2_area_head_txt">
                Egomart is revolutionizing the market by tokenizing real-world
                properties into NFTs. Here’s how you can benefit.
              </div>
            </div>
            <div className="homeDiv_section2_area2">
              <div className="homeDiv_section2_area2_cont">
                <img
                  src="/img/trading_home_images.svg"
                  alt=""
                  className="homeDiv_section2_area2_cont_img"
                />
                <div className="homeDiv_section2_area2_cont_txt_area">
                  <div className="homeDiv_section2_area2_cont_txt_area_title">
                    Trade Commodities
                  </div>
                  <div className="homeDiv_section2_area2_cont_txt_area_para">
                    Profit by buying commodities at low prices and selling them
                    at higher rates.
                  </div>
                </div>
              </div>
              <div className="homeDiv_section2_area2_cont">
                <img
                  src="/img/trading_home_images2.svg"
                  alt=""
                  className="homeDiv_section2_area2_cont_img"
                />
                <div className="homeDiv_section2_area2_cont_txt_area">
                  <div className="homeDiv_section2_area2_cont_txt_area_title">
                    Use to Earn
                  </div>
                  <div className="homeDiv_section2_area2_cont_txt_area_para">
                    Earn $EGAX by utilizing our products, powered by a
                    distributed ledger.
                  </div>
                </div>
              </div>
              <div className="homeDiv_section2_area2_cont">
                <img
                  src="/img/trading_home_images3.svg"
                  alt=""
                  className="homeDiv_section2_area2_cont_img"
                />
                <div className="homeDiv_section2_area2_cont_txt_area">
                  <div className="homeDiv_section2_area2_cont_txt_area_title">
                    Refer to Earn
                  </div>
                  <div className="homeDiv_section2_area2_cont_txt_area_para">
                    Receive referral bonuses for each active user you bring to
                    the platform.
                  </div>
                </div>
              </div>
              <div className="homeDiv_section2_area2_cont">
                <img
                  src="/img/trading_home_images4.svg"
                  alt=""
                  className="homeDiv_section2_area2_cont_img"
                />
                <div className="homeDiv_section2_area2_cont_txt_area">
                  <div className="homeDiv_section2_area2_cont_txt_area_title">
                    Self-Custody
                  </div>
                  <div className="homeDiv_section2_area2_cont_txt_area_para">
                    Maintain full control of your funds while trading.
                  </div>
                </div>
              </div>
              <div className="homeDiv_section2_area2_cont">
                <img
                  src="/img/trading_home_images5.svg"
                  alt=""
                  className="homeDiv_section2_area2_cont_img"
                />
                <div className="homeDiv_section2_area2_cont_txt_area">
                  <div className="homeDiv_section2_area2_cont_txt_area_title">
                    Fast Onboarding
                  </div>
                  <div className="homeDiv_section2_area2_cont_txt_area_para">
                    Start trading within minutes by logging in with your
                    existing crypto wallet.
                  </div>
                </div>
              </div>
              <div className="homeDiv_section2_area2_cont">
                <img
                  src="/img/trading_home_images6.svg"
                  alt=""
                  className="homeDiv_section2_area2_cont_img"
                />
                <div className="homeDiv_section2_area2_cont_txt_area">
                  <div className="homeDiv_section2_area2_cont_txt_area_title">
                    Governance
                  </div>
                  <div className="homeDiv_section2_area2_cont_txt_area_para">
                    $EGAX holders shape Egochain's future and control Egomart
                    listings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =============== */}
      {/* =============== */}
      {/* =============== */}
      {/* =============== */}
      {/* =============== */}
      <section className="homeDiv_section3">
        <div className="container">
          <div className="homeDiv_section3_area">
            <div className="homeDiv_section2_area_head">
              <div className="homeDiv_section2_area_head_tag">FEATURES</div>
              <div className="homeDiv_section2_area_head_title">
                EgomartX Features
              </div>
              <div className="homeDiv_section2_area_head_txt">
                An entirely new exchange, reimagined at its core.
              </div>
            </div>
            <div className="homeDiv_section3_area2">
              <div className="homeDiv_section3_area2_area1">
                <div className="homeDiv_section3_area2_cont1">
                  <div className="homeDiv_section3_area2_cont1_cont1">
                    <div className="homeDiv_section3_area2_cont1_cont1_txt">
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_title">
                        Accounts Overview
                      </div>
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_para">
                        Access your open positions, trading history, and
                        portfolio in one convenient location for a complete
                        overview of your trading activity.
                      </div>
                    </div>
                  </div>
                  <div className="homeDiv_section3_area2_cont1_cont2">
                    <img
                      src="/img/feautures_img1.png"
                      alt=""
                      className="homeDiv_section3_area2_cont1_cont2_img"
                    />
                  </div>
                </div>
                <div className="homeDiv_section3_area2_cont1">
                  <div className="homeDiv_section3_area2_cont1_cont1">
                    <div className="homeDiv_section3_area2_cont1_cont1_txt">
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_title">
                        Portfolio Management
                      </div>
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_para">
                        Effortlessly manage all your positions through a sleek
                        and intuitive interface. Comprehensive account
                        indicators simplify trading and support effective risk
                        management.
                      </div>
                    </div>
                  </div>
                  <div className="homeDiv_section3_area2_cont1_cont2">
                    <img
                      src="/img/feautures_img2.png"
                      alt=""
                      className="homeDiv_section3_area2_cont1_cont2_img"
                    />
                  </div>
                </div>
              </div>
              <div className="homeDiv_section3_area2_area2">
                <div className="homeDiv_section3_area2_cont1">
                  <div className="homeDiv_section3_area2_cont1_cont1">
                    <div className="homeDiv_section3_area2_cont1_cont1_txt">
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_title">
                        Mobile friendly
                      </div>
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_para">
                        Trade and manage positions on the go with Egomart
                        telegram mini-app . Enjoy the full power and
                        functionality of the desktop experience, right at your
                        fingertips.
                      </div>
                    </div>
                  </div>
                  <div className="homeDiv_section3_area2_cont1_cont2">
                    <img
                      src="/img/mobile_friendly_img.png"
                      alt=""
                      className="homeDiv_section3_area2_cont1_cont2_img"
                    />
                  </div>
                </div>
                <div className="homeDiv_section3_area2_cont1">
                  <div className="homeDiv_section3_area2_cont1_cont1">
                    <div className="homeDiv_section3_area2_cont1_cont1_txt">
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_title">
                        Gas-Free Trading
                      </div>
                      <div className="homeDiv_section3_area2_cont1_cont1_txt_para">
                        Say goodbye to gas fees on Egomart. Experience near-zero
                        gas costs, always.
                      </div>
                    </div>
                  </div>
                  <div className="homeDiv_section3_area2_cont1_cont2">
                    <img
                      src="/img/feautures_img4.png"
                      alt=""
                      className="homeDiv_section3_area2_cont1_cont2_img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* <section className="homeDiv_section4">
        <div className="container">
          <div className="homeDiv_section4_area">
            <div className="homeDiv_section2_area_head">
              <div className="homeDiv_section2_area_head_tag">SPEED</div>
              <div className="homeDiv_section2_area_head_title">
                Lightning fast
              </div>
              <div className="homeDiv_section2_area_head_txt">
                Order matching execution of ~30 milliseconds. Egomart is as
                powerful as your favorite CEX.
              </div>
            </div>
            <div className="homeDiv_section4_area_body">
              <div className="homeDiv_section4_area_body_cont1">
                <div className="homeDiv_section4_area_body_cont1_div"></div>
                <div className="homeDiv_section4_area_body_cont1_txt">
                  Ethereum DEX (13.23s)
                </div>
              </div>
              <div className="homeDiv_section4_area_body_cont1">
                <div className="homeDiv_section4_area_body_cont1_div2"></div>
                <div className="homeDiv_section4_area_body_cont1_txt">
                  L2 DEX (1.31s)
                </div>
              </div>
              <div className="homeDiv_section4_area_body_cont1">
                <div className="homeDiv_section4_area_body_cont1_div3"></div>
                <div className="homeDiv_section4_area_body_cont1_txt">
                  Popular CEX (1-50ms)
                </div>
              </div>
              <div className="homeDiv_section4_area_body_cont1">
                <div className="homeDiv_section4_area_body_cont1_div4"></div>
                <div className="homeDiv_section4_area_body_cont1_txt">
                  <img
                    src="/img/egax_logo.png"
                    alt=""
                    className="homeDiv_section4_area_body_cont1_txt_img"
                  />{" "}
                  Egomart (10-30ms)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      <section className="homeDiv_section5">
        <div className="container">
          <div className="homeDiv_section5_area">
            <div className="homeDiv_section2_area_head">
              <div className="homeDiv_section2_area_head_tag">PAIRS</div>
              <div className="homeDiv_section2_area_head_title">Markets</div>
              <div className="homeDiv_section2_area_head_txt">
                Available markets constantly expanding.
              </div>
            </div>
            <div className="homeDiv_section5_area_body">
              <Marquee className="homeDiv_section5_area_body_cont1">
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
              </Marquee>
              <Marquee
                className="homeDiv_section5_area_body_cont1"
                direction="right"
              >
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
                <div className="homeDiv_section5_area_body_cont1_div">
                  <div className="homeDiv_section5_area_body_cont1_div_1">
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont1">
                      <img
                        src="/img/egax_logo.png"
                        alt=""
                        className="homeDiv_section5_area_body_cont1_div_1_img"
                      />
                      <div className="homeDiv_section5_area_body_cont1_div_1_cont_area">
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_title">
                          EGAX
                        </div>
                        <div className="homeDiv_section5_area_body_cont1_div_1_cont_area_para">
                          EGAX-EGOD
                        </div>
                      </div>
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_1_cont2">
                      $1,000.00
                    </div>
                  </div>
                  <div className="homeDiv_section5_area_body_cont1_div_2">
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        change
                      </span>{" "}
                      -6%
                    </div>
                    <div className="homeDiv_section5_area_body_cont1_div_2_cont1">
                      <span className="homeDiv_section5_area_body_cont1_div_2_cont1_span">
                        volume
                      </span>{" "}
                      $20.00M
                    </div>
                  </div>
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </section>
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      <section className="homeDiv_section6" id="faq">
        <div className="container">
          <div className="homeDiv_section6_area">
            <div className="homeDiv_section2_area_head">
              <div className="homeDiv_section2_area_head_tag">FAQ</div>
              <div className="homeDiv_section2_area_head_title">
                Frequently Asked Questions
              </div>
              <div className="homeDiv_section2_area_head_txt">
                Why should control mean slow & complex?
              </div>
            </div>
            <div className="homeDiv_section6_area_body">
              <details className="newHome_div_section7_area_body_accordion_body">
                <summary className="baccordion_title">
                  What is tokenization?
                </summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    Tokenization is the process of converting rights to an asset
                    into a digital token on a blockchain. This allows for the
                    secure, transparent, and decentralized ownership and
                    transfer of assets.
                  </div>
                </div>
              </details>
              <details className="newHome_div_section7_area_body_accordion_body">
                <summary className="baccordion_title">What is EGAX?</summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    $EGAX Coin is the native utility token of the Egochain
                    blockchain, serving a crucial role within the Egochain
                    ecosystem. Holders of $EGAX can utilize the token to access
                    the Egochain suite, settle transactions on the network, and
                    participate in governance through voting. Additionally, on
                    the Egochain, $EGAX can be used to mint EgoUSD. This enables
                    users to acquire Egoras physical products and gain
                    fractional ownership of tokenized assets. Alternatively,
                    users may stake their $EGAX with validators to help secure
                    the Egochain network.
                  </div>
                </div>
              </details>
              <details className="newHome_div_section7_area_body_accordion_body">
                <summary className="baccordion_title">What is EgoUSD?</summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    EgoUSD is Egoras’s premier stablecoin, built on the
                    Egochain. It is the second most significant product in the
                    Egochain ecosystem and is crucial to the success of the
                    Egomart platform. In essence, EgoUSD will serve as the
                    backbone of the Egomart ecosystem. All EgoUSD tokens will be
                    distributed to bonders for their necessary needs and
                    actions.
                  </div>
                </div>
              </details>
              <details className="newHome_div_section7_area_body_accordion_body">
                <summary className="baccordion_title">
                  What is the total Supply of $EGAX?
                </summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    The total supply of Egochain Coin is fixed at 10,000,000
                    $EGAX (ten million) to ensure scarcity. The tokens will be
                    released in vested phases and will be fully vested over a
                    period of 20 years.
                  </div>
                </div>
              </details>
              <details className="newHome_div_section7_area_body_accordion_body">
                <summary className="baccordion_title">
                  What Tokenized Assets Can Be Traded on Egomart?
                </summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    On Egomart, tokenized assets represent ownership of
                    real-world assets (RWAs) such as real estate, physical
                    properties, artwork, collectibles, and other valuable items.
                    Through our Egochain blockchain, Egomart offers a unique and
                    tamper-proof method of verifying ownership of these assets,
                    facilitating easier, decentralized, and transparent buying,
                    selling, and trading.
                  </div>
                </div>
              </details>
              <details className="newHome_div_section7_area_body_accordion_body">
                <summary className="baccordion_title">
                  Who Built Egochain?
                </summary>
                <div className="accordion_body">
                  <div className="accordion_body_cont1">
                    Egochain was developed by Egoras, a clean-tech pioneer with
                    over 400 employees. Founded in 2018, Egoras aims to drive a
                    large-scale shift towards sustainable energy in emerging
                    markets.
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      <section className="newHome_div_section8">
        <div className="container">
          <div className="newHome_div_section8_area">
            <div className="newHome_div_section8_area_imgs">
              <img
                src="/img/avatar_group.png"
                alt=""
                className="newHome_div_section8_area_imgs_img"
              />
            </div>
            <div className="newHome_div_section8_area_title">
              Still have questions?
            </div>
            <div className="newHome_div_section8_area_para">
              Can’t find the answer you’re looking for? Please chat to our
              friendly team.
            </div>
            <a
              href="mailto:support@egoras.com"
              // className="footerDiv1_area2_title_subLinks_div_link1"
              target="_blank"
            >
              <button className="newHome_div_section8_area_btn">
                Get in Touch
              </button>
            </a>
          </div>
        </div>
      </section>
      {adModal ? (
        <div className="adModal">
          <div className="adModal_div_cont">
            <div className="adModal_div_cont_title">New Listing</div>
            <div className="adModal_div_cont_img_cont">
              <CloseIcon
                className="adModal_div_cont_img_cont_icon"
                onClick={() => {
                  setAdModal(false);
                }}
              />
              <img
                src="/img/adBanner1.png"
                alt=""
                className="adModal_div_cont_img"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
