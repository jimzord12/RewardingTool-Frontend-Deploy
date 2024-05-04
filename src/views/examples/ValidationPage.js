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
import React, { useState, useEffect } from "react";
// react plugin used to create charts
// import { Line } from "react-chartjs-2";
import classnames from "classnames";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";

import "./ValidationPage.styles.css";

// reactstrap components
import {
  Button,
  // Card,
  // CardHeader,
  // CardBody,
  // CardFooter,
  // CardTitle,
  // ListGroupItem,
  // ListGroup,
  Container,
  // Label,
  // FormGroup,
  // Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

// Context
import { useGlobalContext } from "contexts/GlobalContextProvider";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { useLS } from "../../hooks/useLS.js";
import LoadingButtonInfo from "components/custom/LoadingButton/LoadingButtonInfo";
import PendingCardsSection from "components/custom/PendingProducts/PendingCardsSection.js";
import { productDetails as rewardDetails } from "../../data/productDetails.js";

// import {
//   acropolis,
//   convert,
//   greek_feta,
//   loukaniko,
//   hotel,
//   guided_tour,
// } from "../../assets/img/genera/index.js";

import ValidationModal from "components/custom/MyModals/ValidationModal/ValidationModal";
// import bigChartData from "variables/charts.js";

// import { scrollToSection } from "genera/myJS";

// const testing_items = [
//   {
//     id: 1,
//     title: " Mykono's Traditional Sausage",
//     description: "This is a wondeful description for this prodect.",
//     image: loukaniko,
//     price: 25.0 + " MGS",
//     amount: 11,
//     location: "Mykonos",
//   },

//   {
//     id: 4,
//     title: "In-Game Gold",
//     description: "This is a wondeful description for this prodect.",
//     image: convert,
//     price: 10.0 + " MGS",
//     amount: "Infinite",
//     location: "N/A",
//   },
// ];

const CustomErrorToast = ({ text }) => (
  <div style={{ background: "#yourColor", color: "#otherColor" }}>{text}</div>
);

export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const {
    userData,
    // setUserData,
    rewards,
    getRewards,
    callContractFn,
    contractInitCompleted,
    // contract,
  } = useGlobalContext();

  const [customerRewards, setCustomerRewards] = React.useState([]);

  const [wasGetRewardsClicked, setWasGetRewardsClicked] = React.useState(false);
  const [userNameFocus, setUserNameFocus] = React.useState(false);
  const [userCodeFocus, setUserCodeFocus] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userNameField, setUserNameField] = React.useState({
    type: "Username",
    value: "",
  });
  const [userCodeField, setUserCodeField] = React.useState({
    type: "Username",
    value: "",
  });

  const [isModalOpen, setIsOpenOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState({
    state: "not started",
    success: undefined,
  });
  const [pendingRewardSelected, setPendingRewardSelected] = useState(null);
  const [rewardsLoading, setRewardsLoading] = React.useState(false);

  const [saveUsername /*, getUsername, removeUsername */] = useLS(
    "username",
    ""
  );

  const [removeCode] = useLS();

  const refetchUserRewards = async () => {
    setRewardsLoading(true);
    await handleFetchUserRewards();
    setRewardsLoading(false);
  };

  const reset = async () => {
    await refetchUserRewards();
    setModalStatus({
      state: "not started",
      success: undefined,
    });
  };

  const handleFetchUserRewards = async () => {
    if (userNameField.value === "") {
      toast.error(<CustomErrorToast text={"You must provide a username"} />, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return console.log("You must provide a username");
    }

    setIsLoading(true);
    try {
      console.log("The Username Field is: ", userNameField.value);
      // 1. Use the "userNameField" to call: contract.getUserProducts(userNameField.value)
      // 2. When is done...
      // 3. Update userData (Import Global Context)
      console.log("🎁 (ValidationPage): Waiting for the Tx to finish...");
      const _customerRewardsRAW = await callContractFn(
        "getUserProducts",
        userNameField.value
      );

      console.log(
        "💎 User's Pending Rewards from Contract: ",
        _customerRewardsRAW
      );

      const convertedRawData = _customerRewardsRAW.map((pendingReward) => {
        return {
          pendindRewardID: Number(pendingReward[0]),
          RewardID: Number(pendingReward[1]),
          collectionHash: pendingReward[2],
          isRedeemed: pendingReward[3],
        };
      });

      const finalRewards = convertedRawData.map((convertedReward, index) => {
        return {
          id: convertedReward.pendindRewardID,
          rewardID: convertedReward.RewardID,
          image: rewardDetails[convertedReward.RewardID].image,
          description: rewardDetails[convertedReward.RewardID].description,
          title: rewards[convertedReward.RewardID].name,
          price: rewards[convertedReward.RewardID].price,
          amount: convertedReward.amount,
          location: rewards[convertedReward.RewardID].location,
          isInfinite: false,
          collectionHash: convertedReward.collectionHash,
          isRedeemed: convertedReward.isRedeemed,
        };
      });

      console.log(
        "✨ User's Pending Rewards Final Form: ",
        _customerRewardsRAW
      );
      setCustomerRewards(finalRewards);
      setWasGetRewardsClicked(true);
    } catch (error) {
      console.log(
        "⛔ (ValidationPage -> handleFetchUserRewards) Contract Error: ",
        error
      );

      if (error.message.includes("getUserProducts: User does not exist")) {
        toast.error(<CustomErrorToast text={"User does not exist"} />, {
          position: "bottom-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } finally {
      setIsLoading(false);
    }
    // setIsLoading(false);
  };

  const handleRewardValidation = async () => {
    console.log("================================================");
    console.log("*****  Reward Validation  *****");
    console.log("================================================");

    if (userCodeField.value === "" || !(userCodeField.value.length === 6)) {
      toast.error(
        <CustomErrorToast text={"You must provide a 6-digit Redeem Code"} />,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return console.log(
        "⛔ (ValidationPage) Error: You must provide a 6-digit Redeem Code"
      );
    }

    console.log("3 >>> : ", isNaN(Number(userCodeField.value)));
    if (isNaN(Number(userCodeField.value))) {
      toast.error(
        <CustomErrorToast text={"You must only use characters from 0-9"} />,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return console.log(
        "⛔ (ValidationPage) Error: You must only use characters from 0-9"
      );
    }

    setIsLoading(true);

    try {
      console.log("The Redeem Code Field is: ", userCodeField.value);
      setIsOpenOpen(true);

      // 1. Use the "userNameField" to call: contract.getUserProducts(userCodeField.value)
      // 2. When is done...
      // 3. Update userData (Import Global Context)
      setModalStatus((prev) => {
        return {
          ...prev,
          state: "waiting",
          success: true,
        };
      });

      console.log("🎁 0.1 (ValidationPage): Username: ", userNameField.value);
      console.log(
        "🎁 0.2 (ValidationPage): Selected Reward: ",
        pendingRewardSelected
      );
      console.log("🎁 0.3 (ValidationPage): Code: ", userCodeField.value);

      console.log(
        "🎁 0.4 (ValidationPage): Selected Reward : ",
        pendingRewardSelected
      );

      const shopHash = await callContractFn(
        "hashValues",
        userNameField.value,
        pendingRewardSelected.rewardID,
        userCodeField.value
      );

      console.log("🎁 1. (ValidationPage): Shop Hash: ", shopHash);
      console.log(
        "🎁 2. (ValidationPage): Reward Hash: ",
        pendingRewardSelected.collectionHash
      );

      console.log(
        "🎁 2. (ValidationPage): Did hashed match? ",
        shopHash === pendingRewardSelected.collectionHash
      );

      const doHashesMatch = shopHash === pendingRewardSelected.collectionHash;

      if (doHashesMatch) {
        try {
          const contractValidation = await callContractFn(
            "redeemerValidator",
            userNameField.value,
            userCodeField.value,
            pendingRewardSelected.id
          );

          const tx_validation = await contractValidation.wait();
          console.log("💎🧪 Redeem Validation: ", tx_validation);

          removeCode(pendingRewardSelected.id);

          setModalStatus((prev) => {
            return {
              ...prev,
              state: "completed",
              success: doHashesMatch,
            };
          });
        } catch (error) {
          toast.error(
            <CustomErrorToast
              text={
                "User's Code is Wrong, or there is an problem with the Blockchain Network"
              }
            />,
            {
              position: "bottom-center",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          console.log("⛔ (ValidationPage) Contract Validation Error: ", error);
          throw new Error(error);
        }
      } else {
        toast.error(
          <CustomErrorToast
            text={
              "User's Code is Wrong, or there is an problem with the Blockchain Network"
            }
          />,
          {
            position: "bottom-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );

        setModalStatus((prev) => {
          return {
            ...prev,
            state: "completed",
            success: doHashesMatch,
          };
        });
      }
    } catch (error) {
      console.log("⛔ (ValidationPage) Contract Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPendingReward = (reward) => {
    setPendingRewardSelected(reward);
    console.log("From ValidationPage: ", reward);
  };

  useEffect(() => {
    if (contractInitCompleted && userData.name !== undefined) {
      if (rewards.length === 0) getRewards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.name, contractInitCompleted, rewards.length]);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <ValidationModal
          isOpen={isModalOpen}
          setModal={setIsOpenOpen}
          status={modalStatus}
          className="validation-modal"
          reset={reset}
        />
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  Get{" "}
                  <span className="text-primary">
                    <strong>Rewarded </strong>
                  </span>
                  for using GENERA's Platform <br />
                </h1>
                <p className="text-white mb-3">
                  Our platform offers a variety of tools, services and
                  resources. They are all{" "}
                  <strong>
                    <em>100% Free!</em>
                  </strong>{" "}
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    Learn more...
                  </p>
                  <Button
                    className="btn-link"
                    color="success"
                    onClick={(e) => {
                      //   scrollToSection(popularFeaturesSect);
                      e.preventDefault();
                    }}
                    size="sm"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
                Your best Your best benefit
                <div className="btn-wrapper">
                  <div className="button-container">
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-dribbble" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook" />
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/etherum.png")}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="content-center validation-container-mobile">
          {userData.name === undefined ? (
            <Container>
              <h3
                style={{
                  color: "#00f2c3",
                  textAlign: "center",
                  fontSize: 32,
                  marginBottom: 64,
                }}
              >
                You must first login to proceed
              </h3>
            </Container>
          ) : userData.accessLevel === "manager" ||
            userData.accessLevel === "owner" ? (
            <Container style={{ height: "25vh" }}>
              <h3>
                {userData.name !== undefined &&
                  (userData.accessLevel === "manager" ||
                    userData.accessLevel === "owner") &&
                  "Insert the User's Name in the field above to get his/her Rewards."}
              </h3>
              <Row className="row-grid justify-content-between align-items-center text-left my-4">
                <Col
                  className="px-2 py-2"
                  lg="6"
                  sm="6"
                  style={{
                    display: "flex",
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "500px" }}>
                    <InputGroup
                      className={
                        // "username-field" +

                        classnames({
                          "input-group-focus": userNameFocus,
                        })
                      }
                      style={{ minWidth: "250px" }}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        // {...register("nameSKATA")}
                        placeholder="Username*"
                        type="text"
                        name="name"
                        style={{ fontSize: 20, height: 64 }}
                        onChange={(e) => {
                          setUserNameField((prev) => {
                            return { ...prev, value: e.target.value };
                          });
                          saveUsername(e.target.value);

                          // console.log(e.target.value);
                        }}
                        // ref={register}
                        onFocus={(e) => setUserNameFocus(true)}
                        onBlur={(e) => setUserNameFocus(false)}
                      />
                    </InputGroup>
                  </div>
                </Col>

                <Col
                  className="px-2 py-2 validation-btn"
                  lg="6"
                  sm="6"
                  style={{
                    display: "flex",
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <LoadingButtonInfo
                      isLoading={isLoading}
                      onClick={handleFetchUserRewards}
                      styles={{ width: 250, height: 60, fontSize: 24 }}
                    >
                      Get Rewards
                    </LoadingButtonInfo>
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <h3
                style={{
                  color: "#00f2c3",
                  textAlign: "center",
                  fontSize: 32,
                  marginBottom: 64,
                }}
              >
                ⛔ This page required Manager or Owner access level ⛔
              </h3>
            </Container>
          )}
        </div>
        {pendingRewardSelected !== null && (
          <div>
            <Container>
              <Row className="row-grid justify-content-between align-items-center text-left my-4 validate-btn-mobile">
                <Col
                  className="px-2 py-2"
                  lg="6"
                  sm="6"
                  style={{
                    display: "flex",
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "500px" }}>
                    <InputGroup
                      className={
                        // "username-field" +
                        classnames({
                          "input-group-focus": userCodeFocus,
                        })
                      }
                      style={{ minWidth: "250px" }}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        // {...register("nameSKATA")}
                        placeholder="Redeem Code*"
                        type="text"
                        name="name"
                        style={{ fontSize: 20, height: 64 }}
                        onChange={(e) => {
                          setUserCodeField((prev) => {
                            return { ...prev, value: e.target.value };
                          });

                          // console.log(e.target.value);
                        }}
                        // ref={register}
                        onFocus={(e) => setUserCodeFocus(true)}
                        onBlur={(e) => setUserCodeFocus(false)}
                      />
                    </InputGroup>
                  </div>
                </Col>

                <Col
                  className="px-2 py-2 validation-btn"
                  lg="6"
                  sm="6"
                  style={{
                    display: "flex",
                    height: 60,
                    justifyContent: "center",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <LoadingButtonInfo
                      isLoading={isLoading}
                      onClick={handleRewardValidation}
                      styles={{ width: 200, height: 60, fontSize: 24 }}
                    >
                      Validate
                    </LoadingButtonInfo>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}
        <section className="validate-last-section-mobile">
          <Container>
            {rewardsLoading ? (
              <div style={{ paddingTop: 64, paddingBottom: 64 }}>
                <h3>Fetching the Updated Rewards...</h3>
                <ThreeCircles
                  height="150"
                  width="150"
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor="white"
                  innerCircleColor="white"
                  middleCircleColor="white"
                />
              </div>
            ) : (
              userData.name !== undefined &&
              (userData.accessLevel === "manager" ||
                userData.accessLevel === "owner") &&
              userNameField.value !== "" &&
              wasGetRewardsClicked && (
                <PendingCardsSection
                  items={customerRewards}
                  handleSelectPendingReward={handleSelectPendingReward}
                />
              )
            )}
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}
