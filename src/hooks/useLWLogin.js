import { useState } from "react";
// import { ZeroAddress } from "ethers";
// import { ethers } from "ethers";

// import useMetamask from "./useMetamask";
// import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
// import { web3StructToObj } from "../utils/web3StructToObj";

import { getPlayerByWallet } from "../api/index";

export function useLWLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { hasMetamask, wallet } = useMetaMask();

  const loginUser = async (userData) => {
    console.log("Logging in...");
    setIsLoading(true);

    if (userData.localWallet.account === "")
      throw new Error("useLWLogin => loginUser> Wallet has no accounts.");

    const timeout = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject("Timeout: Operation took longer than expected");
      }, 8000);
    });

    try {
      const response = await Promise.race([
        getPlayerByWallet(userData.wallet.accounts[0]),
        timeout,
      ]);
      console.log("Logged in Response: ", response);
      setIsLoggedIn(true);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false); // Set loading to false even on error.
    }
  };

  const loggedOut = () => {
    setIsLoggedIn(false);
  };

  return {
    loginUser,
    loggedOut,
    setIsLoggedIn,
    isLoggedIn,
    isLoading,
  };
}
