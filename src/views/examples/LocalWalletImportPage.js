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
import { isValidEthereumPrivateKey } from "utils/validatePrivKey.js";

export default function LocalWalletImportPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");

  const [privKeyFocus, setPrivKeyFocus] = React.useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  const [privKeyField, setPrivKeyField] = React.useState({
    type: "Private Key",
    value: "",
  });

  // Hooks
  const {
    userData,
    setUserData,
    provider,
    loginUserLocalWallet,
    usingLocalWallet,
  } = useGlobalContext();

  const { getPrivKey, getEthBalance, getEthBalance_2, retrieveWallet } =
    useLocalWallet(provider);

  const { validateForm, hasErrors, clearFormErrors, setHasErrors } =
    useFormValidation_LW();

  const { navigate } = useNavigation();

  const { showToast } = useToastMsg();

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
      // setIsMounted(false);
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
                        }}
                      />
                      <CardTitle tag="h4" style={{ marginLeft: "4px" }}>
                        Import
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
                        {/* <InputGroup
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
                        </InputGroup> */}
                        <p style={{ marginLeft: 4, marginBottom: 12 }}>
                          Enter your Private Key below:
                        </p>

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
                            value={privKeyField.value}
                            onChange={(e) => {
                              setPrivKeyField((prev) => {
                                return { ...prev, value: e.target.value };
                              });
                            }}
                            onFocus={(e) => setPrivKeyFocus(true)}
                            onBlur={(e) => setPrivKeyFocus(false)}
                          />
                        </InputGroup>

                        <Button
                          className="btn-round register-btn"
                          color="primary"
                          size="lg"
                          type="submit"
                          onClick={async (event) => {
                            event.preventDefault();
                            clearFormErrors();
                            if (userData.localWallet.account)
                              navigate("/rewards-page");

                            if (!usingLocalWallet) {
                              showToast(
                                "Error",
                                "You are not using a Local Wallet",
                                "error"
                              );
                              return;
                            }

                            const privKey = privKeyField.value;
                            const isValid = isValidEthereumPrivateKey(privKey);
                            console.log("Is Priv Key Valid?:", isValid);

                            if (isValid) {
                              console.log("User Data asd a: ", userData);

                              const { walletAddress } = retrieveWallet(privKey);
                              const ethBalance = await getEthBalance_2(
                                walletAddress
                              );

                              const newUserData = {
                                ...userData,
                                localWallet: {
                                  account: walletAddress,
                                  balance: ethBalance,
                                },
                              };

                              showToast(
                                "Success",
                                "Wallet was successfully imported!",
                                "success"
                              );

                              try {
                                await loginUserLocalWallet(newUserData);
                                showToast(
                                  "Auto Log in Successful!",
                                  "We automatically logged you in",
                                  "success"
                                );
                              } catch (error) {
                                setUserData(newUserData);
                                showToast(
                                  "No Account Found",
                                  "Please create an account to continue",
                                  "info"
                                );
                              }

                              // navigate("/rewards-page");
                            } else {
                              console.log(
                                "⛔ Local Wallet Import Page | Import Wallet, failed"
                              );
                            }
                          }}
                        >
                          {userData.localWallet.account
                            ? "Go Back"
                            : "Import Wallet"}
                        </Button>
                      </Form>
                    </CardBody>
                    {/* <CardFooter></CardFooter> */}
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
