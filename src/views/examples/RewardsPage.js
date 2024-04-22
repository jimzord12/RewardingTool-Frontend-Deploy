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
import { Container } from "reactstrap";
import { ethers } from "ethers";

// core components
import Navbar from "components/Navbars/ExamplesNavbar.js";
import { MyPageHeader as PageHeader } from "components/PageHeader/MyPageHeader.js";
import CarouselSection from "components/custom/MyCarousel/CarouselSection.js";
import CardsSection from "components/custom/ProductSection/CardsSection.js";
import Footer from "components/Footer/Footer.js";
// import BaseModal from "components/custom/MyModals/BaseModal.js";
import RedeemModal from "components/custom/MyModals/RedeemModal.js";
import { ThreeCircles } from "react-loader-spinner";

import { useGlobalContext } from "contexts/GlobalContextProvider.js";
import { useLS } from "hooks/useLS.js";

import { deployedContractAddresses } from "../../web3/constants/index.js";

import { axiosOracle } from "api/config.js";

import testImage from "assets/img/genera/v3/MGS_to_Rarity.webp";

export default function RewardsPage() {
  const [modalState, setModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [txStatus, setTxStatus] = useState({
    hash: null,
    status: "not started",
    success: null,
    isTx1_Done: false,
  });

  const {
    userData,
    callContractFn,
    callMGSContractFn,
    getRewardsGuestMode,
    getRewards,
    rewards,
    contractInitCompleted,
    contractReadOnlyInitCompleted,
  } = useGlobalContext();

  const resetRedeem = () => {
    setTxStatus({
      hash: null,
      status: "not started",
      success: null,
      isTx1_Done: false,
    });
  };

  const [saveToLS] = useLS();

  const handleRedeemReward = async () => {
    resetRedeem();
    console.log("The Select Reward is: ", selectedReward);
    console.log("The Select Reward's ID is: ", selectedReward.id);
    if (selectedReward === null)
      return console.error("💎 You must select a reward first!");
    // 1. Call the "productClaimer" => contract.productClaimer()
    try {
      // const tx = await callContractFn("productClaimer", selectedReward.id);
      setTxStatus((prev) => {
        return {
          ...prev,
          status: "waiting confirmation",
        };
      });

      // Getting Approval from ERC-20 MGS Contract...
      console.log("Trying TO Approve...");
      const getApproval_Tx = await callMGSContractFn(
        "approve",
        deployedContractAddresses.RewardingToolAddress,
        ethers.utils.parseEther(selectedReward.price.toString())
      );
      console.log("Wating to be approved... ");
      await getApproval_Tx.wait();
      console.log("✅ Approval was granted!");
      setTxStatus((prev) => {
        return {
          ...prev,
          isTx1_Done: true,
        };
      });

      // =====================================================

      console.log("===========================================");
      console.log("Waiting for Web Server to do its magic...");
      console.log("===========================================");

      const secretCode = await axiosOracle.get("/random-number");

      console.log("The Server returned this response: ", secretCode);
      console.log("===========================================");
      console.log("This is the 6-Digit Code: ", secretCode.data.randomNumber);
      console.log("===========================================");

      // =====================================================

      console.log("Trying To Claim Reward...");
      // setSecretCode(secretCode);
      const tx = await callContractFn("productClaimer", selectedReward.id);
      setTxStatus((prev) => {
        return {
          ...prev,
          hash: tx.hash,
        };
      });
      console.log("The Tx Hash: ", tx.hash);
      console.log("Wating to be confirmed... ");
      await tx.wait();
      console.log("✅ Tx got Confirmed! ");

      setTxStatus((prev) => {
        return {
          ...prev,
          status: "completed",
          success: true,
        };
      });

      // Saving Code to LS
      const userRewardsRAW = await callContractFn(
        "getPendingProducts",
        userData.wallet
      );
      console.log("🎪 1. (RewardsPage): User's RAW Rewards: ", userRewardsRAW);
      const convertedRawData = userRewardsRAW.map((pendingReward) => {
        return {
          pendindRewardID: Number(pendingReward[0]),
          RewardID: Number(pendingReward[1]),
          secretCode: secretCode.data.randomNumber,
        };
      });
      console.log(
        "🎪 2. (RewardsPage): User's Converted Rewards: ",
        convertedRawData
      );
      const lastElement = convertedRawData[convertedRawData.length - 1];

      console.log("🎪 3. (RewardsPage): User's Latest Reward: ", lastElement);

      saveToLS(lastElement.pendindRewardID, lastElement.secretCode);

      return secretCode.data.randomNumber;

      // spacer...
    } catch (error) {
      console.log("⛔ Tx got Rejected 😓! ");
      console.log("⛔ Tx Error: ", error);
      setTxStatus((prev) => {
        return {
          ...prev,
          status: "completed",
          success: false,
        };
      });
    }
  };

  React.useEffect(() => {
    document.body.classList.toggle("index-page");

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  React.useEffect(() => {
    console.log("From (RewardsPage: User Data: ", userData);
    if (userData.name === undefined && contractReadOnlyInitCompleted) {
      console.log("GETTING Rewards from Read-Only Contract...");
      getRewardsGuestMode();
    }
    if (!contractInitCompleted) return;
    if (rewards.length === 0) getRewards();

    // For Testing:
    // const testTimerID = setTimeout(() => {
    //   setRewards(testing_items);
    // }, 5000);

    // return () => {
    //   clearTimeout(testTimerID);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewards.length, contractInitCompleted, contractReadOnlyInitCompleted]);

  return (
    <>
      {/* {console.log("Modal's State: ", modalState)} */}
      <Navbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          {/* <BaseModal /> */}
          {/* <Basics /> */}
          {/* <Navbars /> */}
          {/* <Tabs /> */}
          {/* <Pagination /> */}
          {/* <Notifications /> */}
          {/* <Typography /> */}
          {/* <RedeemModal
            isOpen={modalState}
            setModal={setModal}
            title={testing_items[0].title}
            imageSrc={testing_items[0].image}
            price={testing_items[0].price}
            status="Available"
            location={testing_items[0].location}
            shopName="My Shop"
            description={testing_items[0].description}
            isDescriptionVisible={true}
            onRedeem={() => console.log("Redeem clicked")}
          /> */}
          <RedeemModal
            isOpen={modalState}
            setModal={setModal}
            title={selectedReward?.name}
            imageSrc={testImage}
            price={selectedReward?.price}
            status="Available"
            location={selectedReward?.location}
            shopName="My Shop"
            description={selectedReward?.description}
            isDescriptionVisible={true}
            txStatus={txStatus}
            onRedeem={handleRedeemReward}
            resetRedeem={resetRedeem}
            userData={userData}
            gmapsLink={
              "https://www.google.com/maps/place/Palazzo+Doglio/@39.2231215,9.1203936,15.85z/data=!4m17!1m7!3m6!1s0x12ddc48d448d3591:0x339674b6e4ab6631!2sSardinia!8m2!3d40.1208752!4d9.0128926!16zL20vMDc4bGs!3m8!1s0x12e7340ae7363ed1:0xe7882a7e8d11b539!5m2!4m1!1i2!8m2!3d39.2135929!4d9.1218507!16s%2Fg%2F11f2r_pq0y?entry=ttu"
            }
          />
          <CarouselSection />
          {/* <JavaScript /> */}
          {rewards.length > 0 ? (
            <CardsSection
              items={rewards}
              setModal={setModal}
              setSelectedReward={setSelectedReward}
            />
          ) : (
            <Container>
              <h4>Retrieving Available Rewards...</h4>
              <h4>
                If the loading takes too much time, try refreshing the page
              </h4>
              <div style={{ marginBottom: 80, marginTop: 64 }}>
                <ThreeCircles
                  height="150"
                  width="150"
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor="yellow"
                  innerCircleColor="orange"
                  middleCircleColor="red"
                />
              </div>
            </Container>
          )}
          {/* <NucleoIcons /> */}
          {/* <Signup /> */}
          {/* <Examples /> */}
          {/* <Download /> */}
        </div>
        <Footer />
      </div>
    </>
  );
}
