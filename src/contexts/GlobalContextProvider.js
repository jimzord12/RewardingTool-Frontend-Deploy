/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

import { useMetaMask } from "./web3/MetaMaskContextProvider";
import useContract from "hooks/useContract";
import { contractAddress, abi } from "../web3/constants/index";

import { ReactComponent as MetamaskIcon } from "../assets/img/genera/metamask.svg";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenEventFired, setTokenEventFired] = useState(false);
  const [contractInitCompleted, setContractInitCompleted] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: undefined,
    tokens: undefined,
    wallet: undefined,
    accessLevel: undefined,
    isLoggedIn: false,
    pendingRewards: [],
  });

  const [rewards, setRewards] = useState([]);
  // Reward Data Structure
  /*
    id: undefined,
    price: undefined,
    amount: undefined,
    isEmpty: undefined,
    isInfinite: undefined,
    isDisabled: undefined,
    name: undefined,
    location: undefined
  */

  // Hooks
  const {
    wallet,
    provider,
    hasProvider,
    /*
    error: MetaMaskError,
    errorMessage,
    isConnecting,
    connectMetaMask,
    clearError,
    */
    hasMetaMaskRun,
  } = useMetaMask();

  const { initialize /* isLoading  */ } = useContract(
    provider,
    contractAddress,
    abi
  );

  async function updateUserTokens() {
    const userTokens = await contract.viewYourPoints();
    console.log("The new MGS balance: ", userTokens.toNumber());
    // console.log(userTokens.toNumber());
    setUserData((prev) => {
      return { ...prev, tokens: userTokens.toNumber() };
    });
  }

  async function getRewards() {
    try {
      const rewards = await contract.getAllProducts(); // Returns all an Array containing all products
      setIsProductsLoading(false);
      setRewards(rewards);
    } catch (error) {}
  }

  async function attachEventListeners() {
    // console.log("1) Is Contract not Null: ", contract !== null); // true
    // console.log("2) Is Chain ID correct: ", wallet.chainId === 20231); // true
    // console.log("3) The Contract: ", contract); // Proxy(Contract) {...} its correct

    // Adding Contract Event Listeners
    if (contract !== null && wallet.chainId === 20231) {
      try {
        // Event #1 - User Creation
        contract.on("UserCreation", (id, account, name, event) => {
          console.log("Event Captured: User Creation");
          console.log(id.toNumber(), account, name.toString());
          console.log(event.blockNumber);

          // if (name)
        });
        console.log("(1/5) ✅ UserCreation - Event Attached");

        // contract.on("*", (id, account, name, event) => {
        //   console.log("Event Captured: User Creation");
        //   console.log(id.toNumber(), account, name.toString());
        //   console.log(event.blockNumber);
        // });
        // console.log("* ✅ Event Attached"); // Gets printed

        // Event #2 - Service Creation
        contract.on("ServiceCreation", (id, name, event) => {
          console.log("Event Captured: Service Creation");
          console.log(id.toNumber(), name.toString());
          console.log(event.blockNumber);
        });
        console.log("(2/5) ✅ ServiceCreation - Event Attached");

        // Event #3 - Event Creation
        contract.on("EventCreation", (id, name, serviceName, event) => {
          console.log("Event Captured: Event Creation");
          console.log(id.toNumber(), name.toString(), serviceName.toString());
          console.log(event.blockNumber);
        });
        console.log("(3/5) ✅ EventCreation - Event Attached");

        // Event #4 - A User was awared MGS Tokens
        contract.on("PointsGained", (account, amount, event) => {
          console.log("Event Captured: Points Gained");
          console.log(account, amount.toNumber());
          console.log(event.blockNumber);

          // if (account === userData.wallet)
          updateUserTokens();
          setTokenEventFired(true);
        });
        console.log("(4/5) ✅ PointsGained - Event Attached");

        // Event #5 - A User spent MGS Tokens
        contract.on(
          "PointsRedeemed",
          (account, serviceName, _productPrice, _totalPoints_before, event) => {
            console.log("Event Captured: Points Redeemed");
            console.log(
              account,
              serviceName.toString(),
              _productPrice.toNumber(),
              _totalPoints_before.toNumber()
            );
            console.log(event.blockNumber);
          }
        );
        console.log("(5/5) ✅ PointsRedeemed - Event Attached");
      } catch (error) {
        console.log("5.1.1 🐛 Error with Contract Listeners: ", error);
      }

      console.log("5.2 ✅ Successfully Added All Event Listeners");

      const count = await contract.listenerCount();
      console.log(
        "There are: (",
        count,
        ") event listeners in this Contract Instance currently."
      ); // It returns 0
    }
  }

  useEffect(() => {
    if (
      hasMetaMaskRun &&
      hasProvider &&
      wallet.chainId === 20231 &&
      contract === null
    ) {
      console.log("3.1 Wallet from MetaMask Context: ", wallet);

      (async () => {
        try {
          console.log("4.1 Initializing Contract Instance...");
          const _contract = await initialize();
          setContract(_contract);
          setContractInitCompleted(true);
          console.log(_contract);
          console.log("4.2 ✅ Contract Instance Completed!");
          console.log("------------------------------------------");
          console.log("5.1 Adding Event Listeners...");
        } catch (error) {
          console.error("💎 From: (GlobalContextProvider), useEffect: ", error);
          console.log(
            `📜 Global Context Provider: ${
              hasProvider
                ? "User is on the wront network (Chain ID: " +
                  wallet.chainId +
                  ")"
                : "User does not have wallet"
            }`
          );
        }
      })();
    }

    if (contract !== null)
      (async () => {
        await attachEventListeners();
      })();

    return function cleanUp() {
      if (contract) {
        contract.removeAllListeners("UserCreation");
        contract.removeAllListeners("ServiceCreation");
        contract.removeAllListeners("EventCreation");
        contract.removeAllListeners("PointsGained");
        contract.removeAllListeners("PointsRedeemed");
      }
    };
  }, [hasMetaMaskRun, wallet.chainId, userData.tokens, contract]);

  async function fetchServerData(action, ...args) {
    try {
      const response = await axios.get(action);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
    }
  }

  async function callContractFn(fnName, ...args) {
    if (typeof fnName !== "string")
      throw new Error(
        `💎 callContractFn: Invalid Arg Type. (${fnName}) must be of type string, however the received argument's type is: (${typeof fnName})`
      );
    try {
      console.log("5.1 Trying to call the Contract function: (", fnName, ")");
      if (contract === null) {
        console.log("5.2.1 Contract was NOT initialized");
        console.log("5.2.2 Initialzing Contract...");
        const _contract = await initialize();
        setContract(_contract);
        console.log("5.2.3 ✅ Contract Initialized! ");
        return _contract[fnName](...args);
      } else {
        return contract[fnName](...args);
      }
    } catch (err) {
      setError(err);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        data,
        error,
        callContractFn,
        fetchServerData,
        userData,
        setUserData,
        tokenEventFired,
        setTokenEventFired,
        contract,
        contractInitCompleted,
        rewards,
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
