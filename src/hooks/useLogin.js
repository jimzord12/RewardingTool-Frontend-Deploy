import { useState } from "react";
// import { ZeroAddress } from "ethers";
// import { ethers } from "ethers";

// import useMetamask from "./useMetamask";
// import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
// import { web3StructToObj } from "../utils/web3StructToObj";

import { userAuth } from "api/api";

export function useLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { hasProvider, wallet } = useMetaMask();

  const loginUser = async (data) => {
    console.log("Logging in...");
    setIsLoading(true);
    // const convertedData = {
    //   name: data.name.value,
    //   password: data.password.value,
    //   email: data.email.value,
    //   wallet: data.wallet.value,
    // };
    // const response = await userAuth(data);
    // console.log("Logged in Response: ", response);
    // setIsLoading(false);
    // setIsLoggedIn(true);
    // return response;

    const timeout = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject("Timeout: Operation took longer than expected");
      }, 8000);
    });

    try {
      const response = await Promise.race([userAuth(data), timeout]);
      console.log("Logged in Response: ", response);
      setIsLoggedIn(true);
      return response;
    } catch (error) {
      console.log(error);
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
