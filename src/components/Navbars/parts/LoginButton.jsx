import React from "react";
import { Button } from "reactstrap";
import { useLocation } from "react-router-dom";

import { useNavigation } from "hooks/useNavigation.js";
import useToastMsg from "hooks/useToastMsg.js";
import { useLWLogin } from "hooks/useLWLogin.js";

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
        if (location.pathname.includes("register")) navigate("/rewards-page");

        if (usingLocalWallet) {
          navigate("/localWallet-import-page");
        } else {
          // -- METAMASK -- //
          // TODO: Implement HandleLogin, see HomePageMetamask > handleLogin ✨ Needs modification
        }
      }}
    >
      <i className="tim-icons icon-key-25" />
      {usingLocalWallet ? "Import Wallet" : "Log In"}
    </Button>
  );
};

export default LoginButton;
