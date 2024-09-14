import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../../../Components/Modal/Modal";
import {
  TRADE_VOLUME_REWARD,
  CLAIM_REWARD,
} from "../../../services/earn.service";
import { useAccount } from "wagmi";

const Earn = () => {
  const { address } = useAccount();
  const [itemsToShow, setItemsToShow] = useState(10);
  const [isLoading2, setIsLoading2] = useState(false);
  const [redeemModal, setRedeemModal] = useState(false);
  const [user24hReward, setUser24hReward] = useState(0);
  const [user24hVolume, setUser24hVolume] = useState(0);

  const referralLeaderBoard = [
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
    {
      id: 0,
      address: "0xa5ff0Fd1a84D004649E97b465779499546654feD",
      Vol24h: "1,000,000",
      Reward24h: "100,000",
      allTimeVol: "10,000,000",
      allTimeReward: "1,000,000",
    },
  ];

  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.scrollBehavior = "smooth"; // Enable smooth scrolling
      container.scrollTop = container.scrollHeight;
      // Disable smooth scrolling after the animation is complete
      container.addEventListener("scroll", () => {
        container.style.scrollBehavior = "auto";
      });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [itemsToShow]);

  const displayNextItems = () => {
    setIsLoading2(true);
    setTimeout(() => {
      setItemsToShow(itemsToShow + 10);
      setIsLoading2(false);
    }, 2000); // Adjust the delay duration as needed (e.g., 1000 milliseconds or 1 second)
  };
  const ToggleRedeemModal = () => {
    setRedeemModal(!redeemModal);
  };

  const fetchUserTradeVolume = async () => {
    const res = await TRADE_VOLUME_REWARD(address);
    console.log("====================================");
    console.log(res, "user Trades");
    if (res?.userRec.length < 0) {
      setUser24hReward(0);
      setUser24hVolume(0);
      return;
    }
    // console.log(res, "user Trades");
    console.log("====================================");
  };

  const claimRewardFunc = async () => {
    const res = await CLAIM_REWARD(address);
    console.log("====================================");
    console.log(res);
    console.log("====================================");
  };

  useEffect(() => {
    if (address) {
      fetchUserTradeVolume();
      return;
    }
  }, [address]);

  return (
    <div className="earn_div">
      <section className="earn_div_section1">
        <div className="earn_div_section1_container">
          <div className="earn_div_section1_area">
            <div className="earn_div_section1_area1">
              <div className="earn_div_section1_area1_cont1">
                <div className="earn_div_section1_area1_cont1_title">
                  EGO404 Trade Mining
                </div>
                <div className="earn_div_section1_area1_cont1_para">
                  Maximize your rewards by engaging in trade mining on the
                  exchange. For every $1,000 in trade volume, you will receive
                  1,000 Apex tokens (1:1 ratio). Don't forget to withdraw your
                  earnings to your on-chain wallet daily, as all earnings reset
                  after 24 hours.
                </div>
              </div>
              <div className="earn_div_section1_area1_cont2">
                <img
                  src="/img/earn_sec_img.webp"
                  alt=""
                  className="earn_div_section1_area1_cont2img"
                />
              </div>
            </div>
            <div className="earn_div_section1_area2">
              <div className="earn_div_section1_area2_area_card1">
                <div className="earn_div_section1_area2_area_card1_title">
                  24h Points
                </div>
                <div className="earn_div_section1_area2_cont_area">
                  <div className="earn_div_section1_area2_cont_area_1">
                    <div className="earn_div_section1_area2_para">Points</div>
                    <div className="earn_div_section1_area2_amount">
                      {parseFloat(user24hReward).toFixed(4)}
                      <span className="earn_div_section1_area2_amount_span">
                        pts
                      </span>{" "}
                    </div>
                  </div>
                </div>
                <div className="earn_div_section1_area2_btns">
                  <button
                    className="earn_div_section1_area2_btns_btn2"
                    onClick={ToggleRedeemModal}
                    disabled={redeemModal}
                  >
                    {redeemModal ? (
                      <>
                        loading <ClipLoader color="#717171" size={10} />
                      </>
                    ) : (
                      <>Redeem</>
                    )}
                  </button>
                </div>
              </div>
              <div className="earn_div_section1_area2_area_card1">
                <div className="earn_div_section1_area2_area_card1_title">
                  24h Volume
                </div>
                <div className="earn_div_section1_area2_cont_area">
                  <div className="earn_div_section1_area2_cont_area_1">
                    <div className="earn_div_section1_area2_para">Volume</div>
                    <div className="earn_div_section1_area2_amount">
                      {parseFloat(user24hVolume).toFixed(4)}
                      <span className="earn_div_section1_area2_amount_span">
                        vol
                      </span>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="earn_div_section1_area2_area_card1">
                <div className="earn_div_section1_area2_area_card1_title">
                  Total Points
                </div>
                <div className="earn_div_section1_area2_cont_area">
                  <div className="earn_div_section1_area2_cont_area_1">
                    <div className="earn_div_section1_area2_para">Points</div>
                    <div className="earn_div_section1_area2_amount">
                      0.00
                      <span className="earn_div_section1_area2_amount_span">
                        pts
                      </span>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="earn_div_section1_area2_area_card1">
                <div className="earn_div_section1_area2_area_card1_title">
                  Total Volume
                </div>
                <div className="earn_div_section1_area2_cont_area">
                  <div className="earn_div_section1_area2_cont_area_1">
                    <div className="earn_div_section1_area2_para">Volume</div>
                    <div className="earn_div_section1_area2_amount">
                      0.00
                      <span className="earn_div_section1_area2_amount_span">
                        vol
                      </span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      <section className="earn_div_section2">
        <div className="earn_div_section2_container">
          <div className="earn_div_section2_area1">
            <div className="earn_div_section2_area1_title">How It Works</div>
            {/* <div className="earn_div_section2_area1_title_span">
              <span className="earn_div_section2_area1_title_span_1">
                {" "}
                <div className="earn_div_section2_area1_title_span_1_div1">
                  1
                </div>
                <div className="earn_div_section2_area1_title_span_1_div2"></div>
              </span>
              <span className="earn_div_section2_area1_title_span_1">
                {" "}
                <div className="earn_div_section2_area1_title_span_1_div1">
                  2
                </div>
                <div className="earn_div_section2_area1_title_span_1_div2"></div>
              </span>
              <span className="earn_div_section2_area1_title_span_2">
                {" "}
                <div className="earn_div_section2_area1_title_span_2_div1">
                  3
                </div>
              </span>
            </div> */}
            <div className="earn_div_section2_area1_area">
              <div className="earn_div_section2_area1_area_1">
                <span className="earn_div_section2_area1_title_span_1">
                  {" "}
                  <div className="earn_div_section2_area1_title_span_1_div2_hidden"></div>
                  <div className="earn_div_section2_area1_title_span_1_div1">
                    1
                  </div>
                  <div className="earn_div_section2_area1_title_span_1_div2"></div>
                </span>
                <div className="earn_div_section2_area1_area_1_body">
                  <div className="earn_div_section2_area1_area_1_title">
                    Connect Wallet
                  </div>
                  <div className="earn_div_section2_area1_area_1_para">
                    Connect Your Wallet Connect any EVM-compatible wallet such
                    as MetaMask or Trust Wallet to get started.
                  </div>
                </div>
              </div>
              <div className="earn_div_section2_area1_area_1">
                <span className="earn_div_section2_area1_title_span_1">
                  {" "}
                  <div className="earn_div_section2_area1_title_span_1_div2"></div>
                  <div className="earn_div_section2_area1_title_span_1_div1">
                    2
                  </div>
                  <div className="earn_div_section2_area1_title_span_1_div2"></div>
                </span>
                <div className="earn_div_section2_area1_area_1_body">
                  <div className="earn_div_section2_area1_area_1_title">
                    NFts
                  </div>
                  <div className="earn_div_section2_area1_area_1_para">
                    Trade NFTs Engage in trading redeemable NFTs on Egomart.
                    Profit from price fluctuations or redeem the physical
                    equivalent of the NFT.
                  </div>
                </div>
              </div>
              <div className="earn_div_section2_area1_area_3">
                <span className="earn_div_section2_area1_title_span_1">
                  {" "}
                  <div className="earn_div_section2_area1_title_span_1_div2"></div>
                  <div className="earn_div_section2_area1_title_span_1_div1">
                    3
                  </div>
                  <div className="earn_div_section2_area1_title_span_1_div2_hidden"></div>
                </span>
                <div className="earn_div_section2_area1_area_1_body">
                  <div className="earn_div_section2_area1_area_1_title">
                    Claim Reward
                  </div>
                  <div className="earn_div_section2_area1_area_1_para">
                    Claim Your Rewards Earn APEX Ego404 tokens at a 1:1 ratio
                    based on your trade volume. Withdraw your rewards within 24
                    hours to secure your earnings.
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          <div className="earn_div_section2_area2">
            <div className="earn_div_section2_area2_title">Leaderboard</div>
            <div className="earn_div_section2_area2_area">
              <div className="earn_div_section2_area2_area_header">
                <div className="earn_div_section2_area2_area_header_cont1">
                  User
                </div>
                <div className="earn_div_section2_area2_area_header_cont2">
                  Total Volume
                </div>
                <div className="earn_div_section2_area2_area_header_cont3">
                  Egax Rewards
                </div>
                <div className="earn_div_section2_area2_area_header_cont3">
                  Plt Rewards
                </div>
              </div>
              <div className="earn_div_section2_area2_area_body">
                {referralLeaderBoard
                  .slice(0, itemsToShow)
                  .sort((a, b) => b.points - a.points)
                  .map((data, index) => (
                    <div className="earn_div_section2_area2_area_body_cont1">
                      <div className="earn_div_section2_area2_area_body_cont1_div1">
                        <span className="earn_div_section2_area2_area_body_cont1_div1_position">
                          1st
                        </span>{" "}
                        @0x3de...5634
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div2">
                        100,000 Egod
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div_last">
                        100 egax
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div_last">
                        100,000 plt
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {itemsToShow < referralLeaderBoard.length && (
              <button
                className="depositDiv_cont4_btn"
                onClick={displayNextItems}
                disabled={isLoading2 ? true : false}
              >
                {isLoading2 ? (
                  <ClipLoader color="#6ba28b" size={18} />
                ) : (
                  "  Load More"
                )}
              </button>
            )}
          </div>
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          {/* ====== */}
          <div className="earn_div_section2_area3">
            <div className="homeDiv_section2_area_head">
              {/* <div className="homeDiv_section2_area_head_tag">FAQ</div> */}
              <div className="homeDiv_section2_area_head_title">
                Frequently Asked Questions
              </div>
              {/* <div className="homeDiv_section2_area_head_txt">
                Why should control mean slow & complex?
              </div> */}
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
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      {/* ==== */}
      <section className="earn_div_section3">
        <div className="earn_div_section3_container">
          <div className="earn_div_section3_area">
            <img
              src="/img/earn_sec3_img.webp"
              alt=""
              className="earn_div_section3_area_img"
            />
            <div className="earn_div_section3_area_title">
              Join the new Ethereum ecosystem. Be a part of crypto history.
            </div>
            <div className="earn_div_section3_area_btn_div">
              <button className="earn_div_section3_area_btn">Earn Now</button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={redeemModal}
        closeModal={ToggleRedeemModal}
        title={"Redeem"}
      >
        <div className="redeemModal_div">
          <div className="redeemModal_div_1">
            <div className="redeemModal_div_1_title">Available to claim</div>
            <div className="redeemModal_div_1_body">
              <div className="redeemModal_div_1_body_cont1">
                <img
                  src="/img/pluto_swap_icon.png"
                  alt=""
                  className="redeemModal_div_1_body_cont1_img"
                />
                pts
              </div>
              <div className="redeemModal_div_1_body_cont2">100,000</div>
            </div>
          </div>
          <div className="redeemModal_div_1">
            <div className="redeemModal_div_1_title">Available to claim</div>
            <div className="redeemModal_div_1_body">
              <div className="redeemModal_div_1_body_cont1">
                <img
                  src="/img/egax_logo.png"
                  alt=""
                  className="redeemModal_div_1_body_cont1_img"
                />
                Apex
              </div>
              <div className="redeemModal_div_1_body_cont2">100,000</div>
            </div>
          </div>
          <div className="redeemModal_div_1">
            <div className="redeemModal_div_1_title">Destination Wallet</div>
            <div className="redeemModal_div_1_body">
              <div
                className="redeemModal_div_1_body_cont2_input
              "
              >
                0xa5ff0Fd1a84D004649E97b465779499546654feD
              </div>
            </div>
          </div>

          <button
            className="depositDiv_cont4_btn"
            onClick={claimRewardFunc}
            // disabled={isLoading2 ? true : false}
          >
            Claim Rewards
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Earn;
