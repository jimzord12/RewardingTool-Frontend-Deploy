import React from "react";
import { Button } from "reactstrap";
import { useLocation } from "react-router-dom";

import { useNavigation } from "hooks/useNavigation.js";
import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";

const LoginButton = (props) => {
  const { navigate } = useNavigation();
  const location = useLocation();
  const { metamaskLogin } = useMetaMask();

  return (
    <Button
      className="genera-login-singup-btn"
      color="success"
      target="_blank"
      onClick={async () => {
        if (location.pathname.includes("register")) {
          navigate("/rewards-page");
          return;
        }

        if (props.usingLocalWallet) {
          navigate("/localWallet-import-page");
        } else {
          // -- METAMASK -- //
          // TODO: Implement HandleLogin, see HomePageMetamask > handleLogin ✨ Needs modification
          console.log("Login Button | UserData:", props.userData);
          const { success, player, cards, mgsBalance } = await metamaskLogin();
          console.log("Login Button | Success:", success);
          if (success)
            props.setUserData((prev) => ({
              ...prev,
              name: player.name,
              player: player,
              cards: cards,
              mgsTokens: mgsBalance,
              isLoggedIn: true,
              hasAccount: true,
            }));
        }
      }}
    >
      <i className="tim-icons icon-key-25" />
      {props.usingLocalWallet ? "Import Wallet" : "Log In"}
    </Button>
  );
};

export default LoginButton;
