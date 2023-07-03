/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
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
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
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
import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import { useForm } from "react-hook-form";
import { useFormValidation } from "../../hooks/useFormValidation.js";
import { useLS } from "../../hooks/useLS.js";
import { noAccountWarning } from "utils/LoginProcessHandler.js";

// import { handleAccountCreation } from "../../api/api.js";

import { ReactComponent as MetamaskIcon } from "../../assets/img/genera/metamask.svg";

function getRevertedReason(error) {
  if (typeof error !== "object" || error === null) {
    throw new TypeError("The argument should be an object");
  }

  if (error.reason === "user rejected transaction") {
    return {
      isContractError: true,
      message: `The User rejected the Tx`,
    };
  }

  if (
    error.error &&
    error.error.data &&
    error.error.data.data &&
    error.error.data.data.message
  ) {
    let revertedReason = error.error.data.data.message;
    const prefix = "reverted with reason string '";
    const postfix = "'";
    const startIndex = revertedReason.indexOf(prefix);
    const endIndex = revertedReason.lastIndexOf(postfix);

    if (startIndex !== -1 && endIndex !== -1) {
      revertedReason = revertedReason.slice(
        startIndex + prefix.length,
        endIndex
      );
      return {
        isContractError: true,
        message: `The Tx reverted for this reason: (${revertedReason})`,
      };
    }
  }

  return {
    isContractError: true,
    message: "Something went wrong",
  };
}

export default function LoginPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [userNameFocus, setuserNameFocus] = React.useState(false);
  const [walletFocus, setWalletFocus] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  // const [hasError, setHasError] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [userNameField, setUserNameField] = React.useState({
    type: "Username",
    value: "",
  });
  const [walletField, setWalletField] = React.useState({
    type: "Wallet Address",
    value: "",
  });

  // Hooks
  // const { register, handleSubmit } = useForm();
  const {
    contract,
    contractInitCompleted,
    userData,
    setUserData,
    callContractFn,
  } = useGlobalContext();
  const { hasProvider, connectMetaMask, wallet, switchNetwork } = useMetaMask();

  const {
    validateForm,
    hasErrors,
    setHasErrors,
    clearFormErrors,
    handleServerErrors,
  } = useFormValidation();

  const [saveUsername, getUsername /*, removeUsername */] = useLS(
    "username",
    ""
  );
  // const [saveEmail, getEmail, removeEmail] = useLS("email", "");

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    const username = getUsername();

    if (contractInitCompleted) {
      console.log("Contract: ", contract);
    }

    if (wallet.accounts.length > 0)
      setWalletField((prev) => {
        return { ...prev, value: wallet.accounts[0] };
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
    };
  }, [wallet.accounts.length, wallet.accounts[0], contractInitCompleted]);

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
                        <InputGroup
                          className={classnames({
                            "input-group-focus": walletFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <MetamaskIcon
                                style={{ height: "16px", width: "16px" }}
                              />
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
                        <FormGroup check className="text-left">
                          <Label check>
                            <div
                              style={{
                                display: "flex",
                                width: 250,
                                gap: 15,
                              }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  checked={hasProvider}
                                  readOnly
                                />
                                <span className="form-check-sign" /> Wallet
                                Installed?*
                              </div>
                              {!hasProvider && (
                                <a href="https://metamask.io/"> Get One! </a>
                              )}
                            </div>
                          </Label>
                        </FormGroup>
                        <FormGroup check className="text-left">
                          <Label check>
                            <div
                              style={{
                                display: "flex",
                                width: 250,
                                gap: 15,
                              }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  checked={Boolean(wallet.chainId !== "")}
                                  readOnly
                                />
                                <span className="form-check-sign" />
                                Connected with Site?*
                              </div>
                              {!Boolean(wallet.chainId !== "") && (
                                <a href="#" onClick={connectMetaMask}>
                                  {" "}
                                  Connect!{" "}
                                </a>
                              )}
                            </div>
                          </Label>
                        </FormGroup>
                        <FormGroup check className="text-left">
                          <Label check>
                            <div
                              style={{
                                display: "flex",
                                width: 250,
                                gap: 15,
                              }}
                            >
                              <div>
                                <Input
                                  type="checkbox"
                                  checked={wallet.chainId === 20231}
                                  // checked={wallet.chainId === 31337}
                                  readOnly
                                />
                                <span className="form-check-sign" /> On Correct
                                Network?*
                              </div>
                              {/* {!(wallet.chainId === 31337) && ( */}
                              {!(wallet.chainId === 20231) && (
                                <a href="#" onClick={switchNetwork}>
                                  {" "}
                                  Switch!{" "}
                                </a>
                              )}
                            </div>
                          </Label>
                        </FormGroup>
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

                            if (isValid === true) {
                              try {
                                setIsLoading(true);
                                console.log("Web3Register: :: ", contract);
                                const user_Tx = await contract.createUser(
                                  userNameField.value
                                );
                                console.log(
                                  "Web3Register: :user_Tx: ",
                                  user_Tx
                                );
                                const a = await user_Tx.wait();
                                console.log("Web3Register: :user_Tx: AAA: ", a);
                                setSuccessMessage(
                                  "Account created successfully!"
                                );
                                setHasErrors([]);
                                try {
                                  const _userObj = await callContractFn(
                                    "users",
                                    userData.wallet
                                  );
                                  console.log(_userObj);

                                  console.log(
                                    "(Web3 Register Page): The user obj from contract: ",
                                    _userObj
                                  );

                                  if (_userObj[2] === "") {
                                    noAccountWarning();
                                    setUserData((prev) => {
                                      return {
                                        ...prev,
                                        name: "No Account",
                                      };
                                    });
                                    return;
                                  }

                                  const _isManager = await callContractFn(
                                    "checkManagerRole",
                                    userData.wallet
                                  );

                                  const _isOwner = await callContractFn(
                                    "checkOwnerRole",
                                    userData.wallet
                                  );
                                  // const _pendingRewards = await callContractFn(
                                  //   "getUserProducts",
                                  //   userData.wallet
                                  // );

                                  setUserData((prev) => {
                                    return {
                                      ...prev,
                                      name: _userObj[2],
                                      // tokens: (parseInt(userTokens) / 1000).toFixed(2),
                                      // pendingRewards: _pendingRewards,
                                      accessLevel: _isManager
                                        ? "manager"
                                        : _isOwner
                                        ? "owner"
                                        : "",
                                    };
                                  });
                                } catch (error) {
                                  console.error(
                                    "Error fetching user data:",
                                    error
                                  );
                                }

                                /* OLD Register Stategy (with Express Server) */
                                // const { wasSuccessful } =
                                //   await handleAccountCreation({
                                //     name: userNameField.value,
                                //     wallet: walletField.value,
                                //   });
                                // if (wasSuccessful) {
                                //   setSuccessMessage(
                                //     "Account created successfully!"
                                //   );
                                //   setHasErrors([]);
                                // }
                              } catch (error) {
                                // Handling Errors from Server
                                console.log(
                                  "💎 Register Error from Contract: ",
                                  error
                                );
                                const contractError = getRevertedReason(error);

                                if (contractError?.isContractError) {
                                  handleServerErrors(
                                    "contract",
                                    contractError.message
                                  );
                                }
                                // else if (error.code === "ERR_NETWORK") {
                                //   handleServerErrors("ERR_NETWORK");
                                // } else if (
                                //   error.response.data.code === "ER_DUP_ENTRY"
                                // ) {
                                //   handleServerErrors("ER_DUP_ENTRY");
                                // } else {
                                //   console.log(error);
                                //   handleServerErrors();
                                // }
                                setSuccessMessage("");
                              } finally {
                                setIsLoading(false);
                              }
                            }
                          }}
                        >
                          {isLoading ? "A moment please..." : "Get Started"}
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
