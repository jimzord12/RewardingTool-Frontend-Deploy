import React, { useRef, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";

import "./RedeemModal.styles.css";
import { useGlobalContext } from "contexts/GlobalContextProvider";

import { getMGSBalance } from "api";

import RedeemModalTitle from "./Parts/RedeemModalTitle";
import RedeemModalImage from "./Parts/RedeemModalImage";
import RedeemModalDesc from "./Parts/RedeemModalDesc";
import RedeemModalInstructions from "./Parts/RedeemModalInstructions";
import RedeemFeature from "./Parts/RedeemFeature";

const MGSToResourcesModal = (props) => {
  const {
    isOpen,
    setModal,
    className,
    title,
    imageSrc,
    rewardId,
    description,
    isDescriptionVisible,
    instructions,
  } = props;

  // Hooks
  const { setUserData, userData, usingLocalWallet } = useGlobalContext();

  const modalRef = useRef(null);

  useEffect(() => {
    // This code runs when the component mounts

    return () => {
      // This cleanup function runs when the component unmounts
      console.log("Modal is unmounting");
    };
  }, []);

  const toggle = () => setModal(!isOpen);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className={className}
      backdropClassName="backdrop"
      backdrop="static"
      onClosed={async () => {
        // resetRedeem();
        // setIsRedeemClicked(false);
        // TODO: Update User Balance
        const walletAddress = usingLocalWallet
          ? userData.localWallet.account
          : userData.metamaskWallet.accounts[0];
        const { success, balance } = await getMGSBalance(walletAddress);
        if (success) {
          setUserData((prev) => ({
            ...prev,
            mgsTokens: balance,
          }));
        }
      }}
      ref={modalRef}
    >
      <RedeemModalTitle title={title} toggle={toggle} />

      <ModalBody style={{ border: "none" }}>
        <RedeemModalImage imageSrc={imageSrc} altText={title} />

        {isDescriptionVisible && <RedeemModalDesc description={description} />}

        <div>
          <RedeemModalInstructions arrayOfInstructions={instructions} />
          <RedeemFeature rewardId={rewardId} setModal={setModal} />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MGSToResourcesModal;
