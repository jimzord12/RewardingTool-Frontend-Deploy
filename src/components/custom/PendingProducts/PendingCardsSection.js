import React from "react";
import { Container } from "reactstrap";

import PendingCardGrid from "./PendingCardGrid.js";

function PendingCardsSection({ items, handleSelectPendingReward }) {
  return (
    <div id="available-rewards-section" className="section">
      <Container>
        <h3 className="title mb-5">User's Claimable Rewards</h3>
        <PendingCardGrid
          items={items}
          handleSelectPendingReward={handleSelectPendingReward}
        />
      </Container>
    </div>
  );
}

export default PendingCardsSection;
