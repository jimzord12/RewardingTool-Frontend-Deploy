import { useEffect, useState } from "react";
import { axiosOracle } from "api/config";
import { ethers } from "ethers";
import axios from "axios";

import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import { useGlobalContext } from "contexts/GlobalContextProvider";
import { toast } from "react-toastify";
import { validateLocaleAndSetLanguage } from "typescript";

// import { getNonce } from "api/api";

const CustomErrorToast = ({ text, closeToast, toastProps }) => (
  <div style={{ background: "#yourColor", color: "#otherColor" }}>
    {text}
    {/* <button onClick={closeToast}>Close</button> */}
  </div>
);

export async function getNonce() {
  try {
    const response = await axios.get("http://localhost:3038/big-random-number");
    const nonce = response.data.randomBigNumber;
    return nonce;
  } catch (error) {
    console.error("⛔ (Express Oracle)Failed to fetch nonce:", error);
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
        // console.log("***********************************************");
        // console.log("Calling Contract (ViewTOkens) from [Web3Login]");
        // const _tokens = await callContractFn("viewYourPoints");
        // const userTokens_ = _tokens.toString().slice(0, -15);
        // const _userTokens_ = (parseInt(userTokens_) / 1000).toFixed(2);
        // const userTokens = isNaN(_userTokens_)
        // ? "Can't find MGS"
        // : _userTokens_;

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
    // if (wallet.chainId !== 20231) {
    if (wallet.chainId !== 31337) {
      toast.error(
        <CustomErrorToast text={"You are not on the GENERA Network"} />,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return console.log("useWeb3Login: ⛔ You are not on the GENERA Network");
    } // Is on Genera Network

    const nonce = await getNonce();
    const message = `This is your generated random verification number: ${nonce}.\n \nNo action is required from your side concerning the random number. It is required for the authentication operation.\n \nThis message is required to prove that you are the true owner of this wallet.\n \nPlease click "Sign" to proceed.`;

    console.log(provider);
    if (nonce && hasProvider) {
      const wallet = new ethers.providers.Web3Provider(provider);
      const _signer = wallet.getSigner();
      const _signerAddr = await _signer.getAddress();
      setSigner(_signer);
      //   toast(<CustomErrorToast text={"👀 Check Your Crypto Wallet"} />, {
      //     position: "top-center",
      //     autoClose: 4000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
      const signedMessage = _signer.signMessage(message);

      try {
        console.log("The Message: ", message);
        // const response = await axios.post(
        //   "http://localhost:3038/verify-signature",
        //   {
        //     nonce: message,
        //     userAddress: await _signer.getAddress(),
        //     signedMessage: signedMessage,
        //   }
        // );

        // setIsAuthenticated(response.data.verified);
        // if (response.data.verified) {
        //   console.log("The signature is valid!");
        //   setUserData((prev) => {
        //     return {
        //       ...prev,
        //       isLoggedIn: true,
        //     };
        //   });
        // } else {
        //   console.log("The signature is invalid!");
        // }

        const responsePromise = signedMessage
          .then((signedMessage) =>
            axios.post("http://localhost:3038/verify-signature", {
              nonce: message,
              //   nonce: "AAAAAA", // FOr testing
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
