/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { formatBalance, formatChainAsNum } from "../../utils/index";

import { generaChain } from "constants/chainDetails";

const mm = window.ethereum;
const disconnectedState = { accounts: [], balance: "", chainId: "" };

const MetaMaskContext = createContext();

export const MetaMaskContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [hasProvider, setHasProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [hasMetaMaskRun, setHasMetaMaskRun] = useState(false);

  const [wallet, setWallet] = useState(disconnectedState);
  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts) => {
    const accounts =
      providedAccounts || (await mm.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return null;
    }

    // Retrieving User Balance
    const balance = formatBalance(
      await mm.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );

    const chainId = formatChainAsNum(
      await mm.request({
        method: "eth_chainId",
      })
    );

    setWallet({ accounts, balance, chainId });
    return { accounts, balance, chainId };
  }, []);

  const updateWalletAndAccounts = useCallback(
    () => _updateWallet(),
    [_updateWallet]
  );
  const updateWallet = useCallback(
    (accounts) => _updateWallet(accounts),
    [_updateWallet]
  );

  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      console.log("1.1 Detecting Wallet Provider...");
      const _provider = await detectEthereumProvider({ silent: true });
      // console.log("MetaMask Context: Provider: ", provider);
      _provider === null
        ? console.log("1.2 ❌ Provider (Missing)")
        : console.log("1.2 ✅ The Provider (Active): ", _provider);

      setProvider(_provider);
      setHasProvider(Boolean(_provider));

      if (_provider) {
        const _wallet = await updateWalletAndAccounts();
        if (_wallet === null) {
          console.log("2.1 User is NOT Connected");
        } else {
          console.log("2.2 The User Details: ", _wallet);
        }
        console.log(
          "2.3 Adding Wallet Event Listeners: (accountsChanged, chainChanged)..."
        );
        mm.on("accountsChanged", updateWallet);
        mm.on("chainChanged", updateWalletAndAccounts);
        console.log("2.4 ✅ Wallet Event Listeners added Successfully!");
        console.log("--------------------------------------------------");
      }
      setHasMetaMaskRun(true);
    };

    getProvider();

    return () => {
      mm?.removeListener("accountsChanged", updateWallet);
      mm?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await mm.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  // Handles adding a new network.
  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [generaChain],
      });
    } catch (addError) {
      console.error(addError);
    }
  };

  // Handles switching to a different network.
  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: generaChain.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        console.error("This chain does not exist.");
      } else {
        console.error(switchError);
      }
    }
  };

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        provider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
        hasMetaMaskRun,
        addNetwork,
        switchNetwork,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      'useMetaMask must be used within a "MetaMaskContextProvider"'
    );
  }
  return context;
};
