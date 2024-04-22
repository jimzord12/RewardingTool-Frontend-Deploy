/* eslint-disable jsx-a11y/anchor-is-valid */
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
import classnames from "classnames";
// import axios from "axios";
// reactstrap components
import {
  // Button,
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
import LoadingButton from "components/custom/LoadingButton/LoadingButton.js";
import { useLogin } from "hooks/useLogin.js";
import { useNavigation } from "hooks/useNavigation";
// import { getNonce } from "api/api";

import { ReactComponent as MetamaskIcon } from "../../assets/img/genera/metamask.svg";

import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import { useGlobalContext } from "contexts/GlobalContextProvider";
import { useLS } from "../../hooks/useLS.js";
// import { useFormValidation } from "../../hooks/useFormValidation.js";

export default function LoginPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");

  const [emailField, setEmailField] = React.useState("");
  const [passwordField, setPasswordField] = React.useState("");
  const [walletField, setWalletField] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [walletFocus, setWalletFocus] = React.useState(false);
  const [hasError, setHasError] = React.useState([]);
  const [saveEmail, getEmail] = useLS("email", "");

  // const [fullNameFocus, setFullNameFocus] = React.useState(false);
  // const [loginFailed, setLoginFailed] = useState(false);

  // const [forceRerender, setForceRerender] = useState(false);
  // const [loginSuccess, setLoginSuccess] = useState(false);

  const { loginUser, isLoggedIn, isLoading } = useLogin();
  const { navigate } = useNavigation();

  const {
    hasMetamask,
    wallet,
    connectMetaMask,
    switchNetwork,
    // addNetwork,
    // provider,
  } = useMetaMask();

  // const {
  //   validateForm,
  //   hasErrors,
  //   setHasErrors,
  //   clearFormErrors,
  //   handleServerErrors,
  // } = useFormValidation();

  const { setUserData } = useGlobalContext();

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    const email = getEmail();

    if (isLoggedIn) navigate("/rewards-page");

    if (email) {
      const userInput = document.querySelector('input[placeholder^="Email"]');
      userInput.value = email;
      setEmailField(email);
    }

    if (wallet.chainId === 20231) {
      const walletInputField = document.querySelector('input[name="wallet"]');
      // console.log("vvvvvvvvvvvvvvvvv: ", walletInputField);
      walletInputField.value = wallet.accounts[0];
      setWalletField(wallet.accounts[0]);
    }

    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, [isLoggedIn, wallet.accounts[0]]);

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

  // 🧪 Testing: Login using Message Signing - START

  // async function signMessage() {
  //   const nonce = await getNonce();
  //   // If nonce fetching failed, nonce will be null. Add error handling as necessary.

  //   if (nonce && hasMetamask) {
  //     const signer = provider.getSigner();
  //     const signedMessage = await signer.signMessage(nonce.toString());

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3033/verify-signature",
  //         {
  //           nonce: nonce.toString(),
  //           userAddress: await signer.getAddress(),
  //           signedMessage: signedMessage,
  //         }
  //       );

  //       if (response.data.verified) {
  //         console.log("The signature is valid!");
  //       } else {
  //         console.log("The signature is invalid!");
  //       }
  //     } catch (error) {
  //       console.error("Failed to verify signed message:", error);
  //     }
  //   }
  // }

  // 🧪 Testing: Login using Message Signing - END

  // Function to validate form
  const validateForm = () => {
    let errors = [];
    const walletPattern = /^0x[a-fA-F0-9]{40}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate wallet address
    if (!walletField || !walletPattern.test(walletField)) {
      const error = { name: "Wallet Address" };
      if (walletField.length === "")
        error.message = "Wallet Address is required";
      error.message =
        "Must be a 40 characters long and a valid Ethereum address";
      errors.push(error);
    }
    // Validate email
    if (!emailField || !emailPattern.test(emailField)) {
      const error = { name: "Email" };
      if (emailField === "") error.message = "Email Address is required";
      if (emailField !== "")
        error.message = "Must be a valid email. (example@example.com)";
      errors.push(error);
    }
    // Validate password
    if (!passwordField || passwordField.length < 8) {
      const error = { name: "Password" };
      if (passwordField.length === 0) error.message = "Password is required";
      if (passwordField.length < 8)
        error.message = "Must be at least 8 characters";
      errors.push(error);
    }
    // Check if wallet installed
    if (!hasMetamask) {
      const error = { name: "Wallet" };
      error.message = "Metamask must be installed";
      errors.push(error);
    }
    // Check if connected with site
    if (!wallet.chainId) {
      const error = { name: "Wallet Connection" };
      error.message = "Metamask must be connected with the Site";
      errors.push(error);
    }
    // Check if on correct network
    if (wallet.chainId !== 20231) {
      const error = { name: "Wallet Network" };
      error.message = "Metamask must be on the GENERA Network";
      errors.push(error);
    }
    // If no errors, return true, else return array of errors
    if (errors.length > 0) {
      setHasError(errors);
    }
    return errors.length > 0 ? errors : true;
  };

  async function handleLogin() {
    setHasError([]);
    const userData = {
      email: emailField,
      password: passwordField,
      wallet: walletField,
    };

    const isValid = validateForm();
    if (isValid === true) {
      try {
        const response = await loginUser(userData);
        console.log(response);
        if (response !== undefined)
          setUserData((prev) => {
            return {
              ...prev,
              name: response.name,
              wallet: response.wallet,
              isLoggedIn: Boolean(response.name),
            };
          });
      } catch (error) {
        console.log("💎 Server Error: ", error);

        if (error?.response?.data?.message === "Incorrect Password") {
          setHasError([
            {
              name: "User",
              message: "Incorrect Password",
            },
          ]);
        } else if (error?.response?.data?.includes("not registered!")) {
          setHasError([
            {
              name: "Server",
              message: "This Account is does not exist",
            },
          ]);
        } else if (error?.code === "ERR_NETWORK") {
          setHasError([
            {
              name: "Server",
              message: "At capacity or down. Please try again later",
            },
          ]);
        } else if (error?.response?.data?.code === "ER_DUP_ENTRY") {
          setHasError([
            {
              name: "Database",
              message: "This name, email or wallet already exists",
            },
          ]);
        } else {
          setHasError([
            {
              name: "Unknown",
              message: "Something went terribly wrong!",
            },
          ]);
        }
      }
    }
  }

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper login-page">
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
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-green-1.jpg")}
                        style={{
                          marginTop: hasError.length > 0 ? "-130px" : "-150px",
                        }}
                      />
                      <CardTitle tag="h4">sign In</CardTitle>
                    </CardHeader>
                    <CardBody>
                      {hasError.length > 0 && (
                        <div className="form-validation-error">
                          <ul>
                            {hasError.map((error) => {
                              return (
                                <li
                                  key={error.name}
                                >{`${error.name}: ${error.message}`}</li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onChange={(e) => {
                              setEmailField(e.target.value);
                              console.log("Email changed: ", e.target.value);
                              saveEmail(e.target.value);
                            }}
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": walletFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="tim-icons icon-single-02" /> */}
                              <MetamaskIcon
                                style={{ height: "16px", width: "16px" }}
                              />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            // {...register("nameSKATA")}
                            style={{ backgroundColor: "transparent" }}
                            placeholder={
                              wallet.accounts[0]
                                ? wallet.accounts[0]
                                : "Wallet Address"
                            }
                            type="text"
                            name="wallet"
                            readOnly
                            onChange={(e) => {
                              setWalletField(e.target.value);
                              console.log(e.target.value);
                            }}
                            // ref={register}
                            onFocus={(e) => setWalletFocus(true)}
                            onBlur={(e) => setWalletFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => {
                              setPasswordField(e.target.value);
                              console.log(
                                "Passwords changed: ",
                                e.target.value
                              );
                            }}
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                          />
                        </InputGroup>
                        <FormGroup check className="text-left"></FormGroup>
                      </Form>
                    </CardBody>
                    {/* <CardFooter> */}
                    {/* <Button className="btn-round" color="success" size="lg">
                        Let me in
                      </Button> */}
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
                              checked={hasMetamask}
                              readOnly
                            />
                            <span className="form-check-sign" /> Wallet
                            Installed?*
                          </div>
                          {!hasMetamask && (
                            <a
                              className="web3-helper-link-login"
                              href="https://metamask.io/"
                            >
                              {" "}
                              Get One!{" "}
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
                              checked={Boolean(wallet.chainId !== "")}
                              readOnly
                            />
                            <span className="form-check-sign" />
                            Connected with Site?*
                          </div>
                          {!Boolean(wallet.chainId !== "") && (
                            <a
                              className="web3-helper-link-login"
                              href="#"
                              onClick={connectMetaMask}
                            >
                              {" "}
                              Connect!{" "}
                            </a>
                          )}
                        </div>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="text-left">
                      {/* {console.log("1 - Suka: ", wallet.chainId === 20231)} */}
                      {/* console.log(
                            "2 - Suka: ",
                            Boolean(wallet.chaidId === 20231)
                          )} */}
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
                              readOnly
                            />
                            <span className="form-check-sign" /> On Correct
                            Network?*
                          </div>
                          {!(wallet.chainId === 20231) && (
                            <a
                              className="web3-helper-link-login"
                              href="#"
                              onClick={switchNetwork}
                            >
                              {" "}
                              Switch!{" "}
                            </a>
                          )}
                        </div>
                      </Label>
                    </FormGroup>
                    <LoadingButton isLoading={isLoading} onClick={handleLogin}>
                      Let me in
                    </LoadingButton>
                    {/* </CardFooter> */}
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
