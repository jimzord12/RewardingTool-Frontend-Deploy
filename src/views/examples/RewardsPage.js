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

import { hardHatAddress } from "../../web3/constants/index.js";

import {
  acropolis,
  convert,
  greek_feta,
  loukaniko,
  hotel,
  guided_tour,
} from "../../assets/img/genera/index.js";
// sections for this page/view
import Basics from "views/IndexSections/Basics.js";
import Navbars from "components/Navbars/ExamplesNavbar";
import Tabs from "views/IndexSections/Tabs.js";
import Pagination from "views/IndexSections/Pagination.js";
import Notifications from "views/IndexSections/Notifications.js";
import Typography from "views/IndexSections/Typography.js";
import JavaScript from "views/IndexSections/JavaScript.js";
import NucleoIcons from "views/IndexSections/NucleoIcons.js";
import Signup from "views/IndexSections/Signup.js";
import Examples from "views/IndexSections/Examples.js";
import Download from "views/IndexSections/Download.js";

const testing_items = [
  {
    id: 0,
    title: "Crete's Famous Cheese",
    description: "This is the description for Book 1.",
    image: greek_feta,
    price: 13.5,
    amount: 23,
    location: "Crete",
  },
  {
    id: 1,
    title: " Mykono's Traditional Sausage",
    description: "This is a wondeful description for this prodect.",
    image: loukaniko,
    price: 25.0,
    amount: 11,
    location: "Mykonos",
  },
  {
    id: 2,
    title: "Acropolis Tickets",
    description: "This is a wondeful description for this prodect.",
    image: acropolis,
    price: 28.6,
    amount: 5,
    location: "N/A",
  },
  {
    id: 3,
    title: "Guided Tour",
    description: "This is a wondeful description for this prodect.",
    image: guided_tour,
    price: 33.2,
    amount: 36,
    location: "Tinos",
  },
  {
    id: 4,
    title: "In-Game Gold",
    description: "This is a wondeful description for this prodect.",
    image: convert,
    price: 10.0,
    amount: "Infinite",
    location: "N/A",
  },
  {
    id: 5,
    title: "Hotel Accommodation",
    description: "This is a wondeful description for this prodect.",
    image: hotel,
    price: 127.5,
    amount: 3,
    location: "Sikelia",
  },
];

export default function RewardsPage() {
  const [modalState, setModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [txStatus, setTxStatus] = useState({
    hash: null,
    status: "not started",
    success: null,
  });

  const {
    userData,
    callContractFn,
    callMGSContractFn,
    getRewards,
    rewards,
    // setRewards,
    // isProductsLoading,
    contractInitCompleted,
    MGSContractInitCompleted,
  } = useGlobalContext();

  const resetRedeem = () => {
    setTxStatus({
      hash: null,
      status: "not started",
      success: null,
    });
  };

  const handleRedeemReward = async () => {
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
      console.log("Sas9unhda9sda: ", selectedReward.price);

      // Getting Approval from ERC-20 MGS Contract...
      console.log("Trying TO Approve...");
      const getApproval_Tx = await callMGSContractFn(
        "approve",
        hardHatAddress,
        ethers.utils.parseEther(selectedReward.price.toString())
      );
      console.log("Wating to be approved... ");
      getApproval_Tx.wait();
      console.log("✅ Approval was granted!");

      console.log("Trying TO Claim Reward...");
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
    if (!contractInitCompleted) return;
    if (rewards.length === 0) getRewards();

    // For Testing:
    // const testTimerID = setTimeout(() => {
    //   setRewards(testing_items);
    // }, 5000);

    // return () => {
    //   clearTimeout(testTimerID);
    // };
  }, [rewards.length, contractInitCompleted]);

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
            imageSrc={selectedReward?.image}
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
