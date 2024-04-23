import React, { useState } from "react";

// core components
import Navbar from "components/Navbars/ExamplesNavbar.js";
import { MyPageHeader as PageHeader } from "components/PageHeader/MyPageHeader.js";
import CarouselSection from "components/custom/MyCarousel/CarouselSection.js";
import CardsSection from "components/custom/ProductSection/CardsSection.js";
import Footer from "components/Footer/Footer.js";
import RedeemModal from "components/custom/MyModals/RedeemModal.js";

import { useGlobalContext } from "contexts/GlobalContextProvider.js";
// import { useLS } from "hooks/useLS.js";

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

  const { userData, callContractFn, callMGSContractFn } = useGlobalContext();

  // const [saveToLS] = useLS();

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
            imageSrc={testImage}
            price={selectedReward?.price}
            status="Available"
            location={selectedReward?.location}
            shopName="My Shop"
            description={selectedReward?.description}
            isDescriptionVisible={true}
            txStatus={txStatus}
            onRedeem={() => console.log("Implement Redeem Function Here")}
            resetRedeem={() =>
              console.log("Implement Reset Redeem Function Here")
            }
            userData={userData}
            gmapsLink={
              "https://www.google.com/maps/place/Palazzo+Doglio/@39.2231215,9.1203936,15.85z/data=!4m17!1m7!3m6!1s0x12ddc48d448d3591:0x339674b6e4ab6631!2sSardinia!8m2!3d40.1208752!4d9.0128926!16zL20vMDc4bGs!3m8!1s0x12e7340ae7363ed1:0xe7882a7e8d11b539!5m2!4m1!1i2!8m2!3d39.2135929!4d9.1218507!16s%2Fg%2F11f2r_pq0y?entry=ttu"
            }
          />
          <CarouselSection />
          {/* TODO: Create an Array of Objects that will hold data about the 3 Features*/}
          <CardsSection
            items={[]}
            setModal={setModal}
            setSelectedReward={setSelectedReward}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}
