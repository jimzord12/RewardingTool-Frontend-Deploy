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
  rarityConverter,
  removeIfInMarketplace,
  removeLegendaryCards,
} from "./featuresUtils";
import SimpleSpinner from "components/custom/SimpleSpinner/SimpleSpinner";
import classNames from "classnames";
import CustomListItem from "./MiniComps/CustomListItem/CustomListItem";
import CustomDropdown from "./MiniComps/CustomDropdown/CustomDropdown";
import RarityUpgradeHandler from "../FeaturesClickHandlers/RarityUpgradeHandler";
import useContractLocalWallet from "hooks/useContractLocalWallet";
import useContractMetamask from "hooks/useContractMetamask";
import { mgsContractDetails } from "constants/mgsContractDetails";
import useToastMsg from "hooks/useToastMsg";

const upgradeCosts = [3, 5, 8, 12]; // Index 0: 1 -> 2, Index 1: 2 -> 3, Index 2: 3 -> 4, Index 3: 4 -> 5

const RarityUpgrade = ({ setModal }) => {
  const { setUserData, userData, usingLocalWallet } = useGlobalContext();

  const [isTransactionLoading, setIsTransactionLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [desiredRarity, setDesiredRarity] = React.useState(null);
  const [MGSCost, setMGSCost] = React.useState(0);

  const { initializeLWContract, isLoadingLWContract } = useContractLocalWallet(
    mgsContractDetails.address,
    mgsContractDetails.abi
  );
  const { initializeMetamaskContract, isLoadingMetamaskContract } =
    useContractMetamask(mgsContractDetails.address, mgsContractDetails.abi);
  const { showToast } = useToastMsg();

  // const nonSPCards = removeSPCards(userData.cards); // 1. Remove SP Cards, cuz they can't be upgraded
  const notForSaleCards = removeIfInMarketplace(userData.cards); // 3. Remove Cards that are not for sale
  const nonLegendaryCards = removeLegendaryCards(notForSaleCards); // 2. Remove Legendary Cards, cuz they can't be upgraded any further

  const hydratedCards = nonLegendaryCards.map((card) =>
    fromTemplateToCard(card)
  );
  console.log("From RarityUpgrade: hydratedCards: ", hydratedCards);

  React.useEffect(() => {
    const currentRarity = selectedCard?.rarity;
    const difference = desiredRarity - currentRarity;

    console.log("From RarityUpgrade: Current Rarity: ", currentRarity);
    console.log("From RarityUpgrade: Desired Rarity: ", desiredRarity);

    let cost = 0;
    for (let i = 0; i < difference; i++) {
      cost += upgradeCosts[currentRarity + i - 1];
    }
    setMGSCost(cost);

    // setMGSCost(calcMGSCost(resourceAmountField.value, resourceType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desiredRarity, selectedCard?.rarity]);

  console.log("From RarityUpgrade: User Data: ", userData);
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
        You have no cards to upgrade!
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
            setDesiredRarity={setDesiredRarity}
          />
        ))}
      </ListGroup>

      <div style={{ marginTop: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h4 style={{ marginBottom: 4 }}>Current Card Rarity: </h4>
          <Button>{rarityConverter(selectedCard?.rarity)}</Button>
        </div>

        {/* RARITY DROP-DOWN */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h4 style={{ marginBottom: 4 }}>Upgrade to: </h4>
          <CustomDropdown
            currentCardRarity={selectedCard?.rarity}
            desiredRarity={desiredRarity}
            setDesiredRarity={setDesiredRarity}
          />
        </div>
      </div>

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
            const problem = await RarityUpgradeHandler({
              userData,
              MGSCost,
              selectedCard,
              desiredRarity,
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
          {isTransactionLoading ? <SimpleSpinner /> : "Upgrade"}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default RarityUpgrade;
