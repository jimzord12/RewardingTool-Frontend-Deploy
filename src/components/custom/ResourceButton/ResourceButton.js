import React from "react";

import "./ResourceButton.css";
import { resources } from "assets/img/genera/v3/index";

const resourceImages = {
  concrete: resources.concreteImg,
  metals: resources.metalsImg,
  crystals: resources.crystalsImg,
  diesel: resources.dieselImg,
};

const ResourceButton = ({ type, isSelected, onClick }) => {
  return (
    <div
      className={
        isSelected
          ? "resource-grid-button resource-grid-button-selected"
          : "resource-grid-button"
      }
      onClick={onClick}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div className="resource-grid-button-image-container">
          <img
            className="resource-grid-button-image"
            src={resourceImages[type]}
            alt={`Resource ${type}`}
          />
        </div>
        <h3 className="resource-grid-button-text">{type}</h3>
      </div>
    </div>
  );
};

export default ResourceButton;
