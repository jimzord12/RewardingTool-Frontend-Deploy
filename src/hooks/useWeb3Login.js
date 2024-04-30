import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getRandomNum, validateSignedMsg } from "api/index";

// import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
// import { useGlobalContext } from "contexts/GlobalContextProvider";
import { toast } from "react-toastify";

import {
  loginProcessHandler,
  noAccountWarning,
} from "utils/LoginProcessHandler";
import { getPlayerByWallet } from "api";
import { resolveTypeReferenceDirective } from "typescript";

export async function getNonce() {
  try {
    const response = await getRandomNum();

    const nonce = response.nonce;
    return nonce;
  } catch (error) {
    console.error("⛔ (Express) Failed to fetch nonce:", error);
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

export function useWeb3Login(hasMetamask, provider, wallet) {
  // const { hasMetamask, provider, wallet } = useMetaMask();
  // const { userData, setUserData } = useGlobalContext();

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [signer, setSigner] = useState(null);

  // const { showToast } = useToastMsg();

  // useEffect(() => {
  //   async function fetchUserData() {
  //     try {
  //       getPlayerByWallet()
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   }

  //   console.log(isAuthenticated);
  //   console.log(userData.wallet);
  //   if (isAuthenticated && userData.wallet) {
  //     console.log("I am Running you guys!!!");
  //     fetchUserData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated, userData.wallet]);

  const signMessage = async () => {
    // Checks if wallet, provider, etc. exist
    const isWeb3Ready = loginProcessHandler("login", hasMetamask, wallet);
    let isTrueOwner = false;

    if (!isWeb3Ready) return;

    // Again bad naming, this is the random number from the WS
    const nonce = await getNonce();

    const message = `This is your generated random verification number: ${nonce}.\n \nNo action is required from your side concerning the random number. We simply show it for transparency reasons.\n \nBy allowing your Wallet to sign this message, using your private key, it can be proven that you are the true owner of this wallet, without the need for a password.\n \nPlease click "Sign" to proceed.`;

    console.log(provider);

    if (nonce && hasMetamask) {
      const wallet = new ethers.providers.Web3Provider(provider);
      const _signer = wallet.getSigner();

      const _signerAddr = await _signer.getAddress();
      // setSigner(_signer);

      const signedMessage = _signer.signMessage(message);

      try {
        console.log("The Message: ", message);

        const responsePromise = signedMessage
          .then((signedMessage) =>
            validateSignedMsg(message, _signerAddr, signedMessage)
          )
          .then((response) => {
            if (response.verified) {
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
                console.log(data);
                if (data.verified) {
                  isTrueOwner = true;
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

        return responsePromise;
      } catch (error) {
        console.error("Failed to verify signed message:", error);
      }
    }
  };

  return { signMessage };
}
