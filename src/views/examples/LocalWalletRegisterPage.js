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

export default function LocalWalletRegisterPage() {
  const [isMounted, setIsMounted] = React.useState(true);
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");

  // Form Fields
  const [userNameFocus, setuserNameFocus] = React.useState(false);
  const [walletFocus, setWalletFocus] = React.useState(false);
  const [privKeyFocus, setPrivKeyFocus] = React.useState(false);
  const [ethBalanceFocus, setEthBalanceFocus] = React.useState(false);

  const [successMessage, setSuccessMessage] = React.useState("");

  // const [hasError, setHasError] = React.useState([]);
  const [registrationStage, setRegistrationStage] =
    React.useState("playerCreation");

  const [userNameField, setUserNameField] = React.useState({
    type: "Username",
    value: "",
  });
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

  // Hooks
  const { userData, setUserData, provider, loginUserLocalWallet } =
    useGlobalContext();

  const { getPrivKey, getEthBalance, getEthBalance_2 } =
    useLocalWallet(provider);

  const { validateForm, hasErrors, clearFormErrors, setHasErrors } =
    useFormValidation_LW();

  const [saveUsername, getUsername /*, removeUsername */] = useLS(
    "username",
    ""
  );

  const { navigate } = useNavigation();

  const { showToast } = useToastMsg();

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    const username = getUsername();
    const privKey = getPrivKey();

    if (userData.localWallet.account) {
      setWalletField((prev) => {
        return { ...prev, value: userData.localWallet.account };
      });
      getEthBalance(userData.localWallet.account).then((balance) => {
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

    if (username) {
      const userInput = document.querySelector('input[placeholder^="User"]');
      userInput.value = username;
      setUserNameField({
        type: "Username",
        value: username,
      });
    }

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

  const buttonText = {
    playerCreation: "Create Account",
    playerCreationFailed: "Try Again Later",
    sentEth: "Sending ETH...",
    autoLogin: "Auto Login...",
    loginFailed: "Auto Login Failed",
    loginSuccess: "Auto Login Success",
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
                      <CardTitle tag="h4">Register</CardTitle>
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
                        {/* Username Field */}
                        <InputGroup
                          className={classnames({
                            "input-group-focus": userNameFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Username*"
                            type="text"
                            name="name"
                            onChange={(e) => {
                              setUserNameField((prev) => {
                                return { ...prev, value: e.target.value };
                              });
                              saveUsername(e.target.value);
                            }}
                            onFocus={(e) => setuserNameFocus(true)}
                            onBlur={(e) => setuserNameFocus(false)}
                          />
                        </InputGroup>

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
                            value={ethBalanceField.value}
                            onFocus={(e) => setEthBalanceFocus(true)}
                            onBlur={(e) => setEthBalanceFocus(false)}
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
                            const isValid = validateForm(
                              userNameField,
                              walletField
                            );
                            console.log("Is Form Valid?:", isValid);

                            const success = await handlePlayerCreate(
                              userNameField.value,
                              walletField.value,
                              ethBalanceField.value,
                              setSuccessMessage,
                              setHasErrors,
                              setRegistrationStage,
                              provider
                            );

                            if (success) {
                              console.log("User Data asd a: ", userData);
                              try {
                                await loginUserLocalWallet(userData);
                                setRegistrationStage("loginSuccess");
                              } catch (error) {
                                setHasErrors((prev) => [
                                  ...prev,
                                  { name: "Auto Login", message: "has failed" },
                                ]);
                                console.log(
                                  "⛔ LocalWalletResgiterPage: Login Error: ",
                                  error
                                );
                              }

                              showToast(
                                "Account Creation",
                                "Account created successfully!",
                                "success"
                              );

                              setTimeout(() => {
                                navigate("/rewards-page");
                              }, 2000);
                            } else {
                              console.log(
                                "Local Wallet Register Page | handlePlayerCreate, returned false"
                              );
                              setHasErrors((prev) => [
                                ...prev,
                                {
                                  name: "Account Creation",
                                  message: "has failed",
                                },
                              ]);
                              setRegistrationStage("playerCreationFailed");
                            }
                          }}
                          // onClick={async (event) => {
                          //   event.preventDefault();
                          //   clearFormErrors();
                          //   const isValid = validateForm(
                          //     userNameField,
                          //     walletField
                          //   );
                          //   console.log("Is Form Valid?:", isValid);

                          //   if (isValid === true) {
                          //     try {
                          //       setIsLoading(true);
                          //       console.log("Web3Register: :: ", contract);
                          //       // TODO:
                          //       // 1. Create User in Database (see: handlePlayerCreate.ts)
                          //       //  - This checks for username & wallet duplicates
                          //       //  - Sends the 0.5 ETH to the new user
                          //       //  - Provides Starting Stats to User (required for Game App)
                          //       const user_Tx = await contract.createUser(
                          //         userNameField.value
                          //       );
                          //       console.log(
                          //         "Web3Register: :user_Tx: ",
                          //         user_Tx
                          //       );
                          //       const a = await user_Tx.wait();
                          //       console.log("Web3Register: :user_Tx: AAA: ", a);
                          //       setSuccessMessage(
                          //         "Account created successfully!"
                          //       );
                          //       setHasErrors([]);
                          //       try {
                          //         const _userObj = await callContractFn(
                          //           "users",
                          //           userData.wallet
                          //         );
                          //         console.log(_userObj);

                          //         console.log(
                          //           "(Web3 Register Page): The user obj from contract: ",
                          //           _userObj
                          //         );

                          //         if (_userObj[2] === "") {
                          //           noAccountWarning();
                          //           setUserData((prev) => {
                          //             return {
                          //               ...prev,
                          //               name: "No Account",
                          //             };
                          //           });
                          //           return;
                          //         }

                          //         const _isManager = await callContractFn(
                          //           "checkManagerRole",
                          //           userData.wallet
                          //         );

                          //         const _isOwner = await callContractFn(
                          //           "checkOwnerRole",
                          //           userData.wallet
                          //         );
                          //         // const _pendingRewards = await callContractFn(
                          //         //   "getUserProducts",
                          //         //   userData.wallet
                          //         // );

                          //         setUserData((prev) => {
                          //           return {
                          //             ...prev,
                          //             name: _userObj[2],
                          //             // tokens: (parseInt(userTokens) / 1000).toFixed(2),
                          //             // pendingRewards: _pendingRewards,
                          //             accessLevel: _isManager
                          //               ? "manager"
                          //               : _isOwner
                          //               ? "owner"
                          //               : "",
                          //           };
                          //         });
                          //       } catch (error) {
                          //         console.error(
                          //           "Error fetching user data:",
                          //           error
                          //         );
                          //       }

                          //       /* OLD Register Stategy (with Express Server) */
                          //       // const { wasSuccessful } =
                          //       //   await handleAccountCreation({
                          //       //     name: userNameField.value,
                          //       //     wallet: walletField.value,
                          //       //   });
                          //       // if (wasSuccessful) {
                          //       //   setSuccessMessage(
                          //       //     "Account created successfully!"
                          //       //   );
                          //       //   setHasErrors([]);
                          //       // }
                          //     } catch (error) {
                          //       // Handling Errors from Server
                          //       console.log(
                          //         "💎 Register Error from Contract: ",
                          //         error
                          //       );
                          //       const contractError = getRevertedReason(error);

                          //       if (contractError?.isContractError) {
                          //         handleServerErrors(
                          //           "contract",
                          //           contractError.message
                          //         );
                          //       }
                          //       // else if (error.code === "ERR_NETWORK") {
                          //       //   handleServerErrors("ERR_NETWORK");
                          //       // } else if (
                          //       //   error.response.data.code === "ER_DUP_ENTRY"
                          //       // ) {
                          //       //   handleServerErrors("ER_DUP_ENTRY");
                          //       // } else {
                          //       //   console.log(error);
                          //       //   handleServerErrors();
                          //       // }
                          //       setSuccessMessage("");
                          //     } finally {
                          //       setIsLoading(false);
                          //     }
                          //   }
                          // }}
                        >
                          {buttonText[registrationStage]}
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
