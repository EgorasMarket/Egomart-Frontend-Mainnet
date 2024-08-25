import React, { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../web3/contracts/Egomart.json";
import { formatEther } from "ethers";

const useFetchBalance = (ticker) => {
  const { address } = useAccount();
  //   const [balance, setBalance] = useState(0);

  const {
    data: balance,
    isLoading: loading,
    isPending,
  } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "balances",
    args: [address, ticker],
  });

  if (loading === false) {
    return parseFloat(formatEther(balance)).toFixed(2);
  }
  return 0.0;
};

export default useFetchBalance;
