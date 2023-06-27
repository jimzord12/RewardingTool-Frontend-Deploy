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
import React, { useState } from "react";
// react plugin used to create charts
// import { Line } from "react-chartjs-2";
import classnames from "classnames";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";

import "./ValidationPage.styles.css";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Label,
  FormGroup,
  Form,
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
import {
  acropolis,
  convert,
  greek_feta,
  loukaniko,
  hotel,
  guided_tour,
} from "../../assets/img/genera/index.js";

import ValidationModal from "components/custom/MyModals/ValidationModal";
// import bigChartData from "variables/charts.js";

// import { scrollToSection } from "genera/myJS";

const testing_items = [
  {
    id: 1,
    title: " Mykono's Traditional Sausage",
    description: "This is a wondeful description for this prodect.",
    image: loukaniko,
    price: 25.0 + " MGS",
    amount: 11,
    location: "Mykonos",
  },

  {
    id: 4,
    title: "In-Game Gold",
    description: "This is a wondeful description for this prodect.",
    image: convert,
    price: 10.0 + " MGS",
    amount: "Infinite",
    location: "N/A",
  },
];

const CustomErrorToast = ({ text, closeToast, toastProps }) => (
  <div style={{ background: "#yourColor", color: "#otherColor" }}>
    {text}
    {/* <button onClick={closeToast}>Close</button> */}
  </div>
);

export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const { userData, setUserData, rewards, getRewards } = useGlobalContext();
  const [customerRewards, setCustomerRewards] = React.useState([]);

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
  const [isPendingRewardSelected, setIsPendingRewardSelected] = useState(null);
  const [rewardsLoading, setRewardsLoading] = React.useState(false);

  const [saveUsername, getUsername, removeUsername] = useLS("username", "");

  const reset = () => {
    setModalStatus({
      state: "not started",
      success: undefined,
    });
  };

  const handleFetchUserDetails = () => {
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
      console.log(
        "(Faking): Calling Contract's:  getUserProducts(userNameField)..."
      );
      // 1. Use the "userNameField" to call: contract.getUserProducts(userNameField.value)
      // 2. When is done...
      // 3. Update userData (Import Global Context)
      setTimeout(() => {
        console.log("(Faking): Waiting for the Tx to finish...");

        setTimeout(() => {
          console.log("(Faking): ✅ Tx Comfirmed!");
          setCustomerRewards(testing_items);
          setIsLoading(false);
        }, 2000);

        // setUserData((prev) => {
        //   return { ...prev, pendingRewards: testing_items };
        // });
      }, 2000);
    } catch (error) {
      console.log("⛔ Contract Error: ", error);
    }
    // setIsLoading(false);
  };

  const handleRewardValidation = () => {
    console.log("================================================");
    console.log("*****  Reward Validation  *****");
    console.log("================================================");

    // TODO: Add an Alert component!
    console.log("1 >>> : ", userCodeField.value.length);
    console.log("1.1 >>> : ", !(userCodeField.value.length === 6));
    console.log("2 >>> : ", userCodeField.value);
    console.log("2. >>> : ", userCodeField.value === "");
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
      return console.log("⛔ Error: You must provide a 6-digit Redeem Code");
    }

    // TODO: Add an Alert component!
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
      return console.log("⛔ Error: You must only use characters from 0-9");
    }

    setIsLoading(true);

    try {
      console.log("The Redeem Code Field is: ", userCodeField.value);
      console.log(
        "(Faking): Calling Contract's:  redeemerValidator(userNameField)..."
      );
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

      setTimeout(() => {
        console.log("(Faking): Waiting for the Tx to finish...");

        setTimeout(() => {
          console.log("(Faking): ✅ Tx Comfirmed!");
          setModalStatus((prev) => {
            return {
              ...prev,
              state: "completed",
              success: false,
              // success: true,
            };
          });
          refetchUserRewards();
        }, 3000);

        setIsLoading(false);
        // setUserData((prev) => {
        //   return { ...prev, pendingRewards: testing_items };
        // });
      }, 3000);
    } catch (error) {
      console.log("⛔ Contract Error: ", error);
    }
  };

  const handleSelectPendingReward = (reward) => {
    setIsPendingRewardSelected(reward);
    console.log("From ValidationPage: ", reward);
  };

  const refetchUserRewards = async () => {
    setRewardsLoading(true);
    setTimeout(async () => {
      await getRewards();
      setRewardsLoading(false);
    }, 5000);
  };

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
        <div className="content-center">
          <Container style={{ height: "25vh" }}>
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
                    onClick={handleFetchUserDetails}
                    styles={{ width: 250, height: 60, fontSize: 24 }}
                  >
                    Get Rewards
                  </LoadingButtonInfo>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {isPendingRewardSelected && (
          <div>
            <Container>
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
        <section>
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
            ) : customerRewards.length > 0 ? (
              <PendingCardsSection
                items={customerRewards}
                handleSelectPendingReward={handleSelectPendingReward}
              />
            ) : (
              <h3>
                Insert the User's Name in the field above to get his/her
                Rewards.
              </h3>
            )}
            {/* {rewardsLoading ? (
              <div>
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
              customerRewards.length > 0 && (
                <PendingCardsSection
                  items={customerRewards}
                  handleSelectPendingReward={handleSelectPendingReward}
                />
              )
            )} */}
            {/* {customerRewards.length > 0 && !rewardsLoading ? (
              <PendingCardsSection
                items={customerRewards}
                handleSelectPendingReward={handleSelectPendingReward}
              />
            ) : (
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
            )} */}
          </Container>
        </section>
        <Footer />
      </div>
    </>
  );
}
