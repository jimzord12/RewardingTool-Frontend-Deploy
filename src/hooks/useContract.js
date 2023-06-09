import { useState } from "react";
import { ethers } from "ethers";

function useContract(provider, addr, abi) {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @returns A Contract class instance that possess the blockchain functions as methods
   */
  const initialize = async () => {
    if (addr && abi && provider) {
      setIsLoading(true);
      try {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("User is not connected to MetaMask");
        }
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        // const ethersProvider = new ethers.BrowserProvider(provider);
        const signer = await ethersProvider.getSigner();
        const contractInstance = new ethers.Contract(addr, abi, signer);
        return contractInstance;
      } catch (error) {
        console.error(
          "💎 From:(useContract), Failed to load contract, Error: ",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  return { initialize, isLoading };
}

export default useContract;
