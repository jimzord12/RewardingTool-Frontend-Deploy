import React from "react";
import {
  Button,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  ModalFooter,
} from "reactstrap";

import { useGlobalContext } from "contexts/GlobalContextProvider";
import {
  fromTemplateToCard,
  rarityConverter,
  removeLegendaryCards,
  removeSPCards,
} from "./featuresUtils";
import SimpleSpinner from "components/custom/SimpleSpinner/SimpleSpinner";
import classNames from "classnames";

const upgradeCosts = [3, 5, 8, 12]; // Index 0: 1 -> 2, Index 1: 2 -> 3, Index 2: 3 -> 4, Index 3: 4 -> 5

const RarityUpgrade = () => {
  const { setUserData, userData, usingLocalWallet } = useGlobalContext();

  const [isTransactionLoading, setIsTransactionLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [desiredRarity, setDesiredRarity] = React.useState(null);
  const [MGSCost, setMGSCost] = React.useState(0);

  const nonSPCards = removeSPCards(userData.cards); // 1. Remove SP Cards, cuz they can't be upgraded
  const nonLegendaryCards = removeLegendaryCards(nonSPCards); // 2. Remove Legendary Cards, cuz they can't be upgraded any further

  const hydratedCards = nonLegendaryCards.map((card) =>
    fromTemplateToCard(card)
  );
  console.log("From RarityUpgrade: hydratedCards: ", hydratedCards);

  const testArray = [
    ...hydratedCards,
    ...hydratedCards,
    ...hydratedCards,
    ...hydratedCards,
    ...hydratedCards,
  ];

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
        {hydratedCards.length === 0 ? (
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
        ) : (
          testArray.map((card) => (
            <ListGroupItem
              key={card.id}
              style={{ backgroundColor: "purple", padding: "0.75rem" }}
              active={selectedCard?.id === card.id}
              onClick={() => setSelectedCard(card)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div style={{ width: 50, height: 50 }}>
                  <img
                    src={card.image}
                    alt={card.desc}
                    style={{ objectFit: "contain", width: 50, height: 50 }}
                  />
                </div>
                <div
                  style={{
                    margin: "0px 16px",
                    border: "1px solid lightblue",
                    height: 32,
                  }}
                />
                <div>#{card.id}</div>
                <div
                  style={{
                    margin: "0px 16px",
                    border: "1px solid lightblue",
                    height: 32,
                  }}
                />
                <div>{rarityConverter(card.rarity).padEnd(12, " ")}</div>
                <div
                  style={{
                    margin: "0px 16px",
                    border: "1px solid lightblue",
                    height: 32,
                  }}
                />
                <div>{card.level}</div>
                <div
                  style={{
                    margin: "0px 16px",
                    border: "1px solid lightblue",
                    height: 32,
                  }}
                />
              </div>
            </ListGroupItem>
          ))
        )}
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
          <DropdownToggle caret color="success">
            Select Rarity
          </DropdownToggle>
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
          onClick={async () => {}}
          // disabled={isTransactionLoading}
        >
          {isTransactionLoading ? <SimpleSpinner /> : "Upgrade Rarity"}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default RarityUpgrade;
