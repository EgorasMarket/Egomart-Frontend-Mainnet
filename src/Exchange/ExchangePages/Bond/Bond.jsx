import React, { useState, useEffect, useRef } from "react";
import "./bond.css";
import {
  Cancel01Icon,
  Link03Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import JoinLeftSharpIcon from "@mui/icons-material/JoinLeftSharp";
import WhatshotSharpIcon from "@mui/icons-material/WhatshotSharp";
import TollIcon from "@mui/icons-material/Toll";
import abi from "./bondAbi.json";
import { BONDING_DATA } from "../../../services/earn.service";
import Blockies from "react-blockies";
// import { numberWithCommas } from "../../../assets/js/numberWithCommas";
// import ComponentLoaderLogin from "../../../Components/ComponentLoaderLogin/ComponentLoaderLogin";
// import ErrorModal from "../../../Components/SuccessErrorModals/ErrorModal";
// import SuccessModal from "../../../Components/SuccessErrorModals/SuccessModal";
import { useNavigate } from "react-router-dom";
import { Wallet02Icon } from "hugeicons-react";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import formatNumber from "../../../assets/js/formatNumber";
import {
  useWriteContract,
  useReadContract,
  useAccount,
  useWatchContractEvent,
} from "wagmi";
import { ethers, formatEther, parseEther } from "ethers";
import { Toaster, toast } from "react-hot-toast";
import { format } from "date-fns";

const Bond = () => {
  const [amount, setAmount] = useState("");
  const [egodAmount, setEgodAmount] = useState("");
  const [itemsToShow, setItemsToShow] = useState(10);
  const [isLoading2, setIsLoading2] = useState(false);
  const [bondData, setBondData] = useState({});
  const containerRef = useRef(null);

  const {
    data: hash,
    writeContract,
    isPending: loading,
    isError,
    isSuccess,
    error: error,
    writeContractAsync,
  } = useWriteContract();

  const bond = async () => {
    try {
      writeContract({
        address: "0xc3fAA61ddad7Db6392c9A6efa41EC5c4AB3d64BE",
        abi: abi,
        functionName: "bond",
        value: (amount.toString() * "1000000000000000000").toString(),
      });
    } catch (error) {
      console.log(error, "error");
      console.log("====================================");
      console.log("gdgdg");
      console.log("====================================");
    }
  };

  const changeAmount = (e) => {
    setAmount(e.target.value);
    setEgodAmount(parseFloat(e.target.value) * Number(1000));
  };

  const changeEgodAmount = (e) => {
    setEgodAmount(e.target.value);
    setAmount(parseFloat(e.target.value) / Number(1000));
  };

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
  console.log("====================================");
  console.log((amount.toString() * "1000000000000000000").toString());
  console.log("====================================");

  useEffect(() => {
    if (isSuccess === true) {
      toast.success(
        <div className="toast_success_div">
          <div className="toast_success_div_title">Successful bonding!!</div>
          <div className="toast_success_div_para">
            {`You've successfully bonded${amount}egax to ${egodAmount}egod !!!`}
          </div>
        </div>,
        {
          duration: 5000,
          className: "toast_success",
        }
      );
      return;
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError === true) {
      toast.error(
        <div className="toast_success_div">
          <div className="toast_error_div_title">Error bonding!!</div>
          <div className="toast_success_div_para">{error.shortMessage}</div>
        </div>,
        {
          duration: 5000,
          className: "toast_success",
        }
      );
      return;
    }
  }, [isError]);

  const getBondData = async () => {
    const res = await BONDING_DATA();
    console.log("====================================");
    console.log(res);
    setBondData(res.data[0]);
    console.log("====================================");
  };
  useEffect(() => {
    getBondData();
  }, []);
  console.log("====================================");
  console.log(bondData);
  console.log("====================================");
  return (
    <div className="bond_comp">
      <div className="bond_comp_div1">
        <div className="bond_comp_title">Bond Egax</div>
        <div className="bond_comp_para">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          adipisci quibusdam corrupti consequuntur perspiciatis molestiae.
        </div>
        <div className="bond_comp_div1_cont">
          <div className="bond_comp_div1_cont_card">
            <JoinLeftSharpIcon />
            <div className="bond_comp_div1_cont_card_title">
              Total Bonds 24h
            </div>
            <div className="bond_comp_div1_cont_card_content">
              {parseFloat(bondData?.totalBond24h || 0)}
            </div>
          </div>
          <div className="bond_comp_div1_cont_card">
            <JoinLeftSharpIcon />
            <div className="bond_comp_div1_cont_card_title">All time bond</div>
            <div className="bond_comp_div1_cont_card_content">
              {bondData?.allTransactions?.length || 0}
            </div>
          </div>
          <div className="bond_comp_div1_cont_card">
            <WhatshotSharpIcon />
            <div className="bond_comp_div1_cont_card_title">
              Total Egax Burnt
            </div>
            <div className="bond_comp_div1_cont_card_content">
              {formatNumber(parseFloat(bondData?.totalEgaxBond || 0))}
            </div>
          </div>
          <div className="bond_comp_div1_cont_card">
            <TollIcon />
            <div className="bond_comp_div1_cont_card_title">
              Total Egod Minted
            </div>
            <div className="bond_comp_div1_cont_card_content">
              {formatNumber(parseFloat(bondData?.totalEgodBond || 0))}
            </div>
          </div>
        </div>
      </div>
      <div className="bond_comp_div2">
        <div className="bond_body">
          <div className="bond_body_div1">
            <div className="bond_body_div1_cont1">
              <img
                src="/img/egax_logo.png"
                alt=""
                className="bond_body_div1_cont1_img"
              />
              EGAX
            </div>
            <div className="bond_body_div1_cont2">
              <div className="bond_body_div1_cont1_title">
                You Burn{" "}
                <div className="bond_body_div1_cont1_title_balance">
                  {" "}
                  <span style={{ marginRight: "3px", display: "flex" }}>
                    <Wallet02Icon size={12} /> :{" "}
                  </span>
                  {numberWithCommas(parseFloat(1000).toFixed(4))}
                </div>
              </div>
              {/* <div className="bond_body_div1_cont1_amount">100,000</div> */}
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                className="bond_body_div1_cont1_amount"
                value={amount}
                onChange={changeAmount}
              />
            </div>
          </div>
          <div className="bond_body_div2">
            <div className="bond_body_div2_cont1">
              <img
                src="/img/bond_icon1.svg"
                alt=""
                className="bond_body_div2_cont1_img"
              />
              <div className="bond_body_div2_cont1_txt">1EGAX = {10}EGOD</div>
            </div>
            <div className="bond_body_div2_cont1">
              <img
                src="/img/bond_icon1.svg"
                alt=""
                className="bond_body_div2_cont1_img"
              />
              <div className="bond_body_div2_cont1_txt">1EGOD = 1USD</div>
            </div>
            {/* <div className="bond_body_div2_cont1">
            <img
              src="/img/bond_icon2.svg"
              alt=""
              className="bond_body_div2_cont1_img"
            />
            <div className="bond_body_div2_cont1_txt">Fee = $0.00</div>
          </div> */}
            <div className="bond_body_div2_cont1">
              <img
                src="/img/bond_icon3.svg"
                alt=""
                className="bond_body_div2_cont1_img"
              />
              <div className="bond_body_div2_cont1_txt">Instant</div>
            </div>
          </div>
          <div className="bond_body_div1">
            <div className="bond_body_div1_cont1">
              <img
                src="/egomart_logo.png"
                alt=""
                className="bond_body_div1_cont1_img"
              />
              EGOD
            </div>
            <div className="bond_body_div1_cont2">
              <div className="bond_body_div1_cont1_title">
                You Mint{" "}
                <div className="bond_body_div1_cont1_title_balance">
                  {" "}
                  <span style={{ marginRight: "3px", display: "flex" }}>
                    <Wallet02Icon size={12} /> :{" "}
                  </span>
                  {numberWithCommas(parseFloat(1000).toFixed(4))}
                </div>
              </div>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                className="bond_body_div1_cont1_amount"
                onChange={changeEgodAmount}
                value={egodAmount}
              />
            </div>
          </div>
          <div className="detail_div">
            <div className="TokenListDetailBody_warning_div">
              <InformationCircleIcon size={15} />
              <div className="TokenListDetailBody_warning_div_span">
                Your EGAX will be <b> burnt </b> and the equivalent will be
                minted in EGOD and sent to your wallet.
              </div>
            </div>
          </div>
          <button
            className="depositDiv_cont4_btn"
            onClick={bond}
            disabled={loading ? true : false}
          >
            {loading ? (
              <>
                {" "}
                bonding <ClipLoader color="#6ba28b" size={18} />{" "}
              </>
            ) : (
              " bond"
            )}
          </button>
        </div>
      </div>
      <div className="bond_comp_div3">
        <div className="bond_comp_div3_cont1">
          <div className="bond_comp_title">
            Transactions{" "}
            <span className="bond_comp_title_span">
              {" "}
              {bondData?.allTransactions?.length}txn(s)
            </span>
          </div>
          <div className="earn_div_section2_area2_area">
            <div className="earn_div_section2_area2_area_header">
              <div className="earn_div_section2_area2_area_header_cont1">
                User
              </div>
              <div className="earn_div_section2_area2_area_header_cont2">
                Egax Burnt
              </div>
              <div className="earn_div_section2_area2_area_header_cont2">
                Egod Minted
              </div>
              <div className="earn_div_section2_area2_area_header_cont2">
                Time
              </div>
              <div className="earn_div_section2_area2_area_header_cont3">
                Tx hash
              </div>
            </div>
            <div className="earn_div_section2_area2_area_body">
              {bondData?.allTransactions
                ?.slice(0, itemsToShow)
                .sort((a, b) => b.points - a.points)
                .map((data, index) => {
                  function formatDate(dateString) {
                    const date = new Date(dateString);

                    return format(date, "MMM do, yyyy / h:mm aaa");
                  }
                  return (
                    <div className="earn_div_section2_area2_area_body_cont1">
                      <div className="earn_div_section2_area2_area_body_cont1_div1">
                        <Blockies
                          seed={data.bonder}
                          size={5}
                          scale={4}
                          className="blockies_icon"
                        />
                        {`${data.bonder.slice(0, 5)}...${data.bonder.slice(
                          37,
                          40
                        )}`}
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div2">
                        {parseFloat(data.amountIn)}Egax
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div2">
                        {parseFloat(data.amountOut)}Egod
                      </div>
                      <div className="earn_div_section2_area2_area_body_cont1_div2">
                        {formatDate(data?.createdAt || new Date())}
                      </div>

                      <div className="earn_div_section2_area2_area_body_cont1_div_last">
                        {`${data.transHash.slice(
                          0,
                          5
                        )}...${data.transHash.slice(37, 40)}`}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {itemsToShow < bondData?.allTransactions?.length && (
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
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* {loading && <ComponentLoaderLogin text={"Bonding"} />}
      <SuccessModal
        isOpen={success}
        text={
          "Your egax has been bonded successfully and your EGOD has been minted."
        }
        onClose={() => {
          navigate("/app/wallet");
        }}
      />
      <ErrorModal
        isOpen={error}
        text={"Oops something went wrong, please try again"}
        onClose={() => {
          setError(false);
        }}
      /> */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <Toaster />
    </div>
  );
};

export default Bond;
