import { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

function DEAD_useMetamask() {
  const [provider, setProvider] = useState(null);

  const hasMetamask = () => {
    return provider !== null;
  };

  const fetchProvider = async () => {
    const detectedProvider = await detectEthereumProvider({ silent: true });
    setProvider(detectedProvider);
    return detectedProvider;
  };

  const isConnected = async (provider) => {
    if (provider) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      return accounts.length > 0;
    }

    return false;
  };

  const getAccount = async (provider) => {
    if (provider) {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      console.log("DEAD_useMetamask: getAccount(): acoounts: ", accounts);
      return accounts.length > 0 ? accounts[0] : null;
    }
    return null;
  };

  const getAllAccounts = async (provider) => {
    console.log(provider);
    if (provider) {
      // ethereum.request({ method: 'eth_requestAccounts' });
      // You can replace 'ethereum' with 'provider' if you want to be more specific
      return provider.request({ method: "eth_requestAccounts" });
    }

    return null;
  };

  return {
    hasMetamask,
    isConnected,
    getAllAccounts,
    getAccount,
    fetchProvider,
  };
}

export default DEAD_useMetamask;
