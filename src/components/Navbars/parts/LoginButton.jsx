import React from "react";
import { Button } from "reactstrap";
import { useLocation } from "react-router-dom";

import { useNavigation } from "hooks/useNavigation.js";
import useToastMsg from "hooks/useToastMsg.js";
import { useLWLogin } from "hooks/useLWLogin.js";
import { handlePlayerCreate } from "bigHandlers/handlePlayerCreate";
// import { useWeb3Login } from "hooks/useWeb3Login";
import { getPlayerByWallet } from "api";
import { getMGSBalance } from "api";
import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import { set } from "react-hook-form";

const LoginButton = (props) => {
  const { navigate } = useNavigation();
  const location = useLocation();
  const { showToast } = useToastMsg();
  // const { signMessage } = useWeb3Login();
  const { loginUser } = useLWLogin();
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
