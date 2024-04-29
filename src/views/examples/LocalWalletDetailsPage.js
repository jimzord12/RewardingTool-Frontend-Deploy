/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */

import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

import { useGlobalContext } from "contexts/GlobalContextProvider";
import { useFormValidation_LW } from "../../hooks/useFormValidation_LW.js";
import { useLS } from "../../hooks/useLS.js";
import useLocalWallet from "hooks/useLocalWallet.js";
import { useNavigation } from "hooks/useNavigation.js";

import { handlePlayerCreate } from "bigHandlers/handlePlayerCreate.js";
import { getPlayerByWallet, getMGSBalance } from "api/index.js";
import useToastMsg from "hooks/useToastMsg.js";

export default function LocalWalletDetailsPage() {
  const [isMounted, setIsMounted] = React.useState(true);
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");

  // Form Fields
  const [walletFocus, setWalletFocus] = React.useState(false);
  const [privKeyFocus, setPrivKeyFocus] = React.useState(false);
  const [ethBalanceFocus, setEthBalanceFocus] = React.useState(false);

  const [walletField, setWalletField] = React.useState({
    type: "Wallet Address",
    value: "",
  });
  const [privKeyField, setPrivKeyField] = React.useState({
    type: "Private Key",
    value: "",
  });
  const [ethBalanceField, setEthBalanceField] = React.useState({
    type: "EthBalance",
    value: "",
  });

  const [successMessage, setSuccessMessage] = React.useState("");

  // Hooks
  const { userData, setUserData, provider, loginUserLocalWallet } =
    useGlobalContext();

  const { getPrivKey, getEthBalance_2, deleteWallet } =
    useLocalWallet(provider);

  const { validateForm, hasErrors, clearFormErrors, setHasErrors } =
    useFormValidation_LW();

  const { navigate } = useNavigation();

  const { showToast } = useToastMsg();

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // const username = getUsername();
    const privKey = getPrivKey();

    if (userData.localWallet.account) {
      setWalletField((prev) => {
        return { ...prev, value: userData.localWallet.account };
      });
      getEthBalance_2(userData.localWallet.account).then((balance) => {
        if (isMounted) {
          setEthBalanceField((prev) => {
            return { ...prev, value: balance };
          });
        }
      });
    }

    if (privKey)
      setPrivKeyField((prev) => {
        return { ...prev, value: privKey };
      });

    // if (username) {
    //   const userInput = document.querySelector('input[placeholder^="User"]');
    //   userInput.value = username;
    //   setUserNameField({
    //     type: "Username",
    //     value: username,
    //   });
    // }

    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
      setIsMounted(false);
    };
  }, []);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register green">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                        style={{
                          marginTop:
                            hasErrors.length > 0 || successMessage.length > 0
                              ? "-100px"
                              : "-150px",
                          width: "580px",
                        }}
                      />
                      <CardTitle tag="h4" style={{ marginLeft: 2 }}>
                        Wallet Info
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      {hasErrors.length > 0 && (
                        <div className="form-validation-error">
                          <ul>
                            {hasErrors.map((error) => {
                              return (
                                <li
                                  key={error.name}
                                >{`${error.name}: ${error.message}`}</li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      {successMessage.length > 0 && (
                        <div className="form-success-message">
                          {successMessage}
                        </div>
                      )}
                      <Form className="form">
                        {/* Wallet Address Field */}
                        <InputGroup
                          className={classnames({
                            "input-group-focus": walletFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-wallet-43 hide-icons" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            style={{ backgroundColor: "transparent" }}
                            placeholder={"Wallet Address*"}
                            type="text"
                            name="wallet"
                            readOnly
                            value={walletField.value}
                            onFocus={(e) => setWalletFocus(true)}
                            onBlur={(e) => setWalletFocus(false)}
                          />
                        </InputGroup>

                        {/* Private Key Field */}
                        <InputGroup
                          className={classnames({
                            "input-group-focus": privKeyFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            style={{ backgroundColor: "transparent" }}
                            placeholder={"Private Key"}
                            type="text"
                            name="private key"
                            readOnly
                            value={privKeyField.value}
                            onFocus={(e) => setPrivKeyFocus(true)}
                            onBlur={(e) => setPrivKeyFocus(false)}
                          />
                        </InputGroup>

                        {/* ETH Balance Field */}
                        <InputGroup
                          className={classnames({
                            "input-group-focus": ethBalanceFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon tim-icons icon-coins hide-icons" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            style={{ backgroundColor: "transparent" }}
                            placeholder={"ETH"}
                            type="text"
                            name="eth balance"
                            readOnly
                            value={`${ethBalanceField.value} ETH`}
                            onFocus={(e) => setEthBalanceFocus(true)}
                            onBlur={(e) => setEthBalanceFocus(false)}
                          />
                        </InputGroup>

                        <Button
                          className="btn-round register-btn"
                          color="danger"
                          size="lg"
                          type="submit"
                          onClick={() => {
                            setUserData((prev) => {
                              return {
                                name: undefined,
                                mgsTokens: undefined,
                                metamaskWallet: {
                                  accounts: [],
                                  balance: "",
                                  chainId: "",
                                },
                                localWallet: {
                                  account: "",
                                  balance: "",
                                },
                                isLoggedIn: false,
                                hasAccount: false,
                                currentWalletMethod: "local",
                              };
                            });

                            deleteWallet();
                            navigate("rewards-page");
                            showToast(
                              "Wallet Deleted",
                              "Your Local Wallet has been deleted.",
                              "success"
                            );
                          }}
                        >
                          Delete Wallet
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
