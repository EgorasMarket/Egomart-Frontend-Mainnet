import React, { useState, useEffect } from "react";
import "./index.css";
// import { assets } from "../../Components/Static";
import {
  useAccount,
  useWatchContractEvent,
  useReadContract,
  useWriteContract,
  useBalance,
} from "wagmi";
import { parseEther, formatEther } from "ethers";
import abi from "../../web3/contracts/Egomart.json";
import allowanceAbi from "../../web3/erc20.json";
import ClipLoader from "react-spinners/ClipLoader";
// import { ToastContainer, toast } from "react-toastify";
import useTokenAllowance from "../../hooks/useTokenAllowance";
import { useDispatch, useSelector } from "react-redux";
import useFetchBalance from "../../hooks/useFetchBalance";
import toast, { Toaster } from "react-hot-toast";
// import { useAccount } from "wagmi";
// import "react-toastify/dist/ReactToastify.css";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  InformationCircleIcon,
} from "hugeicons-react";

export const AssetItem = ({ asset, address, selectAsset }) => {
  const nullAddress = "0x0000000000000000000000000000000000000000";
  const balance =
    asset.tokenSymbol === "EGAX"
      ? useFetchBalance(nullAddress)
      : useFetchBalance(asset.tokenAddress);

  return (
    <div
      className="AssetListDropCont"
      onClick={() => {
        selectAsset(asset);
      }}
    >
      <div className="AssetListDropCont1">
        <img
          src={asset.img}
          alt=""
          className="depositDiv_cont1_div1_select_dvi_cont1_img"
        />
        {asset.tokenSymbol}
      </div>
      <div className="AssetListDropCont2">
        {/* {balancePending && (
          <span>
            {" "}
            <ClipLoader color="#6ba28b" size={18} />
          </span>
        )} */}

        <span>{parseFloat(balance.toFixed())}</span>
        {/* {balanceError && <span>0</span>} */}
        <span className="AssetListDropCont2_Span">$0.00</span>
      </div>
    </div>
  );
};

const Withdraw = ({ symbol }) => {
  const { assets } = useSelector((state) => state.assets);
  const { address, isConnecting, isDisconnected } = useAccount();
  const [assetList, setAssetList] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetBal, setAssetBal] = useState("0");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const nullAddress = "0x0000000000000000000000000000000000000000";

  const toggleAssetList = () => {
    setAssetList(!assetList);
  };
  const selectAsset = (data) => {
    setSelectedAsset(data);
    toggleAssetList();
  };

  useEffect(() => {
    console.log(assets);
    if (assets.length > 0) {
      setSelectedAsset(assets[0][0]);
      return;
    }
  }, [assets]);

  // useEffect(() => {
  //   if (address) {
  //     // if (balancePending) {
  //     //   console.log("fetching balance...");
  //     // } else if (balanceError) {
  //     //   console.error("Error fetching balance:", balanceError);
  //     // } else if (balanceData) {
  //     //   console.log("Fetching bal successful:", balanceData);
  //     //   setAssetBal(balanceData.formatted);
  //     // }
  //   }
  // }, [address, selectedAsset]);

  const balance =
    selectedAsset?.tokenSymbol === "EGAX"
      ? useFetchBalance(nullAddress)
      : useFetchBalance(selectedAsset?.tokenAddress);

  const {
    isPending: withdrawing,
    data: withdraw,
    writeContract,
    isError: withdrawError,
    error: error,
    isSuccess: withdrawSuccess,
    status: withdrawStatus,
  } = useWriteContract();

  console.log("====================================");
  console.log(selectedAsset);
  console.log("====================================");

  const withdrawFn = async () => {
    if (selectedAsset?.tokenSymbol === "EGAX") {
      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi,
        functionName: "withdrawNativeToken",
        args: [
          parseEther(withdrawAmount.toString(), "wei").toString(),
          address,
        ],
      });
      return;
    }
    writeContract({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      functionName: "withdraw",
      args: [
        selectedAsset?.tokenAddress,
        parseEther(withdrawAmount.toString(), "wei").toString(),
      ],
    });
  };

  const changeWithdrawAmount = (e) => {
    setWithdrawAmount(e.target.value);
  };

  useEffect(() => {
    if (withdrawSuccess === true) {
      console.log("====================================");
      console.log(withdrawSuccess);
      console.log("====================================");

      toast.success("Success Withdrawing !");
      return;
    }
  }, [withdrawSuccess]);

  useEffect(() => {
    if (withdrawError === true) {
      console.log(withdrawError);
      toast.error(error.shortMessage);
      return;
    }
  }, [withdrawError]);

  useEffect(() => {
    if (symbol || assets.length > 0) {
      if (assets[0]?.length > 0) {
        const foundAsset = assets[0].find(
          (asset) => asset.tokenSymbol === symbol
        );
        if (foundAsset) {
          console.log("Found asset:", foundAsset);
          setSelectedAsset(foundAsset);
        }
      }
    }
  }, [symbol, assets]); // Empty dependency array ensures this runs only once
  return (
    <>
      <div className="depositDiv">
        <div className="depositDiv_cont1">
          <div className="depositDiv_cont1_div1">
            <div
              className="depositDiv_cont1_div1_select_dv1"
              onClick={toggleAssetList}
            >
              <div className="depositDiv_cont1_div1_select_dvi_cont1">
                <img
                  src={selectedAsset?.img}
                  alt=""
                  className="depositDiv_cont1_div1_select_dvi_cont1_img"
                />{" "}
                {selectedAsset?.tokenSymbol}
                {assetList ? (
                  <ArrowUp01Icon className="depositDiv_cont1_div1_select_dvi_cont1_icon" />
                ) : (
                  <ArrowDown01Icon className="depositDiv_cont1_div1_select_dvi_cont1_icon" />
                )}
              </div>
            </div>
            <input
              type="text"
              className="depositDiv_cont1_div1_input"
              placeholder="0.00"
              value={withdrawAmount}
              onChange={changeWithdrawAmount}
            />

            {assetList && (
              <div className="AssetListDrop">
                <div className="AssetListDrop_title">
                  <div className="AssetListDrop_title_1">Choose Asset</div>
                  <div className="AssetListDrop_title_2">Max Withdrawable</div>
                </div>
                <div className="AssetListDrop_body">
                  {assets[0].map((asset) => (
                    <AssetItem
                      key={asset.tokenAddress}
                      asset={asset}
                      address={address}
                      selectAsset={selectAsset}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="depositDiv_cont1_div2">
            Max Withdrawable:{" "}
            <span className="depositDiv_cont1_div2_span">
              {parseFloat(balance)} {selectedAsset?.tokenSymbol}
            </span>
          </div>
        </div>
        <div className="depositDiv_cont2">
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setWithdrawAmount(0.25 * parseFloat(balance));
            }}
          >
            25%
          </div>
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setWithdrawAmount(0.5 * parseFloat(balance));
            }}
          >
            50%
          </div>
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setWithdrawAmount(0.75 * parseFloat(balance));
            }}
          >
            75%
          </div>
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setWithdrawAmount(1 * parseFloat(balance));
            }}
          >
            100%
          </div>
        </div>
        <div className="depositDiv_cont3">
          <div className="depositDiv_cont3_title">Summary</div>
          <div className="depositDiv_cont3_body">
            <div className="depositDiv_cont3_body_cont">
              <div className="depositDiv_cont3_body_cont_1">Balance</div>
              <div className="depositDiv_cont3_body_cont_2">
                0.00
                <span className="depositDiv_cont3_body_cont_2_span">
                  {" "}
                  {selectedAsset?.tokenSymbol}
                </span>
              </div>
            </div>
            <div className="depositDiv_cont3_body_cont">
              <div className="depositDiv_cont3_body_cont_1">Account Value</div>
              <div className="depositDiv_cont3_body_cont_2">$0.00</div>
            </div>
          </div>
        </div>
        {address ? (
          <>
            <button
              className="depositDiv_cont4_btn"
              onClick={withdrawFn}
              disabled={withdrawing ? true : false}
            >
              {withdrawing ? (
                <>
                  <ClipLoader color="#6ba28b" size={18} /> Withdrawing...
                </>
              ) : (
                "Withdraw"
              )}
            </button>
          </>
        ) : (
          <>
            {" "}
            <button className="depositDiv_cont4_btn" disabled={true}>
              Connect Wallet
            </button>
          </>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Withdraw;
