import { useWriteContract } from "wagmi";
import allowanceAbi from "../web3/erc20.json";
import { parseEther } from "ethers";

const useTokenAllowance = (coinAddress, address) => {
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
      args: [
        address,
        parseEther(
          "1800000000000000000000000000000000".toString(),
          "wei"
        ).toString(),
      ],
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
