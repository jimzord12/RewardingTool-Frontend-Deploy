import { useState } from "react";
import { ethers } from "ethers";
import useToastMsg from "./useToastMsg";
import { useGlobalContext } from "contexts/GlobalContextProvider";

async function checkContractExists(provider, contractAddress) {
  const code = await provider.getCode(contractAddress);
  return code !== "0x";
}

function useContractLocalWallet(addr, abi) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastMsg();
  const { localWallet, usingLocalWallet, provider } = useGlobalContext();

  /**
   * @returns A Contract class instance that possess the blockchain functions as methods
   */
  const initialize = async () => {
    if (addr && abi && provider && usingLocalWallet && localWallet) {
      setIsLoading(true); //window.ethereum
      try {
        const itExists = await checkContractExists(provider, addr);
        if (!itExists)
          throw new Error(`Contract with address: ${addr}, does not exist!`);

        const signer = await localWallet.connect(provider);
        const contractInstance = new ethers.Contract(addr, abi, signer);

        return contractInstance;
      } catch (error) {
        console.error(
          "⛔ From:(useContractLocalWallet), Failed to load contract, Error: ",
          error
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      showToast(
        "Contract Instance Creation",
        "Something is missing or is wrong, see the console!",
        "error"
      );
      console.log("⛔ 1. address: ", addr);
      console.log("⛔ 2. abi: ", abi);
      console.log("⛔ 3. provider: ", provider);
      console.log("⛔ 4. usingLocalWallet: ", usingLocalWallet);
      console.log("⛔ 5. localWallet: ", localWallet);
    }
  };
  return { initializeLWContract: initialize, isLoadingLWContract: isLoading };
}

export default useContractLocalWallet;
