import React, { useState } from "react";

// core components
import Navbar from "components/Navbars/ExamplesNavbar.js";
import { MyPageHeader as PageHeader } from "components/PageHeader/MyPageHeader.js";
import CarouselSection from "components/custom/MyCarousel/CarouselSection.js";
import CardsSection from "components/custom/ProductSection/CardsSection.js";
import Footer from "components/Footer/Footer.js";
import RedeemModal from "components/custom/MyModals/RedeemModal/RedeemModal.js";

import { useGlobalContext } from "contexts/GlobalContextProvider.js";
// import { useLS } from "hooks/useLS.js";

import MGS_to_Rarity from "assets/img/genera/v3/MGS_to_Rarity.webp";
import MGS_to_Enable_SP_Cards from "assets/img/genera/v3/MGS_to_Enable_SP_Cards.webp";
import MGS_to_Resources from "assets/img/genera/v3/MGS_to_Resources.webp";

const rewardOptions = [
  {
    id: 1,
    name: "MGS to Resources",
    description: "Spend MGS to get resources",
    image: MGS_to_Resources,
    instructions: [
      "Select a Resource",
      "Enter the desired amount (min: 1000)",
      "Press the 'Redeem' button",
    ],
  },
  {
    id: 2,
    name: "Card Rarity Upgrade",
    description: "Spend MGS to upgrade card rarity",
    image: MGS_to_Rarity,
    instructions: ["Select a Card", "Press the 'Redeem' button"],
  },
  {
    id: 3,
    name: "Enable Special Cards",
    description: "Spend MGS to re-enable disabled Special Cards",
    image: MGS_to_Enable_SP_Cards,
    instructions: ["Select a Card", "Press the 'Redeem' button"],
  },
];

export default function RewardsPage() {
  const [modalState, setModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [txStatus, setTxStatus] = useState({
    hash: null,
    status: "not started",
    success: null,
    isTx1_Done: false,
  });

  const { userData, callContractFn, callMGSContractFn } = useGlobalContext();

  React.useEffect(() => {
    document.body.classList.toggle("index-page");

    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  React.useEffect(() => {
    console.log("From (RewardsPage): User Data: ", userData);
  }, []);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <PageHeader />
        <div className="main">
          {/* TODO: The RedeemModal's UI needs to be updated */}
          <RedeemModal
            isOpen={modalState}
            setModal={setModal}
            title={selectedReward?.name}
            imageSrc={selectedReward?.image}
            price={selectedReward?.price}
            rewardId={selectedReward?.id}
            status="Available"
            location={selectedReward?.location}
            shopName="My Shop"
            description={selectedReward?.description}
            isDescriptionVisible={true}
            instructions={selectedReward?.instructions}
            txStatus={txStatus}
            onRedeem={() => console.log("Implement Redeem Function Here")}
            resetRedeem={() =>
              console.log("Implement Reset Redeem Function Here")
            }
          />
          <CarouselSection />
          {/* TODO: Create an Array of Objects that will hold data about the 3 Features*/}
          <CardsSection
            items={rewardOptions}
            setModal={setModal}
            setSelectedReward={setSelectedReward}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
