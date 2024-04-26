import React from "react";
import { Button } from "reactstrap";
import { useLocation } from "react-router-dom";

import { useNavigation } from "hooks/useNavigation.js";
import useToastMsg from "hooks/useToastMsg.js";
import { useLWLogin } from "hooks/useLWLogin.js";
import { getMGSBalance } from "api/index.js";

const LoginButton = ({
  userData,
  setUserData,
  setTransactionModalOpen,
  usingLocalWallet,
}) => {
  const { navigate } = useNavigation();
  const location = useLocation();
  const { showToast } = useToastMsg();
  const { loginUser } = useLWLogin();

  return (
    <Button
      className="genera-login-singup-btn"
      color="success"
      target="_blank"
      onClick={async () => {
        if (location.pathname.includes("register")) {
          navigate("/rewards-page");
        } else {
          if (usingLocalWallet) {
            const walletAddr = userData.usingLocalWallet.account;
            // -- LOCAL WALLET -- //
            if (!walletAddr) {
              showToast(
                "Wallet Required",
                "To create one, use the 'Create Wallet' button",
                "error"
              );
            } else {
              try {
                const fetchedPlayerAndCardData = await loginUser(userData);
                const { success, balance } = await getMGSBalance(walletAddr);
                const { name } = fetchedPlayerAndCardData.player;
                const wallet = userData.usingLocalWallet;

                if (!success) {
                  throw new Error("Failed to fetch MGS Balance");
                }

                setUserData({
                  ...userData,
                  localWallet: { ...wallet },
                  name,
                  mgsTokens: balance,
                  isLoggedIn: true,
                  hasAccount: true,
                });
              } catch (error) {
                console.error("Login Error: ", error);
                showToast("Login Error", error.message, "error");
              }
              // Implement HandleLogin, see HomePageMetamask > handleOldPlayerETH ✨ Needs modification
            }
          } else {
            // -- METAMASK -- //
            // TODO: Implement HandleLogin, see HomePageMetamask > handleLogin ✨ Needs modification
          }
        }
      }}
    >
      <i className="tim-icons icon-key-25" />
      {usingLocalWallet ? "Import Wallet" : "Log In"}
    </Button>
  );
};

export default LoginButton;
