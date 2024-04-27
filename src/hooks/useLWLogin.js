import { useState } from "react";
import { getMGSBalance } from "api/index";

// import { ZeroAddress } from "ethers";
// import { ethers } from "ethers";

// import useMetamask from "./useMetamask";
// import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
// import { web3StructToObj } from "../utils/web3StructToObj";

import { getPlayerByWallet } from "../api/index";
import useToastMsg from "./useToastMsg";
import useLocalWallet from "./useLocalWallet";

export function useLWLogin(
  usingLocalWallet,
  setIsLoggedIn,
  setUserData,
  provider,
  setIsLoading
) {
  // const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastMsg();
  const { getEthBalance_2 } = useLocalWallet(provider);

  const loginUserLocalWallet = async (userData) => {
    console.log("Logging in...", userData);
    setIsLoading(true);

    if (!usingLocalWallet) {
      showToast("Login Error", "Local Wallet is not enabled.", "error");
      throw new Error(
        "useLWLogin => loginUser> Local Wallet Mode is not active."
      );
    }

    if (userData.currentWalletMethod !== "local") {
      showToast("Login Error", "The login method is not 'local'", "error");
    }

    if (userData.isLoggedIn) {
      showToast("Login", "You are already logged in.", "info");
    }

    if (!userData.localWallet.account) {
      showToast("Login", "No Local Wallet found.", "error");
      throw new Error("useLWLogin => loginUser> Wallet has no accounts.");
    }

    const timeout = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject("Timeout: Operation took longer than expected");
      }, 8000);
    });

    try {
      const response = await Promise.race([
        getPlayerByWallet(userData.localWallet.account),
        timeout,
      ]);
      console.log("1. useLWLogin | Server Response: ", response);
      const walletAddress = response.player.wallet;
      console.log("2. useLWLogin | Server Response: ", walletAddress);
      console.log("3. useLWLogin | Params: ", userData);

      const balanceEth = await getEthBalance_2(walletAddress);
      const { balance: mgsBalance } = await getMGSBalance(walletAddress);
      setUserData((prev) => {
        return {
          ...prev,
          ...response,
          name: response.player.name,
          mgsTokens: mgsBalance,
          localWallet: {
            account: walletAddress,
            balance: balanceEth,
          },
          isLoggedIn: true,
          hasAccount: true,
          currentWalletMethod: "local",
        };
      });
      setIsLoggedIn(true);
      // return response;
    } catch (error) {
      console.log("Login Error: ", error);
      throw error;
    } finally {
      setIsLoading(false); // Set loading to false even on error.
    }
  };

  const loggedOut = () => {
    setIsLoggedIn(false);
    setUserData({
      name: undefined,
      mgsTokens: undefined,
      metamaskWallet: {
        accounts: [],
        balance: "",
        chainId: "",
      },
      localWallet: {
        account: "",
        balance: "",
      },
      isLoggedIn: false,
      hasAccount: false,
      currentWalletMethod: "metamask",
    });
  };

  return {
    loginUserLocalWallet,
    loggedOut,
  };
}
