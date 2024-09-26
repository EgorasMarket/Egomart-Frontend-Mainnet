import React from "react";
import { useAccount, useReadContract } from "wagmi";
import contractAbi from "../web3/contracts/Egomart.json";
import { formatEther } from "ethers";

const useFetchBalance = (ticker) => {
  const { address } = useAccount();

  // Fetch balance using useReadContract
  const {
    data: balance,
    isLoading: loading,
    error,
    isSuccess,
    refetch,
  } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "balances",
    args: [address, ticker],
    enabled: !!ticker && !!address, // Only fetch if ticker and address exist
  });

  // Return the relevant states
  return {
    balance: isSuccess && balance ? parseFloat(formatEther(balance)) : 0.0,
    loading,
    error,
    refetch,
  };
};

export default useFetchBalance;
