import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { axiosOracle } from "api/config";

import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import { useGlobalContext } from "contexts/GlobalContextProvider";
import { toast } from "react-toastify";
// import { axiosOracle } from "api/config";

import {
  loginProcessHandler,
  noAccountWarning,
} from "utils/LoginProcessHandler";

export async function getNonce() {
  try {
    const response = await axiosOracle.get("/big-random-number");
    const nonce = response.data.randomBigNumber;
    return nonce;
  } catch (error) {
    console.error("⛔ (Express Oracle) Failed to fetch nonce:", error);
    toast.error(
      "We are experiencing issues with the Web Server, please try again later",
      {
        position: "top-center",
        autoClose: 12000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
    return null;
  }
}

export function useWeb3Login() {
  const { hasProvider, provider, wallet } = useMetaMask();
  const { userData, setUserData, callContractFn } = useGlobalContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const _userObj = await callContractFn("users", userData.wallet);
        console.log(_userObj);

        console.log("(Web3Login): The user obj from contract: ", _userObj);

        if (_userObj[2] === "") {
          noAccountWarning();
          setUserData((prev) => {
            return {
              ...prev,
              name: "No Account",
            };
          });
          return;
        }

        const _isManager = await callContractFn(
          "checkManagerRole",
          userData.wallet
        );

        const _isOwner = await callContractFn(
          "checkOwnerRole",
          userData.wallet
        );
        // const _pendingRewards = await callContractFn(
        //   "getUserProducts",
        //   userData.wallet
        // );

        setUserData((prev) => {
          return {
            ...prev,
            name: _userObj[2],
            // tokens: (parseInt(userTokens) / 1000).toFixed(2),
            // pendingRewards: _pendingRewards,
            accessLevel: _isManager ? "manager" : _isOwner ? "owner" : "",
          };
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    console.log(isAuthenticated);
    console.log(userData.wallet);
    if (isAuthenticated && userData.wallet) {
      console.log("I am Running you guys!!!");
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, userData.wallet]);

  const signMessage = async () => {
    
    // Checks if wallet, provider, etc. exist
    const isWeb3Ready = loginProcessHandler("login", hasProvider, wallet);

    if (!isWeb3Ready) return;

    // Again bad naming, this is the random number from the WS
    const nonce = await getNonce();

    const message = `This is your generated random verification number: ${nonce}.\n \nNo action is required from your side concerning the random number. We simply show it for transparency reasons.\n \nBy allowing your Wallet to sign this message, using your private key, it can be proven that you are the true owner of this wallet, without the need for a password.\n \nPlease click "Sign" to proceed.`;

    console.log(provider);
    
    if (nonce && hasProvider) {
      const wallet = new ethers.providers.Web3Provider(provider);
      const _signer = wallet.getSigner();
      
      const _signerAddr = await _signer.getAddress();
      setSigner(_signer);

      const signedMessage = _signer.signMessage(message);

      try {
        console.log("The Message: ", message);

        const responsePromise = signedMessage
          .then((signedMessage) =>
            axiosOracle.post("/verify-signature", {
              nonce: message,
              //   nonce: "AAAAAA", // FOr testing: to get an Error
              userAddress: _signerAddr,
              signedMessage: signedMessage,
            })
          )
          .then((response) => {
            if (response.data.verified) {
              return response;
            } else {
              throw new Error("Signature verification failed");
            }
          });

        toast.promise(
          responsePromise,
          {
            pending: "Sign this message and await for verification...",
            success: {
              render: ({ data }) => {
                console.log(data.data);
                setIsAuthenticated(data.data.verified);
                if (data.data.verified) {
                  setUserData((prev) => {
                    return {
                      ...prev,
                      isLoggedIn: true,
                      wallet: _signerAddr,
                    };
                  });
                  return "Your signature is valid! Welcome ";
                } else {
                  return "The signature is invalid!";
                }
              },
            },
            error: "Failed to verify signed message",
          },
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } catch (error) {
        console.error("Failed to verify signed message:", error);
      }
    }
  };

  return { isAuthenticated, signMessage };
}
