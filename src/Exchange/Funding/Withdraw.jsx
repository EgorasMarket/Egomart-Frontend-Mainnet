import React, { useEffect, useState } from "react";
import "./index.css";
import { assets } from "../../Components/Static";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  InformationCircleIcon,
} from "hugeicons-react";
import useTokenAllowance from "../../hooks/useTokenAllowance";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import abi from "../../web3/contracts/Egomart.json";
import { parseEther } from "ethers";

const Withdraw = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [assetList, setAssetList] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [assetBal, setAssetBal] = useState("0");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const toggleAssetList = () => {
    setAssetList(!assetList);
  };

  // Using the custom hook
  // const { setAllowance, allowancePending, allowanceSuccess, allowanceError } =
  //   useTokenAllowance(
  //     selectedAsset.tokenAddress,
  //     import.meta.env.VITE_CONTRACT_ADDRESS
  //   );
  const selectAsset = (data) => {
    setSelectedAsset(data);
    toggleAssetList();
  };
  const {
    data: balanceData,
    isPending: balancePending,
    error: balanceError,
    isSuccess: balanceSuccess,
  } = useBalance({
    address: address,
    token: selectedAsset.tokenAddress, // Specify the token contract address here
  });

  useEffect(() => {
    if (address) {
      if (balancePending) {
        console.log("fetching balance...");
      } else if (balanceError) {
        console.error("Error fetching balance:", balanceError);
      } else if (balanceData) {
        console.log("Fetching bal successful:", balanceData);
        setAssetBal(balanceData.formatted);
      }
    }
  }, [balancePending, balanceError, balanceData, address, selectedAsset]);

  const {
    isPending: withdrawing,
    data: withdraw,
    writeContract: initiateWithdraw,
    isError: withdrawError,
    error: error,
    isSuccess: withdrawSuccess,
    status: withdrawStatus,
  } = useWriteContract();
  const withdrawFn = async () => {
    initiateWithdraw({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      functionName: "withdraw",
      args: [
        selectedAsset.tokenAddress,
        parseEther(withdrawAmount.toString(), "wei").toString(),
      ],
    });
  };

  const changeWithdrawAmount = (e) => {
    setWithdrawAmount(e.target.value);
  };

  return (
    <div className="depositDiv">
      <div className="depositDiv_cont1">
        <div className="depositDiv_cont1_div1">
          <div
            className="depositDiv_cont1_div1_select_dv1"
            onClick={toggleAssetList}
          >
            <div className="depositDiv_cont1_div1_select_dvi_cont1">
              <img
                src={selectedAsset.img}
                className="depositDiv_cont1_div1_select_dvi_cont1_img"
              />
              {selectedAsset.tokenSymbol}
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
                <div className="AssetListDrop_title_2">Available</div>
              </div>
              <div className="AssetListDrop_body">
                {assets.map((data) => (
                  <div
                    className="AssetListDropCont"
                    onClick={() => {
                      selectAsset(data);
                    }}
                  >
                    <div className="AssetListDropCont1">
                      <img
                        src={data.img}
                        alt=""
                        className="depositDiv_cont1_div1_select_dvi_cont1_img"
                      />{" "}
                      {data.tokenSymbol}
                    </div>
                    <div className="AssetListDropCont2">
                      0.00
                      <span className="AssetListDropCont2_Span">$0.00</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="depositDiv_cont1_div2">
          Max withdrawal:{" "}
          <span className="depositDiv_cont1_div2_span">1,000.00</span>
        </div>
      </div>
      <div className="depositDiv_cont2">
        <div className="depositDiv_cont2_cont1">25%</div>
        <div className="depositDiv_cont2_cont1">50%</div>
        <div className="depositDiv_cont2_cont1">75%</div>
        <div className="depositDiv_cont2_cont1">100%</div>
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
                {selectedAsset.tokenSymbol}
              </span>
            </div>
          </div>
          <div className="depositDiv_cont3_body_cont">
            <div className="depositDiv_cont3_body_cont_1">Account Value</div>
            <div className="depositDiv_cont3_body_cont_2">$0.00</div>
          </div>
        </div>
      </div>
      <button onClick={withdrawFn} className="depositDiv_cont4_btn">
        Withdraw
      </button>
    </div>
  );
};

export default Withdraw;
