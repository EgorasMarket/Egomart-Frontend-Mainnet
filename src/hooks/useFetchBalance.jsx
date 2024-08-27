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
    error,
  } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "balances",
    args: [address, ticker],
  });

  console.log(error, "error here");
  if (loading === false && address) {
    return parseFloat(formatEther(balance));
  }
  return 0.0;
};

export default useFetchBalance;
