import { useState } from "react";
import { ethers } from "ethers";

function useContract(provider, addr, abi) {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @returns A Contract class instance that possess the blockchain functions as methods
   */
  const initialize = async (isReadOnly = false) => {
    if (addr && abi && provider) {
      setIsLoading(true);
      try {
        if (!isReadOnly) {
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
        }

        // *********************************************************
        const providerReadOnly = new ethers.providers.JsonRpcProvider(
          "http://127.0.0.1:8545"
        );

        // Create a new instance of the contract
        const contractReadOnly = new ethers.Contract(
          addr,
          abi,
          providerReadOnly
        );

        return contractReadOnly;
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

  async function readOnlyContract(providerUrl, contractAddress, contractAbi) {
    // Set the provider. This can be your own Ethereum node or a service like Infura
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    // Create a new instance of the contract
    const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider
    );

    // Call the contract methods
    const data = await contract.getAllProducts();
    console.log(data);
  }
  return { initialize, isLoading };
}

export default useContract;
