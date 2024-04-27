import { ethers } from "ethers";
import { useState } from "react";
import { getPlayerByWallet } from "../api/index";

function useLocalWallet(provider) {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState("-1");
  // const [setLW_HookHasRun, setSetLW_HookHasRun] = useState(false);

  // useEffect(() => {
  //   if (!usingLocalWallet) return;

  //   async function automaticLogin() {
  //     try {
  //       const { success, walletAddress } = retrieveWallet();
  //       if (success) {
  //         console.log(
  //           "✅ - Local Wallet Discovery Success. Retrieving User Data..."
  //         );
  //         const userData = await getPlayerByWallet(walletAddress);
  //         setUser({ ...userData });
  //       } else {
  //         console.log("💥 - No Local Wallet was found");
  //       }
  //     } catch (error) {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       if (error?.response.status === 401) {
  //         console.log(
  //           "🔷 - Tried to Automatically Fetch User Data and Failed!"
  //         );
  //       } else {
  //         console.log(
  //           "🔷 - Automatic UserData Local Wallet Retrival Failed, probably no Wallet is stored."
  //         );
  //       }
  //     } finally {
  //       setSetLW_HookHasRun(true);
  //     }
  //   }

  //   automaticLogin();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [usingLocalWallet]);

  async function automaticLogin() {
    const { success, walletAddress } = retrieveWallet();
    try {
      if (success) {
        console.log(
          "✅ - Local Wallet Discovery Success. Retrieving User Data...",
          walletAddress
        );
        const userData = await getPlayerByWallet(walletAddress);
        return { localWalletExist: success, userData, walletAddress };
      } else {
        console.log("💥 - No Local Wallet was found");
        return { localWalletExist: false, userData: null, walletAddress: null };
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (error?.response.status === 404) {
        console.log("AAAAAAAAAAAAAAAAAAA");
        return {
          localWalletExist: true,
          error: "Player not found",
          walletAddress,
        };
      }
      if (error?.response.status === 401) {
        console.log("🔷 - Tried to Automatically Fetch User Data and Failed!");
      } else {
        console.log(
          "🔷 - Automatic UserData Local Wallet Retrival Failed, probably no Wallet is stored."
        );
      }
    }
  }

  const generateWallet = () => {
    const newWallet = ethers.Wallet.createRandom();
    localStorage.setItem("walletPrivateKey", newWallet.privateKey);
    console.log(
      "✨ New Local Wallet Created! Private Key: ",
      newWallet.privateKey
    );
    setWallet(newWallet);
    return newWallet.address;
  };

  // This is used for both restoring an existing one thorught user input and local storage.
  // If the user provides a private key, it will be used to create a new wallet.
  // If the user does not provide a private key, the function will try to retrieve it from local storage.
  const retrieveWallet = (privKryToRestore) => {
    // console.log("useLocalWallet: retrieveWallet: ", walletAddress);
    if (privKryToRestore) {
      console.log("useLocalWallet: existingWallet: ", privKryToRestore);
      const existingWallet = new ethers.Wallet(privKryToRestore);
      localStorage.setItem("walletPrivateKey", existingWallet.privateKey);
      setWallet(existingWallet);

      return { walletAddress: existingWallet.address, success: true };
    } else {
      const privateKey = localStorage.getItem("walletPrivateKey");
      if (privateKey) {
        const existingWallet = new ethers.Wallet(privateKey);
        setWallet(existingWallet);
        return { walletAddress: existingWallet.address, success: true };
      } else {
        return { walletAddress: null, success: false };
      }
    }
  };

  const getPrivKey = () => {
    const privateKey = localStorage.getItem("walletPrivateKey");
    return privateKey;
  };

  const deleteWallet = () => {
    localStorage.removeItem("walletPrivateKey");
    setWallet(null);
  };

  const getEthBalance = async (address) => {
    console.log("getEthBalance => Wallet: ", wallet);
    console.log("getEthBalance => Provider: ", provider);
    console.log("getEthBalance => Address: ", address);
    if (wallet && provider) {
      const walletAddress = await wallet.getAddress();
      const balanceWei = await provider.getBalance(walletAddress);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setBalance(balanceEth);
      console.log("getEthBalance: ", balanceEth);
      return balanceEth;
    } else if (address && provider) {
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setBalance(balanceEth);
      console.log("getEthBalance: ", balanceEth);
      return balanceEth;
    }
  };

  const getEthBalance_2 = async (address) => {
    const balanceWei = await provider.getBalance(address);
    const balanceEth = ethers.utils.formatEther(balanceWei);
    return balanceEth;
  };

  return {
    wallet,
    deleteWallet,
    generateWallet,
    retrieveWallet,
    balance,
    getEthBalance,
    automaticLogin,
    getPrivKey,
    getEthBalance_2,
  };
}

export default useLocalWallet;
