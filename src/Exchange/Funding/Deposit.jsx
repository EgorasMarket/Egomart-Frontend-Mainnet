import React, { useState, useEffect } from "react";
import "./index.css";
// import { assets } from "../../Components/Static";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useBalance,
} from "wagmi";
import { parseEther, formatEther } from "ethers";
import abi from "../../web3/contracts/Egomart.json";
import allowanceAbi from "../../web3/erc20.json";
import ClipLoader from "react-spinners/ClipLoader";
import useTokenAllowance from "../../hooks/useTokenAllowance";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
import toast, { Toaster } from "react-hot-toast";
export const AssetItem = ({ asset, address, selectAsset }) => {
  const nullAddress = "0x0000000000000000000000000000000000000000";
  const {
    data: balanceData,
    isPending: balancePending,
    error: balanceError,
    isSuccess: balanceSuccess,
  } = useBalance({
    address: address,
    token: asset.tokenAddress === nullAddress ? undefined : asset.tokenAddress, // Specify the token contract address here
  });

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
        {balancePending && (
          <span>
            {" "}
            <ClipLoader color="#6ba28b" size={18} />
          </span>
        )}

        {balanceSuccess && <span>{parseFloat(balanceData?.formatted)}</span>}
        {balanceError && <span>0</span>}
        <span className="AssetListDropCont2_Span">$0.00</span>
      </div>
    </div>
  );
};

const Deposit = ({ symbol }) => {
  const { assets } = useSelector((state) => state.assets);
  const { address, isConnecting, isDisconnected } = useAccount();
  const [assetList, setAssetList] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetBal, setAssetBal] = useState("0");
  const [depositAmount, setDepositAmount] = useState("");
  const [userAllowance, setUserAllowance] = useState(false);
  // Using the custom hook
  const nullAddress = "0x0000000000000000000000000000000000000000";
  useEffect(() => {
    console.log(assets);
    if (assets.length > 0) {
      setSelectedAsset(assets[0][0]);
      return;
    }
  }, [assets]);

  const { setAllowance, allowancePending, allowanceSuccess, allowanceError } =
    useTokenAllowance(
      selectedAsset?.tokenAddress,
      import.meta.env.VITE_CONTRACT_ADDRESS
    );

  const toggleAssetList = () => {
    setAssetList(!assetList);
  };
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
    token:
      selectedAsset?.tokenAddress === nullAddress
        ? undefined
        : selectedAsset?.tokenAddress,
  });

  useEffect(() => {
    console.log(selectedAsset?.tokenAddress);
    console.log(balanceData);
    // setAllowance();
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
    isPending: depositing,
    data: deposit,
    writeContract,
    isError: depositError,
    error: error,
    isSuccess: depositSuccess,
    status: depositStatus,
  } = useWriteContract();

  const depositFn = async () => {
    if (selectedAsset?.tokenSymbol === "EGAX") {
      writeContract({
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        abi,
        functionName: "depositNativeToken",
        value: parseEther(depositAmount?.toString(), "wei").toString(),
      });
      return;
    }

    writeContract({
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      abi,
      functionName: "deposit",
      args: [
        selectedAsset?.tokenAddress,
        parseEther(depositAmount?.toString(), "wei").toString(),
      ],
    });
  };

  const changeDepositAmount = (e) => {
    setDepositAmount(e.target.value);
  };

  const {
    data: allowanceData,
    isError,
    isSuccess,
    isLoading,
  } = useReadContract({
    address: selectedAsset?.tokenAddress,
    abi: allowanceAbi.abi,
    functionName: "allowance",
    args: [address, import.meta.env.VITE_CONTRACT_ADDRESS],
  });

  useEffect(() => {
    if (selectedAsset) {
      if (!isLoading) {
        console.log(
          "Allowance Data: ",
          allowanceData?.toString(),
          "depositAmount:",
          depositAmount
        );
        if (parseFloat(allowanceData?.toString()) < parseFloat(depositAmount)) {
          setUserAllowance(true);
        } else {
          setUserAllowance(false);
        }
        return;
      }
      if (isSuccess) {
        setUserAllowance(false);
        console.error("success fetching allowance");
        return;
      }
      if (isError) {
        setUserAllowance(false);
        console.error("Error fetching allowance data");
        return;
      }
      return;
    }
  }, [allowanceData, isLoading, isError, selectedAsset, depositAmount]);

  useEffect(() => {
    if (depositSuccess === true) {
      toast.success("Deposit Success!!!");
      return;
    }
  }, [depositSuccess]);

  useEffect(() => {
    if (depositError === true) {
      // console.log(depositError, error);
      toast.error(error.shortMessage);
      return;
    }
  }, [depositError]);

  useEffect(() => {
    if (allowanceSuccess === true) {
      console.log("====================================");
      console.log(allowanceSuccess);
      console.log("====================================");
      setUserAllowance(false);
      toast.success("Success fully Approved " + selectedAsset?.tokenSymbol);

      return;
    }
  }, [allowanceSuccess]);

  useEffect(() => {
    if (allowanceError === true) {
      console.log(allowanceError);
      setUserAllowance(false);
      toast.error("Error Approving " + selectedAsset?.tokenSymbol);
      return;
    }
  }, [allowanceError]);

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
  console.log(assets);

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
              value={depositAmount}
              onChange={changeDepositAmount}
            />

            {assetList && (
              <div className="AssetListDrop">
                <div className="AssetListDrop_title">
                  <div className="AssetListDrop_title_1">Choose Asset</div>
                  <div className="AssetListDrop_title_2">Available</div>
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
            Available:{" "}
            <span className="depositDiv_cont1_div2_span">
              {parseFloat(assetBal)} {selectedAsset?.tokenSymbol}
            </span>
          </div>
        </div>
        <div className="depositDiv_cont2">
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setDepositAmount(0.25 * parseFloat(assetBal));
            }}
          >
            25%
          </div>
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setDepositAmount(0.5 * parseFloat(assetBal));
            }}
          >
            50%
          </div>
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setDepositAmount(0.75 * parseFloat(assetBal));
            }}
          >
            75%
          </div>
          <div
            className="depositDiv_cont2_cont1"
            onClick={() => {
              setDepositAmount(1 * parseFloat(assetBal));
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
            {" "}
            {userAllowance ? (
              <button
                className="depositDiv_cont4_btn"
                onClick={setAllowance}
                disabled={allowancePending ? true : false}
              >
                {allowancePending ? (
                  <>
                    <ClipLoader color="#6ba28b" size={18} /> Approving...
                  </>
                ) : (
                  <>Approve {selectedAsset?.tokenSymbol}</>
                )}
              </button>
            ) : (
              <button
                className="depositDiv_cont4_btn"
                onClick={depositFn}
                disabled={depositing ? true : false}
              >
                {depositing ? (
                  <>
                    <ClipLoader color="#6ba28b" size={18} /> Depositing...
                  </>
                ) : (
                  "Deposit"
                )}
              </button>
            )}
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

export default Deposit;
