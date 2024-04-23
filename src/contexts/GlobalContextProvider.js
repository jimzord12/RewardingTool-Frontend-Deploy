/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
// import { ethers } from "ethers";
import { Triangle } from "react-loader-spinner";

import { useMetaMask } from "./web3/MetaMaskContextProvider";
import useContract from "hooks/useContract";
// import { contractAddress, abi } from "../web3/constants/index";
import {
  deployedContractAddresses,
  Rewarding_ABI,
  MGS_ABI,
} from "../web3/constants/index";

import { ReactComponent as MetamaskIcon } from "../assets/img/genera/metamask.svg";
// import { LogDescription } from "ethers/lib/utils";
// ✨ import { copyToClipboard } from "utils/copy2clipboard";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [MGScontract, setMGSContract] = useState(null);

  const [RTcontract, setRTContract] = useState(null);
  const [usingLocalWallet, setUsingLocalWallet] = useState(false); // False: Metamask, True: Local

  const [userData, setUserData] = useState({
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

  // ---- End of State Variables Init ----

  useEffect(() => {
    console.log("GlobalContext | UsingLocalWallet", usingLocalWallet);
  }, [usingLocalWallet]);

  // Hooks
  const {
    wallet,
    provider: metamaskProvider,
    hasMetamask,
    hasMetaMaskRun,
  } = useMetaMask();

  // TODO:
  const { initialize /* isLoading  */ } = useContract(
    metamaskProvider,
    deployedContractAddresses.RewardingToolAddress,
    Rewarding_ABI.abi,
    usingLocalWallet
  );

  // console.log("1. MGS Contract - Address", MGSAddress);
  // console.log("2. MGS Contract - ABI", MGS_ABI.abi);

  const { initialize: initializeMGS /* isLoading  */ } = useContract(
    metamaskProvider,
    deployedContractAddresses.ERC20ContractAddress,
    MGS_ABI.abi,
    usingLocalWallet
  );

  useEffect(() => {
    console.log("1. From GlobalContext | hasMetaMaskRun: ", hasMetaMaskRun);
    console.log("2. From GlobalContext | hasMetamask: ", hasMetamask);
    console.log("3. From GlobalContext | wallet: ", wallet);
    console.log("4. From GlobalContext | contract: ", RTcontract);
  }, []);

  async function callRTContractFn(fnName, ...args) {
    if (typeof fnName !== "string")
      throw new Error(
        `💎 callContractFn: Invalid Arg Type. (${fnName}) must be of type string, however the received argument's type is: (${typeof fnName})`
      );
    try {
      console.log("===============================================");

      console.log("1. Calling: (", fnName, ")");
      console.log("2. Args: (", ...args, ")");
      if (RTcontract === null) {
        console.log("callContractFn: Contract was NOT initialized");
        console.log("callContractFn: Initialzing Contract...");
        const _contract = await initialize();
        setRTContract(_contract);
        console.log("callContractFn: ✅ Contract Initialized! ");
        console.log("callContractFn: The contract: ", _contract);
        return args.length === 0
          ? RTcontract[fnName]()
          : RTcontract[fnName](...args);
      } else {
        // console.log("callContractFn: The contract: ", contract);
        console.log("===============================================");

        return args.length === 0
          ? RTcontract[fnName]()
          : RTcontract[fnName](...args);
      }
    } catch (err) {
      setError(err);
      console.error("💎 (Global): Contract Error: ", err);
    }
  }

  async function callMGSContractFn(fnName, ...args) {
    console.log("gggggggggsss: ", MGScontract);

    if (typeof fnName !== "string")
      throw new Error(
        `💎 MGS - callContractFn: Invalid Arg Type. (${fnName}) must be of type string, however the received argument's type is: (${typeof fnName})`
      );
    try {
      console.log("===============================================");

      console.log("1. Calling: (", fnName, ")");
      console.log("2. Args: (", ...args, ")");
      if (MGScontract === null) {
        console.log("MGS - callContractFn: Contract was NOT initialized");
        console.log("MGS - callContractFn: Initialzing Contract...");
        const _MGScontract = await initializeMGS();
        setMGSContract(_MGScontract);
        console.log("MGS - callContractFn: ✅ Contract Initialized! ");
        console.log("MGS - callContractFn: The contract: ", _MGScontract);
        return args.length === 0
          ? _MGScontract[fnName]()
          : _MGScontract[fnName](...args);
      } else {
        // console.log("MGS - callContractFn: The contract: ", contract);
        console.log("===============================================");
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        return args.length === 0
          ? MGScontract[fnName]()
          : MGScontract[fnName](...args);
      }
    } catch (err) {
      setError(err);
      console.error("💎 Contract Error: ", err);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        error,
        callRTContractFn,
        callMGSContractFn,
        userData,
        setUserData,
        setUsingLocalWallet,
        usingLocalWallet,
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
