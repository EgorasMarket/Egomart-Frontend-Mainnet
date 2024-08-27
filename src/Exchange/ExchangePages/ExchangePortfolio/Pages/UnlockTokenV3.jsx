import { useWriteContract } from "wagmi";
import allowanceAbi from "../../../../web3/erc20.json";

const useTokenAllowance = (coinAddress, address, amount) => {
  const {
    isPending: allowancePending,
    data: allowance,
    writeContract: initiateAllowance,
    isError: allowanceError,
    error: approveError,
    isSuccess: allowanceSuccess,
    status: allowanceStatus,
  } = useWriteContract();

  const setAllowance = () => {
    initiateAllowance({
      address: coinAddress,
      abi: allowanceAbi.abi,
      functionName: "approve",
      args: [address, amount],
    });
  };

  return {
    setAllowance,
    allowancePending,
    allowance,
    allowanceError,
    approveError,
    allowanceSuccess,
    allowanceStatus,
  };
};

export default useTokenAllowance;
