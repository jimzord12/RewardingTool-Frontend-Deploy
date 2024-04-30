import React from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ethers } from "ethers";

import LoadingButtonInfo from "components/custom/LoadingButton/LoadingButtonInfo.js";

// Hooks
import { useNavigation } from "hooks/useNavigation.js";
import { useMetaMask } from "../../contexts/web3/MetaMaskContextProvider.js";
import { useGlobalContext } from "contexts/GlobalContextProvider.js";
// import { useWeb3Login } from "hooks/useWeb3Login.js";
// import { copyToClipboard } from "utils/copy2clipboard.js";

// import { deployedContractAddresses } from "web3/constants/deployedContracts.js";
import CustomToast from "./parts/CustomNavBarToast.js";

import { useLWLogin } from "hooks/useLWLogin.js";
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
  // UncontrolledTooltip,
} from "reactstrap";
import SwitchButton from "components/custom/SwitchButton/SwitchButton.jsx";
import LoginButton from "./parts/LoginButton.jsx";
import SignUpButton from "./parts/SignUpButton.jsx";
import useLocalWallet from "hooks/useLocalWallet.js";

import { getMGSBalance } from "../../api/index";
import ConnectMetaMaskButton from "./parts/ConnectMetaMaskButton.js";
import LocalWalletButton from "./parts/LocalWalletButton.js";
import RefetchButton from "components/custom/RefetchButton/RefetchButton.js";
import useToastMsg from "hooks/useToastMsg.js";

export default function ExamplesNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  // const [tokenEventAnimate, setTokenEventAnimate] = React.useState(false);
  // const [hasEffectRun, setHasEffectRun] = React.useState(false);

  const { wallet, hasMetamask, connectMetaMask } = useMetaMask();

  const { navigate } = useNavigation();
  const location = useLocation();
  const { userData, setUserData, usingLocalWallet, isLoading, provider } =
    useGlobalContext();
  // const { isAuthenticated, signMessage } = useWeb3Login();
  const {
    wallet: localWallet,
    deleteWallet,
    generateWallet,
    retrieveWallet,
    balance,
    getEthBalance,
    getEthBalance_2,
    automaticLogin,
  } = useLocalWallet(provider);

  const { showToast } = useToastMsg();

  React.useEffect(() => {
    console.log("NavBat: userData: ", userData);
  }, [userData, userData.metamaskWallet.isLoggedIn]);

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);

    return function cleanup() {
      window.removeEventListener("scroll", changeColor); //123456678asdhu
    };
  }, []);

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
            {!userData.isLoggedIn && (
              <NavItem className="">
                <LoginButton
                  usingLocalWallet={usingLocalWallet}
                  userData={userData}
                  setUserData={setUserData}
                />
              </NavItem>
            )}

            {/* If User is on the <Register Page?, Do not show the <Register> Button AND is NOT Logged In */}
            {!location.pathname.includes("register") &&
              !userData.isLoggedIn && (
                <NavItem>
                  <SignUpButton
                    usingLocalWallet={usingLocalWallet}
                    userData={userData}
                    isLoggedIn={userData.isLoggedIn}
                  />
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
                    // onClick={() => navigate("/user-rewards-page")}
                  >
                    <div className="user-details">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 12,
                        }}
                      >
                        <div
                        // style={{
                        //   display: "flex",
                        //   flexDirection: "row",
                        //   gap: 6,
                        // }}
                        >
                          <i className="fa fa-user hide-icons" />{" "}
                          {userData.name}
                        </div>
                        <div
                        // style={{
                        //   display: "flex",
                        //   flexDirection: "row",
                        //   gap: 6,
                        // }}
                        >
                          <i className="icon tim-icons icon-coins hide-icons" />{" "}
                          {userData.mgsTokens}
                        </div>
                      </div>
                      <RefetchButton
                        onClick={async () => {
                          console.log("Refetching MGS Balance for: ", userData);
                          let walletAdress = "";
                          if (
                            usingLocalWallet &&
                            userData.localWallet.account
                          ) {
                            walletAdress = userData.localWallet.account;
                          } else if (
                            hasMetamask &&
                            userData.metamaskWallet.accounts[0]
                          ) {
                            walletAdress = userData.metamaskWallet.accounts[0];
                          } else {
                            showToast(
                              "Error",
                              "Could not get your Wallet Address",
                              "error"
                            );
                            return;
                          }

                          const { success, balance } = await getMGSBalance(
                            walletAdress
                          );
                          if (success) {
                            setUserData((prev) => ({
                              ...prev,
                              mgsTokens: balance,
                            }));
                          } else {
                            showToast(
                              "Error",
                              "Could not get your MGS Balance",
                              "error"
                            );
                          }
                        }}
                      />
                    </div>
                  </LoadingButtonInfo>
                </NavItem>

                {/* {true && ( */}
                {/* {userData.accessLevel && (
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
                )} */}
              </>
            )}

            {/* ************************************************************************ */}
            <NavItem>
              {usingLocalWallet ? (
                <LocalWalletButton
                  userData={userData}
                  setUserData={setUserData}
                  generateWallet={generateWallet}
                  provider={provider}
                  getEthBalance={getEthBalance_2}
                />
              ) : (
                <ConnectMetaMaskButton />
              )}
            </NavItem>
            <NavItem>
              {location.pathname.includes("register") ? null : (
                <SwitchButton
                // isOn={usingLocalWallet}
                // onClick={setUsingLocalWallet}
                />
              )}
            </NavItem>
            {/* </div> */}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
