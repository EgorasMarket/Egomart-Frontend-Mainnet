import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../../../Components/Modal/Modal";
import {
  TRADE_VOLUME_REWARD,
  CLAIM_REWARD,
  TRADE_VOLUME_LEADERBOARD,
} from "../../../services/earn.service";
import { useAccount } from "wagmi";
import Blockies from "react-blockies";
import formatNumber from "../../../assets/js/formatNumber";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const Earn = () => {
  const { address } = useAccount();
  const [itemsToShow, setItemsToShow] = useState(10);
  const [isLoading2, setIsLoading2] = useState(false);
  const [redeemModal, setRedeemModal] = useState(false);
  const [userReward, setUserReward] = useState(0);
  const [userVolume, setUserVolume] = useState(0);
  const [userAllReward, setUserAllReward] = useState(0);
  const [userAllVolume, setUserAllVolume] = useState(0);
  const [leaderBoardArray, setLeaderBoardArray] = useState([]);

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
    if (res?.data?.userRec.length < 0) {
      setUserReward(0);
      setUserVolume(0);
      setUserAllReward(0);
      setUserAllVolume(0);
      return;
    }
    setUserReward(res?.data?.userRec[0].plt_points);
    setUserVolume(res?.data?.userRec[0].volume);
    setUserAllReward(res?.data?.userRec[0].plt_points);
    setUserAllVolume(res?.data?.userRec[0].totalVolume);
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

  const leaderBoard = async () => {
    const res = await TRADE_VOLUME_LEADERBOARD();
    console.log("====================================");
    console.log(res);
    setLeaderBoardArray(res?.data?.userRec);
    console.log("====================================");
  };

  useEffect(() => {
    leaderBoard();
  }, []);

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
              <div className="earn_div_section1_area2_area">
                <div className="earn_div_section1_area2_area_cont1">
                  <div className="earn_div_section1_area2_area_div1">
                    <div className="earn_div_section1_area2_area_div1_title">
                      Points
                    </div>
                    <div className="earn_div_section1_area2_area_div1_amount">
                      {formatNumber(parseFloat(userReward).toFixed(2))}
                    </div>
                  </div>
                  <div className="earn_div_section1_area2_area_div2">
                    <div className="earn_div_section1_area2_area_div1_title">
                      Volume
                    </div>
                    <div className="earn_div_section1_area2_area_div1_amount">
                      ${formatNumber(parseFloat(userVolume).toFixed(2))}
                    </div>
                  </div>
                </div>
                <div className="earn_div_section1_area2_area_btn_div">
                  <button
                    className="earn_div_section1_area2_area_btn"
                    onClick={ToggleRedeemModal}
                  >
                    Redeem
                  </button>
                </div>
              </div>
              <div className="earn_div_section1_area2_area2">
                <div className="earn_div_section1_area2_area_card1">
                  <div className="earn_div_section1_area2_area_card1_title">
                    All Time Points
                  </div>
                  <div className="earn_div_section1_area2_cont_area">
                    <div className="earn_div_section1_area2_cont_area_1">
                      <div className="earn_div_section1_area2_para">Points</div>
                      <div className="earn_div_section1_area2_amount">
                        {formatNumber(parseFloat(userAllReward).toFixed(2))}
                        <span className="earn_div_section1_area2_amount_span">
                          pts
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="earn_div_section1_area2_area_card1">
                  <div className="earn_div_section1_area2_area_card1_title">
                    All Time Volume
                  </div>
                  <div className="earn_div_section1_area2_cont_area">
                    <div className="earn_div_section1_area2_cont_area_1">
                      <div className="earn_div_section1_area2_para">Volume</div>
                      <div className="earn_div_section1_area2_amount">
                        ${formatNumber(parseFloat(userAllVolume).toFixed(2))}
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
                  Total Points
                </div>
              </div>
              <div className="earn_div_section2_area2_area_body">
                {leaderBoardArray
                  ?.slice(0, itemsToShow)
                  .sort((a, b) => b.plt_points - a.plt_points)
                  .map((data, index) => (
                    <div className="earn_div_section2_area2_area_body_cont1">
                      <div className="earn_div_section2_area2_area_body_cont1_div1">
                        <div className="LeaderBoardDiv_1_body_cont_body_div_cont_first">
                          {index == 0 ? (
                            <MilitaryTechIcon
                              style={{ color: "#e0ac01" }}
                              className="rewardTable_body_row_data_first_icon"
                            />
                          ) : index == 1 ? (
                            <MilitaryTechIcon
                              style={{ color: "#C0C0C0" }}
                              className="rewardTable_body_row_data_first_icon"
                            />
                          ) : index == 2 ? (
                            <MilitaryTechIcon
                              style={{ color: "#CD7F32" }}
                              className="rewardTable_body_row_data_first_icon"
                            />
                          ) : (
                            <MilitaryTechIcon
                              style={{ color: "#6a8179" }}
                              className="rewardTable_body_row_data_first_icon"
                            />
                          )}
                          {index + 1}
                        </div>
                        <Blockies
                          seed={data.wallet_address}
                          size={5}
                          scale={4}
                          className="blockies_icon"
                        />
                        {`${data.wallet_address.slice(
                          0,
                          5
                        )}...${data.wallet_address.slice(37, 40)}`}
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div2">
                        ${formatNumber(parseFloat(data.totalVolume).toFixed(2))}{" "}
                        vol
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div_last">
                        {formatNumber(parseFloat(data.plt_points).toFixed(2))}{" "}
                        pts
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {itemsToShow < leaderBoardArray.length && (
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
            {/* <img
              src="/img/earn_sec3_img.webp"
              alt=""
              className="earn_div_section3_area_img"
            /> */}
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
