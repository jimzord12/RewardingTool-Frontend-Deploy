import React from "react";

import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  ModalFooter,
} from "reactstrap";

import { useGlobalContext } from "contexts/GlobalContextProvider";
import {
  fromTemplateToCard,
  keepOnlySPCards,
  removeNonDisabledSPCards,
} from "./featuresUtils";
import SimpleSpinner from "components/custom/SimpleSpinner/SimpleSpinner";
import classNames from "classnames";
import CustomListItem from "./MiniComps/CustomListItem/CustomListItem";
import RarityUpgradeHandler from "../FeaturesClickHandlers/RarityUpgradeHandler";
import useContractLocalWallet from "hooks/useContractLocalWallet";
import useContractMetamask from "hooks/useContractMetamask";
import { mgsContractDetails } from "constants/mgsContractDetails";
import useToastMsg from "hooks/useToastMsg";
import SPReactivationHandler from "../FeaturesClickHandlers/SPReactivationHandler";

// Index 0: Common, Index 1: Special, Index 2: Rare, Index 3: Mythic, Index 4: Legendary
const rewardCostsBasedOnRarity = [2, 3, 5, 8, 12];

const SPReactivation = ({ setModal }) => {
  const { setUserData, userData, usingLocalWallet } = useGlobalContext();

  const [isTransactionLoading, setIsTransactionLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [MGSCost, setMGSCost] = React.useState(0);

  const { initializeLWContract, isLoadingLWContract } = useContractLocalWallet(
    mgsContractDetails.address,
    mgsContractDetails.abi
  );
  const { initializeMetamaskContract, isLoadingMetamaskContract } =
    useContractMetamask(mgsContractDetails.address, mgsContractDetails.abi);
  const { showToast } = useToastMsg();

  const onlySPCards = keepOnlySPCards(userData.cards); // 1. Keep only SP Cards
  const onlyDisabledSPCards = removeNonDisabledSPCards(onlySPCards);

  const hydratedCards = onlyDisabledSPCards.map((card) =>
    fromTemplateToCard(card)
  );
  console.log("From RarityUpgrade: hydratedCards: ", hydratedCards);

  console.log("From RarityUpgrade: User Data: ", userData);

  React.useEffect(() => {
    if (selectedCard === null) return;
    setMGSCost(rewardCostsBasedOnRarity[selectedCard.rarity - 1]);
  }, [selectedCard]);

  if (hydratedCards.length === 0)
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "1.25rem",
          border: "2px solid orange",
          borderRadius: 10,
          backgroundColor: "rgba(255, 165, 0, 0.3)",
          marginTop: 10,
        }}
      >
        You have no disabled SP cards!
      </div>
    );

  return (
    <div style={{ height: "100%" }}>
      <ListGroup
        style={{
          backgroundColor: "lightblue",
          padding: 12,
          maxHeight: 360,
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {hydratedCards.map((card) => (
          <CustomListItem
            card={card}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ))}
      </ListGroup>

      {/* MGS COST FIELD */}
      <InputGroup
        style={{
          backgroundColor: "lightblue",
          borderRadius: 10,
          marginTop: 16,
        }}
        className={classNames({
          "input-group-focus": false,
        })}
      >
        <InputGroupAddon addonType="prepend">
          <InputGroupText style={{ fontSize: "11px", color: "black" }}>
            {"MGS Cost |"}
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Is calculated here..."
          type="text"
          name="name"
          value={MGSCost}
          readOnly
          onFocus={(e) => true}
          onBlur={(e) => false}
          style={{
            color: "black",
            fontSize: "16px",
            backgroundColor: "lightblue",
          }}
        />
      </InputGroup>

      <ModalFooter style={{ border: "none", paddingTop: 16, paddingBottom: 0 }}>
        <Button
          color="warning"
          style={{ fontSize: "16px" }}
          onClick={async () => {
            const problem = await SPReactivationHandler({
              userData,
              MGSCost,
              selectedCard,
              usingLocalWallet,
              setIsTransactionLoading,
              initializeLWContract,
              initializeMetamaskContract,
              setUserData,
              showToast,
            });
            if (problem === null) return;
            setModal(false);
            setSelectedCard(null);
          }}
          disabled={isTransactionLoading}
        >
          {isTransactionLoading ? <SimpleSpinner /> : "Enable Card"}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default SPReactivation;
