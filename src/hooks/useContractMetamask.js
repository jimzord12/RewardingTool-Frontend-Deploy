import { useState } from "react";
import { ethers } from "ethers";
import useToastMsg from "./useToastMsg";
import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";

async function checkContractExists(provider, contractAddress) {
  const code = await provider.getCode(contractAddress);
  return code !== "0x";
}

function useContractMetamask(addr, abi) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastMsg();
  const { provider } = useMetaMask();

  /**
   * @returns A Contract class instance that possess the blockchain functions as methods
   */
  const initialize = async () => {
    if (addr && abi && provider) {
      setIsLoading(true); //window.ethereum
      try {
        // Wallet is Connected here!
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("User is not connected to MetaMask");
        }
        const ethersProvider = new ethers.providers.Web3Provider(provider);

        const itExists = await checkContractExists(ethersProvider, addr);
        if (!itExists)
          throw new Error(`Contract with address: ${addr}, does not exist!`);

        const signer = await ethersProvider.getSigner();
        const contractInstance = new ethers.Contract(addr, abi, signer);

        return contractInstance;
      } catch (error) {
        console.error(
          "⛔ From:(useContractMetamask), Failed to load contract, Error: ",
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
    }
  };

  // async function readOnlyContract(providerUrl, contractAddress, contractAbi) {
  //   // Set the provider. This can be your own Ethereum node or a service like Infura
  //   const provider = new ethers.providers.JsonRpcProvider(providerUrl);

  //   // Create a new instance of the contract
  //   const contract = new ethers.Contract(
  //     contractAddress,
  //     contractAbi,
  //     provider
  //   );

  //   // Call the contract methods
  //   const data = await contract.getAllProducts();
  //   console.log(data);
  // }
  return {
    initializeMetamaskContract: initialize,
    isLoadingMetamaskContract: isLoading,
  };
}

export default useContractMetamask;
