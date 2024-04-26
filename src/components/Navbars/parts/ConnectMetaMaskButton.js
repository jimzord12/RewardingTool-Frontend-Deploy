import React from "react";
import { toast } from "react-toastify";
import { Button } from "reactstrap";

import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import CustomToast from "./CustomNavBarToast";
import { loginProcessHandler } from "utils/LoginProcessHandler";

const ConnectMetaMaskButton = () => {
  const {
    wallet: metamaskWallet,
    hasMetamask,
    connectMetaMask,
  } = useMetaMask();

  return (
    <Button
      className={`genera-login-singup-btn nav-bar-connect-btn ${
        hasMetamask ? "" : "wobble-hor-bottom"
      }`}
      color="warning"
      target="_blank"
      onClick={() => {
        if (metamaskWallet.accounts.length > 0) {
          toast(
            <CustomToast
              text={"If you want to Disconnect, you can do it from your Wallet"}
            />,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        } else {
          const isWeb3Ready = loginProcessHandler(
            "connect",
            hasMetamask,
            metamaskWallet
          );
          if (isWeb3Ready) connectMetaMask();
          if (
            (metamaskWallet.chainId !== "") &
            (metamaskWallet.chainId !== undefined)
          ) {
            toast(
              <CustomToast
                text={
                  "If you want to Disconnect, you can do it from your Wallet"
                }
              />,
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        }
      }}
    >
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "row",
      // }}
      >
        <i className="tim-icons icon-wallet-43 hide-icons" />{" "}
        {/* 
  1. Checkes if User is connected by checking if the wallet has an chainId property with any value
  2. If this fails, checks if the user possess a wallet in general 
*/}
        {metamaskWallet.chainId !== ""
          ? "Connected ✔"
          : hasMetamask
          ? "Connect"
          : "No Wallet 😑"}
      </div>
    </Button>
  );
};

export default ConnectMetaMaskButton;
