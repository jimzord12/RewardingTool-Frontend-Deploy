import React from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingButtonInfo from "components/custom/LoadingButton/LoadingButtonInfo.js";

// Hooks
import { useNavigation } from "hooks/useNavigation.js";
import { useMetaMask } from "../../contexts/web3/MetaMaskContextProvider.js";
import { useGlobalContext } from "contexts/GlobalContextProvider.js";
import { useWeb3Login } from "hooks/useWeb3Login.js";
import { copyToClipboard } from "utils/copy2clipboard.js";
import { loginProcessHandler } from "utils/LoginProcessHandler.js";

import { deployedContractAddresses } from "web3/constants/deployedContracts.js";
import CustomToast from "./parts/CustomNavBarToast.js";

import { useLogin } from "hooks/useLogin.js";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  // NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import SwitchButton from "components/custom/SwitchButton/SwitchButton.jsx";
import LoginButton from "./parts/LoginButton.jsx";
import { set } from "react-hook-form";

export default function ExamplesNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [tokenEventAnimate, setTokenEventAnimate] = React.useState(false);
  const [hasEffectRun, setHasEffectRun] = React.useState(false);

  const { wallet, hasMetamask, connectMetaMask } = useMetaMask();

  const { navigate } = useNavigation();
  const location = useLocation();
  const { isLoading } = useLogin();
  const {
    userData,
    setUserData,
    callContractFn,
    tokenEventFired,
    setTokenEventFired,
    setUsingLocalWallet,
    usingLocalWallet,
  } = useGlobalContext();
  const { isAuthenticated, signMessage } = useWeb3Login();

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);

    return function cleanup() {
      window.removeEventListener("scroll", changeColor); //123456678asdhu
    };
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) {
      console.log("is user authenticated: ", isAuthenticated);
      console.log("User's Data: ", userData);
    }
  }, [isAuthenticated, userData.tokens]);

  React.useEffect(() => {
    if (usingLocalWallet) {
      // 1. Try to find the user's local wallet in the LS (if it exists)
      // 1.1 If it exists:
      //    1.1.1 Set the user's data to the wallet's data (setUserData)
      //    1.1.2 Try to automatically login the user (useLWLogin.loginUser)
      // 1.2 If it doesn't exist, set the user's data to the default data
      setUserData((prev) => ({ ...prev, currentWalletMethod: "local" }));
    } else {
      setUserData((prev) => ({ ...prev, currentWalletMethod: "metamask" }));
    }
  }, [usingLocalWallet]);

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };

  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };

  const onCollapseExited = () => {
    setCollapseOut("");
  };

  const handleValidation = () => {
    navigate("/validation-page");
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container style={{}}>
        {/* <ConnectModal /> */}
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>GENERA• </span>
            Rewarding Tool
          </NavbarBrand>
          {/* <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Creative Tim
          </UncontrolledTooltip> */}
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-around " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  GENERA•Rewarding Tool
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            {!isAuthenticated && !userData.isLoggedIn && (
              <NavItem className="">
                <LoginButton />
              </NavItem>
            )}

            {/* If User is on the <Register Page?, Do not show the <Register> Button AND is NOT Logged In */}
            {!location.pathname.includes("register") &&
              (userData.name === undefined ||
                userData.name === "No Account") && (
                // {true && (
                <NavItem>
                  <Button
                    className="genera-login-singup-btn"
                    color="primary"
                    target="_blank"
                    onClick={() => {
                      navigate("/register-page");
                    }}
                  >
                    <i className="tim-icons icon-spaceship" /> Sign Up!
                  </Button>
                </NavItem>
              )}

            {/* ************************************************************************ */}

            {/* If User is on the <Rewards Page> AND IS Logged In => Show User's Name + MGS Balance */}
            {/* {true && ( */}
            {location.pathname.includes("rewards") && userData.isLoggedIn && (
              <>
                <NavItem>
                  <LoadingButtonInfo
                    isLoading={isLoading}
                    onClick={() => navigate("/user-rewards-page")}
                  >
                    <div
                      className={`user-details ${
                        tokenEventAnimate ? "vibrate-3" : ""
                      }`}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 6,
                        }}
                      >
                        <i className="fa fa-user hide-icons" /> {userData.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 6,
                        }}
                      >
                        <i className="icon tim-icons icon-coins hide-icons" />{" "}
                        {userData.tokens}
                      </div>
                    </div>
                  </LoadingButtonInfo>
                </NavItem>

                {/* {true && ( */}
                {userData.accessLevel && (
                  <NavItem>
                    <LoadingButtonInfo
                      isLoading={isLoading}
                      onClick={handleValidation}
                    >
                      <div className={"validate-reward"}>
                        <div>Validate</div>
                      </div>
                    </LoadingButtonInfo>
                  </NavItem>
                )}
              </>
            )}

            {/* ************************************************************************ */}
            <NavItem>
              <Button
                className={`genera-login-singup-btn nav-bar-connect-btn ${
                  hasMetamask ? "" : "wobble-hor-bottom"
                }`}
                color="warning"
                target="_blank"
                onClick={() => {
                  if (isAuthenticated) {
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
                  } else {
                    const isWeb3Ready = loginProcessHandler(
                      "connect",
                      hasMetamask,
                      wallet
                    );
                    if (isWeb3Ready) connectMetaMask();
                    if (
                      (wallet.chainId !== "") &
                      (wallet.chainId !== undefined)
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
                  {wallet.chainId !== ""
                    ? "Connected ✔"
                    : hasMetamask
                    ? "Connect"
                    : "No Wallet 😑"}
                </div>
              </Button>
            </NavItem>
            <NavItem>
              <SwitchButton
                isOn={usingLocalWallet}
                onClick={setUsingLocalWallet}
              />
            </NavItem>
            {/* </div> */}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
