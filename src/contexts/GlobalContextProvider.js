/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { Triangle } from "react-loader-spinner";

import { useMetaMask } from "./web3/MetaMaskContextProvider";
// import useContract from "hooks/useContract";
// // import { contractAddress, abi } from "../web3/constants/index";
// import {
//   deployedContractAddresses,
//   Rewarding_ABI,
//   MGS_ABI,
// } from "../web3/constants/index";
import { getMGSBalance } from "api/index";

import { ReactComponent as MetamaskIcon } from "../assets/img/genera/metamask.svg";
import useLocalWallet from "hooks/useLocalWallet";
import { toast } from "react-toastify";
import CustomToast from "components/Navbars/parts/CustomNavBarToast";
import { useLWLogin } from "hooks/useLWLogin";
import { set } from "react-hook-form";
// import { LogDescription } from "ethers/lib/utils";
// ✨ import { copyToClipboard } from "utils/copy2clipboard";

const GlobalContext = createContext();

const provider = new ethers.providers.JsonRpcProvider(
  "https://snf-34965.ok-kno.grnetcloud.net"
);

export const GlobalContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [MGScontract, setMGSContract] = useState(null);

  const [RTcontract, setRTContract] = useState(null);
  const [usingLocalWallet, setUsingLocalWallet] = useState(false); // False: Metamask, True: Local

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: undefined,
    playerData: undefined,
    mgsTokens: undefined,
    cards: [],
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

  // ---- End of State Variables Init ----

  useEffect(() => {
    console.log("GlobalContext | UsingLocalWallet", usingLocalWallet);
  }, [usingLocalWallet]);

  // Hooks
  const {
    wallet: metamaskWallet,
    provider: metamaskProvider,
    hasMetamask,
    hasMetaMaskRun,
  } = useMetaMask();

  const { loginUserLocalWallet } = useLWLogin(
    usingLocalWallet,
    setUserData,
    provider,
    setIsLoading
  );

  const {
    wallet: localWallet,
    setWallet,
    deleteWallet,
    generateWallet,
    retrieveWallet,
    balance,
    getEthBalance,
    getEthBalance_2,
    automaticLogin,
  } = useLocalWallet(provider);

  React.useEffect(() => {
    if (usingLocalWallet) {
      setUserData({
        name: undefined,
        mgsTokens: undefined,
        cards: [],
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
        currentWalletMethod: "local",
      });

      // TODO:
      // 1. Try to find the user's local wallet in the LS (if it exists)
      (async () => {
        const { localWalletExist, playerData, error, walletAddress } =
          await automaticLogin();

        if (!localWalletExist) {
          setUserData((prev) => ({ ...prev, currentWalletMethod: "local" }));
          return;
        } else if (error === "Player not found") {
          toast(
            <CustomToast
              text={
                "Wallet found but User not found, you need to create an account"
              }
            />,
            {
              position: "top-right",
              autoClose: 8000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );

          const balance = await getEthBalance(walletAddress);
          // console.log("getEthBalance: ", balance);

          setUserData((prev) => ({
            ...prev,
            localWallet: { account: walletAddress, balance: balance },
            currentWalletMethod: "local",
          }));
          return;
        } else {
          const balanceEth = await getEthBalance_2(walletAddress);
          const { balance: mgsBalance } = await getMGSBalance(walletAddress);
          console.log("asdadas: ", mgsBalance, balanceEth, walletAddress);
          setUserData((prev) => ({
            ...prev,
            name: playerData.player.name,
            cards: playerData.cards,
            playerData: playerData.player,
            mgsTokens: mgsBalance,
            localWallet: { account: walletAddress, balance: balanceEth },
            isLoggedIn: true,
            hasAccount: true,
            currentWalletMethod: "local",
          }));
        }
      })();
    } else {
      console.log(" -🎁- Metamask Wallet: ", metamaskWallet);
      setUserData({
        name: undefined,
        mgsTokens: undefined,
        metamaskWallet: {
          accounts: metamaskWallet.accounts,
          balance: metamaskWallet.balance,
          chainId: metamaskWallet.chainId,
        },
        localWallet: {
          account: "",
          balance: "",
        },
        isLoggedIn: false,
        hasAccount: false,
        currentWalletMethod: "metamask",
      });

      // setUserData((prev) => ({ ...prev, currentWalletMethod: "metamask" }));
    }
  }, [usingLocalWallet, metamaskWallet.accounts[0]]);


  return (
    <GlobalContext.Provider
      value={{
        error,
        // callRTContractFn,
        // callMGSContractFn,
        userData,
        setUserData,
        setUsingLocalWallet,
        usingLocalWallet,
        provider,
        loginUserLocalWallet,
        isLoading,
        localWallet,
        retrieveWallet,
      }}
    >
      {hasMetaMaskRun ? (
        <>{children}</>
      ) : (
        <div className="center-of-screen">
          <h3>Searching for your Crypto Wallet...</h3>
          <div className="flex-center">
            <Triangle
              height="200"
              width="200"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
            <MetamaskIcon
              className="center-of-screen metamask-logo-spinner"
              style={{ width: 50, height: 50, zIndex: 10 }}
            />
          </div>
        </div>
      )}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}
