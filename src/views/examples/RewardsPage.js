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

// core components
import Navbar from "components/Navbars/ExamplesNavbar.js";
import { MyPageHeader as PageHeader } from "components/PageHeader/MyPageHeader.js";
import CarouselSection from "components/custom/MyCarousel/CarouselSection.js";
import CardsSection from "components/custom/ProductSection/CardsSection.js";
import Footer from "components/Footer/Footer.js";
// import BaseModal from "components/custom/MyModals/BaseModal.js";
import RedeemModal from "components/custom/MyModals/RedeemModal.js";

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
    price: 13.5 + " MGS",
    amount: 23,
    location: "Crete",
  },
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
    id: 2,
    title: "Acropolis Tickets",
    description: "This is a wondeful description for this prodect.",
    image: acropolis,
    price: 28.6 + " MGS",
    amount: 5,
    location: "N/A",
  },
  {
    id: 3,
    title: "Guided Tour",
    description: "This is a wondeful description for this prodect.",
    image: guided_tour,
    price: 33.2 + " MGS",
    amount: 36,
    location: "Tinos",
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
  {
    id: 5,
    title: "Hotel Accommodation",
    description: "This is a wondeful description for this prodect.",
    image: hotel,
    price: 127.5 + " MGS",
    amount: 3,
    location: "Sikelia",
  },
];

export default function RewardsPage() {
  const [modalState, setModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [didTxFinish, setDidTxFinish] = useState("not started");

  const handleRedeemReward = () => {
    setDidTxFinish("waiting confimation");
    // 1. Call the "productClaimer" => contract.productClaimer()
  };

  React.useEffect(() => {
    document.body.classList.toggle("index-page");

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <>
      {console.log("Modal's State: ", modalState)}
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
            title={selectedReward?.title}
            imageSrc={selectedReward?.image}
            price={selectedReward?.price}
            status="Available"
            location={selectedReward?.location}
            shopName="My Shop"
            description={selectedReward?.description}
            isDescriptionVisible={true}
            didTxFinish={didTxFinish}
            onRedeem={() => console.log("Redeem clicked")}
          />
          <CarouselSection />
          {/* <JavaScript /> */}
          <CardsSection
            items={testing_items}
            setModal={setModal}
            setSelectedReward={setSelectedReward}
          />
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
