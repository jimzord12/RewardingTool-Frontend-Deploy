import React from "react";
import { useNavigation } from "hooks/useNavigation.js";
import { Button } from "reactstrap";

const SignUpButton = ({ usingLocalWallet, userData }) => {
  const { navigate } = useNavigation();
  if (usingLocalWallet && !userData.localWallet.account) return null;
  return (
    <Button
      className="genera-login-singup-btn"
      color="primary"
      target="_blank"
      onClick={() => {
        usingLocalWallet
          ? navigate("/localWallet-register-page")
          : navigate("/metamask-register-page");
      }}
    >
      <i className="tim-icons icon-spaceship" /> Sign Up!
    </Button>
  );
};

export default SignUpButton;
