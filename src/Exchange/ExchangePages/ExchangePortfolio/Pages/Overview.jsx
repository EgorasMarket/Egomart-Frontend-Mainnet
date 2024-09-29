import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import { markets, userAssets, assets } from "../../../../Components/Static";
import { Link } from "react-router-dom";
import Modal from "../../../../Components/Modal/Modal";
import Deposit from "../../../Funding/Deposit";
import Withdraw from "../../../Funding/Withdraw";
import useFetchBalance from "../../../../hooks/useFetchBalance";
import useUserLockedFunds from "../../../../hooks/useUserLockedFunds";
import { useDispatch, useSelector } from "react-redux";
import { parseEther, formatEther } from "ethers";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useBalance,
} from "wagmi";
import { GET_USER_DEPOSIT_WITHDRAW } from "../../../../services/trade.services";
import { format } from "date-fns";
import abi from "../../../../web3/contracts/Egomart.json";

export const AssetItem = ({
  data,
  openDepositModal,
  openWithdrawModal,
  balance,
  usdBalance,
}) => {
  const { curr_order_id } = useSelector((state) => state.info);

  const { address } = useAccount();
  const [redeemModal, setRedeemModal] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("0");
  const [payload, setPayload] = useState({
    fullName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    phoneNo: "",
  });
  const redeemDestinationAddress = "0xf7fe5f26d7C56842E7D5fF1A3bcC8bD52bcb610F";
  const ToggleRedeemModal = () => {
    setRedeemModal(!redeemModal);
  };
  const onChangeRedeemAmount = (e) => {
    setRedeemAmount(e.target.value);
  };
  const ratio = 2;

  const {
    isPending: redeeming,
    data: redeem,
    writeContract,
    isError: redeemError,
    error: error,
    isSuccess: redeemSuccess,
    status: redeemStatus,
  } = useWriteContract();

  const redeemFn = async () => {
    writeContract({
      address: import.meta.env.VITE_REDEEM_ADDRESS,
      abi,
      functionName: "redeem",
      args: [
        data.tokenAddress,
        parseEther(redeemAmount?.toString(), "wei").toString(),
        redeemDestinationAddress,
      ],
    });
    console.log(
      address,
      parseEther(redeemAmount?.toString(), "wei").toString(),
      redeemDestinationAddress
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`${name}: ${value}`);
  };

  useEffect(() => {
    if (redeemSuccess === true) {
      console.log(redeemSuccess);
      return;
    }
  }, [redeemSuccess]);

  useEffect(() => {
    if (redeemError === true) {
      console.log(error.shortMessage);
      return;
    }
  }, [redeemError]);

  useEffect(() => {
    console.log(curr_order_id, "order-id");
  }, [curr_order_id]);
  console.log(data);
  return (
    <div className="exPortoflioOverviewDiv_3_body_cont_div">
      <div className="exPortoflioOverviewDiv_3_body_cont_1">
        <img
          src={data.img}
          alt=""
          className="exPortoflioOverviewDiv_3_body_cont_1_img"
        />
        {data.tokenSymbol}
      </div>
      <div className="exPortoflioOverviewDiv_3_body_cont_1">
        {parseFloat(balance).toFixed(4)}
      </div>
      <div className="exPortoflioOverviewDiv_3_body_cont_1">
        ${parseFloat(usdBalance).toFixed(4)}
      </div>
      {/* <div className="exPortoflioOverviewDiv_3_body_cont_1">0.0</div>
      <div className="exPortoflioOverviewDiv_3_body_cont_1">0.0</div> */}
      <div className="exPortoflioOverviewDiv_3_body_cont_last">
        {data.tokenSymbol === "EGOD" ? null : (
          <Link
            to={`/app/trade/spot/${data.tokenSymbol}-EGOD`}
            className="overview_link_trade"
          >
            <button
              className="exPortoflioOverviewDiv_3_body_cont_last_btn1"
              // onClick={openDepositModal}
            >
              Trade
            </button>
          </Link>
        )}

        <button
          className="exPortoflioOverviewDiv_3_body_cont_last_btn1"
          onClick={openDepositModal}
        >
          Deposit
        </button>
        <button
          className="exPortoflioOverviewDiv_3_body_cont_last_btn2"
          onClick={openWithdrawModal}
        >
          Withdraw
        </button>
        {data.tokenSymbol === "EGOD" && (
          <button
            className="exPortoflioOverviewDiv_3_body_cont_last_btn3"
            onClick={ToggleRedeemModal}
          >
            Redeem
          </button>
        )}
      </div>
      <Modal
        isOpen={redeemModal}
        closeModal={ToggleRedeemModal}
        title={"Redeem"}
      >
        <div className="redeemModal_div">
          <div className="redeemModal_div_1">
            <div className="redeemModal_div_1_title">
              Available balance{" "}
              <span>
                {balance} {data.tokenSymbol}
              </span>
            </div>
            <div className="redeemModal_div_1_body">
              <div className="redeemModal_div_1_body_cont1">
                <img
                  src={data.img}
                  alt=""
                  className="redeemModal_div_1_body_cont1_img"
                />
                {data.tokenSymbol}
              </div>
              <input
                className="redeemModal_div_1_body_cont2"
                value={redeemAmount}
                onChange={onChangeRedeemAmount}
              />
            </div>
          </div>
          <div className="redeemModal_div_1">
            <div className="redeemModal_div_1_title">Redeemable</div>
            <div className="redeemModal_div_1_body">
              <div className="redeemModal_div_1_body_cont1">
                <img
                  src={data.img}
                  alt=""
                  className="redeemModal_div_1_body_cont1_img"
                />
                {data.tokenSymbol} (RWA)
              </div>
              <div className="redeemModal_div_1_body_cont2">
                {parseInt(redeemAmount) / parseInt(ratio) || 0}
              </div>
            </div>
          </div>
          <div
            className="ratio_span"
            style={{ fontSize: "12px", marginBottom: "10px" }}
          >
            {ratio} {data.tokenSymbol} = 1 {data.tokenSymbol} (RWA)
          </div>
          <div className="deliveryDetailsDiv">
            <div className="deliveryDetailsDiv_title">Delivery Details</div>
            <div className="deliveryDetailsDiv_body">
              <div className="deliveryDetailsDiv_body_cont1">
                <div className="deliveryDetailsDiv_body_cont1_title">
                  Full Name*
                </div>
                <input
                  type="text"
                  className="deliveryDetailsDiv_body_cont1_input"
                  placeholder="John Doe"
                  name="fullName"
                  value={payload.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="deliveryDetailsDiv_body_cont1">
                <div className="deliveryDetailsDiv_body_cont1_title">
                  Email*
                </div>
                <input
                  type="email"
                  className="deliveryDetailsDiv_body_cont1_input"
                  placeholder="@gmail.com"
                  name="email"
                  value={payload.email}
                  onChange={handleChange}
                />
              </div>

              <div className="deliveryDetailsDiv_body_cont1">
                <div className="deliveryDetailsDiv_body_cont1_title">
                  Country*
                </div>
                <input
                  type="text"
                  className="deliveryDetailsDiv_body_cont1_input"
                  placeholder=""
                  name="country"
                  value={payload.country}
                  onChange={handleChange}
                />
              </div>

              <div className="deliveryDetailsDiv_body_cont1">
                <div className="deliveryDetailsDiv_body_cont1_title">
                  State*
                </div>
                <input
                  type="text"
                  className="deliveryDetailsDiv_body_cont1_input"
                  placeholder=""
                  name="state"
                  value={payload.state}
                  onChange={handleChange}
                />
              </div>

              <div className="deliveryDetailsDiv_body_cont1">
                <div className="deliveryDetailsDiv_body_cont1_title">City*</div>
                <input
                  type="text"
                  className="deliveryDetailsDiv_body_cont1_input"
                  placeholder=""
                  name="city"
                  value={payload.city}
                  onChange={handleChange}
                />
              </div>

              <div className="deliveryDetailsDiv_body_cont1">
                <div className="deliveryDetailsDiv_body_cont1_title">
                  Postal Code (optional)
                </div>
                <input
                  type="text"
                  className="deliveryDetailsDiv_body_cont1_input"
                  placeholder=""
                  name="zipCode"
                  value={payload.zipCode}
                  onChange={handleChange}
                />
              </div>

              <div className="deliveryDetailsDiv_body_cont1">
                <div className="deliveryDetailsDiv_body_cont1_title">
                  Phone No*
                </div>
                <input
                  type="number"
                  className="deliveryDetailsDiv_body_cont1_input"
                  placeholder=""
                  name="phoneNo"
                  value={payload.phoneNo}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button
            className="depositDiv_cont4_btn"
            onClick={redeemFn}
            // disabled={isLoading2 ? true : false}
          >
            Redeem
          </button>
        </div>
      </Modal>
    </div>
  );
};

const Overview = () => {
  const { tickers } = useSelector((state) => state.pairs);
  const { assets } = useSelector((state) => state.assets);
  const { address } = useAccount();
  const [deposit, setDeposit] = useState(false);
  const [depositUnique, setDepositUnique] = useState(false);
  const [withdrawUnique, setWithdrawUnique] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [history, setHistory] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const nullAddress = "0x0000000000000000000000000000000000000000";
  function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, "MMM do, yyyy / h:mm aaa");
  }

  const fetchUserHistory = async () => {
    const res = await GET_USER_DEPOSIT_WITHDRAW(address);
    console.log("====================================");
    console.log(res);
    const sortedRes = res.data.filter((data) => {
      return (
        (data.amount = parseFloat(data.amount)),
        (data.createdAt = formatDate(data?.createdAt || new Date()))
      );
    });
    console.log("====================================");
    console.log(sortedRes);
    console.log("====================================");
    setHistory(res.data);
    console.log("====================================");
  };
  useEffect(() => {
    if (address) {
      fetchUserHistory();
      return;
    }
  }, [address]);

  const closeDepositModal = () => {
    setDeposit(false);
  };
  const openDepositModal = () => {
    setDeposit(true);
  };
  const closeDepositModalUnique = () => {
    setDepositUnique(false);
  };
  const openDepositModalUnique = (symbol) => {
    setDepositUnique(true);
    setSelectedSymbol(symbol);
  };
  const closeWithdrawModalUnique = () => {
    setWithdrawUnique(false);
  };
  const openWithdrawModalUnique = (symbol) => {
    setWithdrawUnique(true);
    setSelectedSymbol(symbol);
  };
  const closeWithdrawModal = () => {
    setWithdraw(false);
  };
  const openWithdrawModal = () => {
    setWithdraw(true);
  };
  console.log(assets);
  console.log(assets[0]);
  // console.log(assets[0][0]);

  useUserLockedFunds();

  let arrayyy = [];

  useEffect(() => {
    if (arrayyy.length > 0) {
      setTotalBalance(
        arrayyy.reduce((acc, currentValue) => acc + currentValue, 0)
      );
    } else {
      setTotalBalance(0);
    }
  }, [arrayyy]);

  console.log(totalBalance, "totalBalance");

  return (
    <div className="exPortoflioOverviewDiv">
      <div className="exPortoflioOverviewDiv_1">
        <div className="exPortoflioOverviewDiv_1_cont1">Welcome</div>
        <div className="exPortoflioOverviewDiv_1_cont2">
          <button
            className="exPortoflioOverviewDiv_1_cont2_btn1"
            onClick={openDepositModal}
          >
            Deposit
          </button>
          <button
            className="exPortoflioOverviewDiv_1_cont2_btn2"
            onClick={openWithdrawModal}
          >
            Withdraw
          </button>
        </div>
      </div>
      <div className="exPortoflioOverviewDiv_2">
        <div className="exPortoflioOverviewDiv_2_div1">
          <div className="exPortoflioOverviewDiv_2_div1_area1">
            <div className="exPortoflioOverviewDiv_2_div1_cont1">Account</div>
            <div className="exPortoflioOverviewDiv_2_div1_cont2">
              ${parseFloat(totalBalance).toFixed(4)}
            </div>
            <div className="exPortoflioOverviewDiv_2_div1_cont3">
              ${parseFloat(totalBalance).toFixed(4)}
            </div>
          </div>
          <div className="exPortoflioOverviewDiv_2_div1_cont4">
            <div className="exPortoflioOverviewDiv_2_div1_cont4_div1">
              Details
            </div>
            {/* <div className="exPortoflioOverviewDiv_2_div1_cont4_div2">
              {/* <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1">
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div1">
                  Funds Available
                </div>
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div2">
                  $0.0
                </div>
              </div> */}
            {/* <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1">
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div1">
                  Total Funds
                </div>
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div2">
                  $0.0
                </div>
              </div> */}
            {/* </div> */}
            <div className="exPortoflioOverviewDiv_2_div1_cont4_div3">
              <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1">
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div1">
                  Account Level
                </div>
                <div className="exPortoflioOverviewDiv_2_div1_cont4_div2_cont1_div2">
                  level1
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="exPortoflioOverviewDiv_2_div2">
          <div className="exPortoflioOverviewDiv_2_div2_title">
            <div className="exPortoflioOverviewDiv_2_div2_title_div">
              Account
            </div>
          </div>
          <div className="exPortoflioOverviewDiv_2_div2_body">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={130}
                height={10}
                data={history}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="1%" stopColor="#51cb89" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#51cb89" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#fff"
                  opacity={0.2}
                />
                <XAxis dataKey="createdAt" stroke="0" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#22ad62"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="exPortoflioOverviewDiv_3">
        <div className="ExchangeMarket_div2_title">
          <div className="ExchangeMarket_div2_title_div1">Assets</div>
        </div>
        <div className="exPortoflioOverviewDiv_3_body">
          <div className="exPortoflioOverviewDiv_3_body_head">
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Asset
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Total Balance
            </div>
            {/* <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Available Balance
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              Locked Balance
            </div> */}
            <div className="exPortoflioOverviewDiv_3_body_head_cont1">
              USD Valuation
            </div>
            <div className="exPortoflioOverviewDiv_3_body_head_cont1_last"></div>
          </div>
          <div className="exPortoflioOverviewDiv_3_body_cont">
            {assets[0]?.map((data) => {
              console.log(data);
              const balance =
                data.tokenSymbol === "EGAX"
                  ? useFetchBalance(nullAddress)
                  : useFetchBalance(data?.tokenAddress);

              const matchedTicker = tickers.find(
                (tickerItem) =>
                  tickerItem.ticker.split("-")[0] === data.tokenSymbol
              );
              console.log(matchedTicker);
              // arrayyy.push(matchedTicker ? matchedTicker : data);
              // console.log(arrayyy);
              const usdBal =
                matchedTicker?.ticker?.split("-")[0] === data?.tokenSymbol
                  ? parseFloat(matchedTicker?.close24h) * parseFloat(balance)
                  : balance;

              arrayyy.push(usdBal);
              console.log(arrayyy);

              return (
                <AssetItem
                  key={data.id}
                  data={data}
                  openDepositModal={() => {
                    openDepositModalUnique(data.tokenSymbol);
                  }}
                  openWithdrawModal={() => {
                    openWithdrawModalUnique(data.tokenSymbol);
                  }}
                  balance={balance}
                  usdBalance={usdBal}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Modal isOpen={deposit} title={"Deposit"} closeModal={closeDepositModal}>
        <Deposit />
      </Modal>
      <Modal
        isOpen={depositUnique}
        title={"Deposit"}
        closeModal={closeDepositModalUnique}
      >
        <Deposit symbol={selectedSymbol} />
      </Modal>
      <Modal
        isOpen={withdraw}
        title={"Withdraw"}
        closeModal={closeWithdrawModal}
      >
        <Withdraw />
      </Modal>
      <Modal
        isOpen={withdrawUnique}
        title={"Withdraw"}
        closeModal={closeWithdrawModalUnique}
      >
        <Withdraw symbol={selectedSymbol} />
      </Modal>
    </div>
  );
};

export default Overview;
