import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";

import "./RedeemModal.styles.css";
import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import { useGlobalContext } from "contexts/GlobalContextProvider";

import { getMGSBalance } from "api";
import ResourceButton from "../../ResourceButton/ResourceButton";
import classNames from "classnames";
import useContractLocalWallet from "hooks/useContractLocalWallet";
import useContractMetamask from "hooks/useContractMetamask";
import { mgsContractDetails } from "constants/mgsContractDetails";
import { ethers } from "ethers";
import useToastMsg from "hooks/useToastMsg";
import { updatePlayerData } from "api";
import SimpleSpinner from "../../SimpleSpinner/SimpleSpinner";
import RedeemModalTitle from "./Parts/RedeemModalTitle";
import RedeemModalImage from "./Parts/RedeemModalImage";
import RedeemModalDesc from "./Parts/RedeemModalDesc";
import RedeemModalInstructions from "./Parts/RedeemModalInstructions";
import RedeemFeature from "./Parts/RedeemFeature";

const CustomErrorToast = ({ text1, text2, text3 }) => (
  <div>
    {text1}
    {text2 && (
      <>
        <br />
        <br />
        {text2}
      </>
    )}
    {text3 && (
      <>
        <br />
        <br />
        {text3}
      </>
    )}
  </div>
);

const MGSToResourcesModal = (props) => {
  const {
    isOpen,
    setModal,
    className,
    title,
    imageSrc,
    rewardId,
    price,
    status,
    location,
    shopName,
    description,
    isDescriptionVisible,
    onRedeem,
    txStatus,
    gmapsLink,
    resetRedeem,
    instructions,
    // userData,
  } = props;
  // console.log("FROM MODAL: ", isOpen);

  //   const [modal, setModal] = useState(isOpen);
  // const [isRedeemClicked, setIsRedeemClicked] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const [resourceAmountFocus, setResourceAmountFocus] = React.useState(false);
  const [resourceAmountField, setResourceAmountField] = React.useState({
    type: "ResourceAmountField",
    value: "",
  });

  const [resourceType, setResourceType] = React.useState(null);
  const [MGSCost, setMGSCost] = React.useState(null);

  // Hooks
  const { hasMetamask, wallet } = useMetaMask();
  const { setUserData, userData, usingLocalWallet } = useGlobalContext();
  const { initializeLWContract, isLoadingLWContract } = useContractLocalWallet(
    mgsContractDetails.address,
    mgsContractDetails.abi
  );
  const { initializeMetamaskContract, isLoadingMetamaskContract } =
    useContractMetamask(mgsContractDetails.address, mgsContractDetails.abi);

  const { showToast } = useToastMsg();
  const modalRef = useRef(null);

  useEffect(() => {
    // This code runs when the component mounts

    return () => {
      // This cleanup function runs when the component unmounts
      console.log("Modal is unmounting");
    };
  }, []);

  // Define a function to handle when the "Redeem" button is clicked
  const handleRedeemClick = async () => {
    const isUserLoggedIn = userData.isLoggedIn;
    if (!isUserLoggedIn) {
      toast.error(
        <CustomErrorToast text1={`You must be logged in to proceed`} />,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      console.log("MGSToResourcesModal: ⛔ You must be logged in to proceed");
      return;
    }

    if (userData.mgsTokens < MGSCost) {
      toast.error(
        <CustomErrorToast text1={`You do not possess enough MGS Tokens`} />,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      console.log(
        "MGSToResourcesModal: ⛔ You do not possess enough MGS Tokens"
      );
      return;
    }

    if (resourceAmountField.value < 1000) {
      toast.error(
        <CustomErrorToast text1={`The minimum amount of resources is 1000`} />,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }

    if (usingLocalWallet) {
      setIsTransactionLoading(true);
      try {
        // 0. Create the Contract Instance
        const contract = await initializeLWContract();

        // 1. Perform the blockchain transaction: UserWallet -> Contract
        const operationWeiCost = ethers.utils.parseUnits(
          String(MGSCost),
          "ether"
        );
        console.log("The Contract Instance: ", contract);
        const transferTx = await contract.transfer(
          mgsContractDetails.address,
          operationWeiCost
        );
        await transferTx.wait();

        // 3. Update the Resources in the Database
        console.log("The UserData: ", userData);
        const newResourceAmount =
          userData.player[resourceType] + resourceAmountField.value;
        await updatePlayerData(userData.player.id, {
          [resourceType]: newResourceAmount,
        });

        // 4. Update the Client's Resource Amount
        setUserData((prev) => ({
          ...prev,
          mgsTokens: parseFloat(prev.mgsTokens - MGSCost).toPrecision(4),
          player: { ...prev.player, [resourceType]: newResourceAmount },
        }));

        setIsTransactionLoading(false);
        showToast("Success", "The Transaction was successful", "success");
      } catch (error) {
        console.log(
          "⛔ MGSToResourcesModal (LW): MGS to Resources Error: ",
          error
        );
        showToast("Redeem Error (LW)", "Something went wrong", "error");
        setIsTransactionLoading(false);
      }
    } else {
      setIsTransactionLoading(true);
      try {
        // 0. Create the Contract Instance
        const contract = await initializeMetamaskContract();
        console.log("The Contract Instance: ", contract);

        // 1. Perform the blockchain transaction: UserWallet -> Contract
        const operationWeiCost = ethers.utils.parseUnits(
          String(MGSCost),
          "ether"
        );
        const transferTx = await contract.transfer(
          mgsContractDetails.address,
          operationWeiCost
        );
        await transferTx.wait();

        // 3. Update the Resources in the Database
        console.log("The UserData: ", userData);
        const newResourceAmount =
          userData.player[resourceType] + resourceAmountField.value;
        await updatePlayerData(userData.player.id, {
          [resourceType]: newResourceAmount,
        });

        // 4. Update the Client's Resource Amount
        setUserData((prev) => ({
          ...prev,
          mgsTokens: parseFloat(prev.mgsTokens - MGSCost).toPrecision(4),
          player: { ...prev.player, [resourceType]: newResourceAmount },
        }));
        setIsTransactionLoading(false);
        showToast("Success", "The Transaction was successful", "success");
      } catch (error) {
        console.log(
          "⛔ MGSToResourcesModal (MM): MGS to Resources Error: ",
          error
        );
        showToast("Redeem Error (MM)", "Something went wrong", "error");
        setIsTransactionLoading(false);
      }
    }
  };

  const toggle = () => setModal(!isOpen);

  return (
    // <div description="Redeem Modal's Container">
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
          <RedeemFeature rewardId={rewardId} />
        </div>
      </ModalBody>

      <ModalFooter style={{ border: "none", paddingTop: 0 }}>
        <Button
          color="warning"
          style={{ fontSize: "16px" }}
          onClick={handleRedeemClick}
          disabled={isTransactionLoading}
        >
          {isTransactionLoading ? <SimpleSpinner /> : "Redeem"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MGSToResourcesModal;
