import React from "react";
import { Container } from "reactstrap";

import CardGrid from "./CardGrid.js";

function CardsSection({ items, setModal, setSelectedReward }) {
  return (
    <div id="available-rewards-section" className="section">
      <Container>
        <h3 className="title mb-5">Available Redeem Method</h3>
        <h4 className=" mb-5">
          Please select one of the available redeem methods below:
        </h4>
        <CardGrid
          items={items}
          setModal={setModal}
          setSelectedReward={setSelectedReward}
        />
      </Container>
    </div>
  );
}

export default CardsSection;
