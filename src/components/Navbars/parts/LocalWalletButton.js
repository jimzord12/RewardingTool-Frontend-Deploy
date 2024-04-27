import React from "react";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

import CustomToast from "./CustomNavBarToast";
// import { loginProcessHandler } from "utils/LoginProcessHandler";

const LocalWalletButton = ({
  userData,
  showLWModal,
  generateWallet,
  provider,
  getEthBalance,
  setUserData,
}) => {
  const localWalletExists = userData.localWallet.account ? true : false;

  const hancleClick = async () => {
    if (localWalletExists) {
      // TODO: Show Local Wallet Modal
      console.log("🧪 1. Displaying Local Wallet Modal...");
      console.log("🧪 2. User Data: ", userData);
      // toast(
      //   <CustomToast
      //     text={"If you want to Disconnect, you can do it from your Wallet"}
      //   />,
      //   {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   }
      // );
    } else {
      const walletAddress = generateWallet();

      const balance = await getEthBalance(walletAddress);
      setUserData((prev) => ({
        ...prev,
        localWallet: { account: walletAddress, balance },
        currentWalletMethod: "local",
      }));
      toast(<CustomToast text={"Local Wallet Successfully Created!"} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // else {
    //   const isWeb3Ready = loginProcessHandler(
    //     "connect",
    //     hasMetamask,
    //     metamaskWallet
    //   );
    //   if (isWeb3Ready) connectMetaMask();
    //   if (
    //     (metamaskWallet.chainId !== "") &
    //     (metamaskWallet.chainId !== undefined)
    //   ) {
    //     toast(
    //       <CustomToast
    //         text={"If you want to Disconnect, you can do it from your Wallet"}
    //       />,
    //       {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       }
    //     );
    //   }
    // }
  };

  return (
    <Button
      className={`genera-login-singup-btn nav-bar-connect-btn ${
        localWalletExists ? "" : "wobble-hor-bottom"
      }`}
      color="warning"
      target="_blank"
      onClick={hancleClick}
    >
      <div>
        <i className="tim-icons icon-wallet-43 hide-icons" />{" "}
        {/* 
  1. Checkes if User is connected by checking if the wallet has an chainId property with any value
  2. If this fails, checks if the user possess a wallet in general 
*/}
        {localWalletExists ? "Local Wallet" : "Create Wallet"}
      </div>
    </Button>
  );
};

export default LocalWalletButton;
