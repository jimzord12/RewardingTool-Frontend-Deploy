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
import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

import "./ValidationPage.styles.css";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// Context
import { useGlobalContext } from "contexts/GlobalContextProvider";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
import { productDetails as rewardDetails } from "../../data/productDetails.js";
import CardGrid from "components/custom/ProductSection/CardGrid.js";
import UserRewardsCodesModal from "components/custom/MyModals/UserRewardsCodesModal";

// Hooks

// Made by GPT-4
function consolidateRewards(arrOfRewards) {
  let consolidatedRewards = {};

  arrOfRewards.forEach((reward) => {
    console.log(`🧪🧪 Reward (${reward.pendindRewardID})🧪🧪: `, reward);
    if (consolidatedRewards[reward.RewardID]) {
      // console.log("This reward already exists...");
      // console.log(
      //   "🧪🧪 (1) Existing Reward: 🧪🧪: ",
      //   consolidatedRewards[reward.RewardID]
      // );
      // console.log(
      //   "🧪🧪 (2) Existing Pending Rewards 🧪🧪: ",
      //   consolidatedRewards[reward.RewardID].pendingRewards
      // );
      // console.log("🧪🧪 (3) The Duplicates ID: 🧪🧪: ", reward.pendindRewardID);

      consolidatedRewards[reward.RewardID].amount += 1;
      // consolidatedRewards[reward.RewardID].pendingRewards.push(
      //   reward.pendingRewardID
      // );
      // console.log(
      //   "🧪🧪 (4) Final: 🧪🧪: ",
      //   consolidatedRewards[reward.RewardID]
      // );
      if (reward.isRedeemed === false) {
        consolidatedRewards[reward.RewardID].isRedeemed = false;
        consolidatedRewards[reward.RewardID].amountToRedeem += 1;
        consolidatedRewards[reward.RewardID].pendingRewards.push(
          reward.pendindRewardID
        );
      } else {
        consolidatedRewards[reward.RewardID].amountOfRedeemed += 1;
      }
    } else {
      if (reward.isRedeemed === false) {
        consolidatedRewards[reward.RewardID] = {
          productID: reward.RewardID,
          pendingRewards: [reward.pendindRewardID],
          amount: 1,
          isRedeemed: reward.isRedeemed,
          amountToRedeem: reward.isRedeemed ? 0 : 1,
          amountOfRedeemed: reward.isRedeemed ? 1 : 0,
        };
      } else {
        // console.log("This reward DOES NOT exists...");
        consolidatedRewards[reward.RewardID] = {
          productID: reward.RewardID,
          pendingRewards: [],
          amount: 1,
          isRedeemed: reward.isRedeemed,
          amountToRedeem: reward.isRedeemed ? 0 : 1,
          amountOfRedeemed: reward.isRedeemed ? 1 : 0,
        };
      }
    }
  });

  // convert the object to an array
  consolidatedRewards = Object.values(consolidatedRewards);

  return consolidatedRewards;
}

export default function UserRewardsPage() {
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  const [modal, setModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(undefined);
  const {
    userData,
    // setUserData,
    rewards,
    getRewards,
    callContractFn,
    contractInitCompleted,
  } = useGlobalContext();

  const [rewardsLoading, setRewardsLoading] = React.useState(true);
  const [userRewards, setUserRewards] = React.useState([]);

  const handleFetchUserRewards = async () => {
    setRewardsLoading(true);
    try {
      console.log("💎 1. (UserRewardsPage): User's Address: ", userData.wallet);
      const userRewardsRAW = await callContractFn(
        "getPendingProducts",
        userData.wallet
      );

      console.log("💎 2. (UserRewardsPage): The RAW Data: ", userRewardsRAW);
      const convertedRawData = userRewardsRAW.map((pendingReward) => {
        return {
          pendindRewardID: Number(pendingReward[0]),
          RewardID: Number(pendingReward[1]),
          collectionHash: pendingReward[2],
          isRedeemed: pendingReward[3],
        };
      });

      console.log(
        "💎 3. (UserRewardsPage): The Converted Data: ",
        convertedRawData
      );
      const noDuplRewards = consolidateRewards(convertedRawData);
      console.log("💎 4. (UserRewardsPage): No Duplicates: ", noDuplRewards);

      console.log(
        "💎 5. (UserRewardsPage): The Rewards from Global: ",
        rewards
      );

      const finalRewards = noDuplRewards.map((compressedReward, index) => {
        return {
          id: index,
          pendindRewardID: compressedReward.pendingRewards,
          image: rewardDetails[compressedReward.productID].image,
          description: rewardDetails[compressedReward.productID].description,
          name: rewards[compressedReward.productID].name,
          price: rewards[compressedReward.productID].price,
          amount: compressedReward.amount,
          location: rewards[compressedReward.productID].location,
          isInfinite: false,
          isRedeemed: compressedReward.isRedeemed,
          amountToRedeem: compressedReward.amountToRedeem,
          amountOfRedeemed: compressedReward.amountOfRedeemed,
        };
      });

      console.log("💎 6. (UserRewardsPage): The Final Form: ", finalRewards);

      setUserRewards(finalRewards);
    } catch (error) {
      console.log("⛔ Contract Error: ", error);
    } finally {
      setRewardsLoading(false);
    }
  };

  useEffect(() => {
    if (contractInitCompleted && userData.name !== undefined) {
      if (rewards.length === 0) getRewards();
      if (rewards.length > 0) handleFetchUserRewards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.name, contractInitCompleted, rewards.length]);

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
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

        <section>
          <Container>
            {rewardsLoading ? (
              <div style={{ paddingTop: 64, paddingBottom: 64 }}>
                {userData.name === undefined ? (
                  <h3>You must login to see your available Rewards.</h3>
                ) : (
                  <h3>Fetching the Updated Rewards...</h3>
                )}

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
            ) : userRewards.length > 0 ? (
              <CardGrid
                items={userRewards}
                setModal={setModal}
                setSelectedReward={setSelectedReward}
              />
            ) : (
              <h3>Currently there no available Rewards</h3>
            )}
          </Container>
          <UserRewardsCodesModal
            isOpen={modal}
            selectedReward={selectedReward}
            setModal={setModal}
          />
        </section>
        <Footer />
      </div>
    </>
  );
}
