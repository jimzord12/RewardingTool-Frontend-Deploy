import React from "react";
import { ListGroupItem } from "reactstrap";
import { rarityConverter } from "../../featuresUtils";
import "./CustomListItem.css";

const CustomListItem = ({
  card,
  selectedCard,
  setSelectedCard,
  setDesiredRarity,
}) => {
  return (
    <ListGroupItem
      className={
        selectedCard?.id === card.id
          ? "card-rarity-list-item-selected"
          : "card-rarity-list-item"
      }
      key={card.id}
      style={{ backgroundColor: "purple", padding: "0.75rem" }}
      active={selectedCard?.id === card.id}
      onClick={() => {
        setSelectedCard(card);
        if (setDesiredRarity !== undefined) setDesiredRarity(null);
      }}
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
        <div>{card.level === 0 ? "N/A" : card.level}</div>
        <div
          style={{
            margin: "0px 16px",
            border: "1px solid lightblue",
            height: 32,
          }}
        />
      </div>
    </ListGroupItem>
  );
};

export default CustomListItem;
