/* eslint-disable react-hooks/exhaustive-deps */
/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ethers } from "ethers";

import LoadingButtonInfo from "components/custom/LoadingButton/LoadingButtonInfo.js";

// Hooks
import { useNavigation } from "hooks/useNavigation.js";
import { useMetaMask } from "../../contexts/web3/MetaMaskContextProvider.js";
import { useGlobalContext } from "contexts/GlobalContextProvider.js";

import { useLogin } from "hooks/useLogin.js";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// import ConnectModal from "../custom/ConnectModal/ConnectModal.js";

export default function ExamplesNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [tokenEventAnimate, setTokenEventAnimate] = React.useState(false);

  // const [hasMetamaskState, sethasMetamaskState] = React.useState(false);
  // const [isConnectedState, setIsConnectedState] = React.useState(false);
  // const [userAddr, setUserAddr] = React.useState(undefined);
  // const [walletProvider, setWalletProvider] = React.useState(null);

  const {
    wallet,
    hasProvider,
    connectMetaMask,
    error,
    errorMessage,
    isConnecting,
    clearError,
  } = useMetaMask();

  const { navigate } = useNavigation();
  const location = useLocation();
  const { isLoading } = useLogin();
  const {
    userData,
    setUserData,
    callContractFn,
    tokenEventFired,
    setTokenEventFired,
  } = useGlobalContext();

  // console.log("location: ", location);
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);

    async function getTokens() {
      const userTokens = await callContractFn("viewYourPoints");
      console.log("User's Tokens: ", userTokens.toNumber());
      console.log("User's Tokens: ", userTokens);
      // console.log("User's Tokens: ", ethers.bigNumber.toNumber(userTokens));
      setUserData((prev) => {
        return { ...prev, tokens: userTokens.toNumber() };
        // return { ...prev, tokens: ethers.bigNumber.toNumber(userTokens) };
      });
    }

    if (userData.name !== undefined && wallet.chainId === 20231) getTokens();

    return function cleanup() {
      window.removeEventListener("scroll", changeColor); //123456678asdhu
    };
  }, [userData.name]);

  React.useEffect(() => {
    if (tokenEventFired) {
      setTokenEventAnimate(true);

      const timeoutId = setTimeout(() => {
        setTokenEventAnimate(false);
      }, 3000); // Set this to the duration of your animation (in this case, 1 second)

      return () => clearTimeout(timeoutId); // This function is called for cleanup when the component unmounts or before this effect runs again
    }
  }, [tokenEventFired]); // This effect runs whenever `eventFired` changes

  React.useEffect(() => {
    if (tokenEventAnimate === false) {
      setTokenEventFired(false);
    }
  }, [tokenEventAnimate]);

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
      <Container>
        {/* <ConnectModal /> */}
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>GENERA• </span>
            Rewarding Tool
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Creative Tim
          </UncontrolledTooltip>
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
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
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
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>

            {/* If User is on the <Logic Page>, Do not show the <Login> Button AND is NOT Logged In */}
            {!location.pathname.includes("login") && !userData.isLoggedIn && (
              <NavItem>
                <Button
                  className="nav-link d-none d-lg-block genera-login-singup-btn"
                  color="success"
                  target="_blank"
                  onClick={() => navigate("/login-page")}
                >
                  <i className="tim-icons icon-key-25" /> Log In
                </Button>
              </NavItem>
            )}

            {/* If User is on the <Register Page?, Do not show the <Register> Button AND is NOT Logged In */}
            {!location.pathname.includes("register") &&
              !userData.isLoggedIn && (
                <NavItem>
                  <Button
                    className="nav-link d-none d-lg-block genera-login-singup-btn"
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
            {true && (
              // {location.pathname.includes("rewards") && userData.isLoggedIn && (
              <>
                <NavItem>
                  <LoadingButtonInfo isLoading={isLoading}>
                    <div
                      className={`user-details ${
                        tokenEventAnimate ? "vibrate-3" : ""
                      }`}
                    >
                      <div>
                        <i className="fa fa-user" /> {userData.name}
                      </div>
                      <div>
                        <i className="icon tim-icons icon-coins" />{" "}
                        {userData.tokens}
                      </div>
                    </div>
                  </LoadingButtonInfo>
                </NavItem>

                {true && (
                  // {userData.accessLevel === "manager" && (
                  <NavItem>
                    <LoadingButtonInfo
                      isLoading={isLoading}
                      onClick={handleValidation}
                    >
                      <div className={"validate-reward"}>
                        <div>
                          <i className="icon tim-icons icon-check-2" /> Validate
                        </div>
                      </div>
                    </LoadingButtonInfo>
                  </NavItem>
                )}
              </>
            )}

            {/* ************************************************************************ */}

            <NavItem>
              <Button
                className={`nav-link d-none d-lg-block genera-login-singup-btn ${
                  hasProvider ? "" : "wobble-hor-bottom"
                }`}
                color="warning"
                target="_blank"
                onClick={connectMetaMask}
              >
                <i className="tim-icons icon-wallet-43" />{" "}
                {/* 
                  1. Checkes if User is connected by checking if the wallet has an chainId property with any value
                  2. If this fails, checks if the user possess a wallet in general 
                */}
                {wallet.chainId !== ""
                  ? "Connected ✔"
                  : hasProvider
                  ? "Connect"
                  : "No Wallet 😑"}
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
