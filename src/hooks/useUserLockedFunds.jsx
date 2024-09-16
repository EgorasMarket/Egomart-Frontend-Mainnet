import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { formatEther, parseEther } from "ethers";
import { USER_LOCKED_FUNDS } from "../services/earn.service";

const useUserLockedFunds = () => {
  const { address } = useAccount();

  const fetchUserLockedFunds = async () => {
    const res = await USER_LOCKED_FUNDS(address);
    console.log(res);
  };

  useEffect(() => {
    if (address) {
      fetchUserLockedFunds();
      return;
    }
  }, [address]);

  return 0.0;
};

export default useUserLockedFunds;
