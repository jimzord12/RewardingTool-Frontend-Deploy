import React from "react";
import { Container } from "reactstrap";

import PendingCardGrid from "./PendingCardGrid.js";

function filterNotRedeemed(items) {
  return items.filter((item) => item.isRedeemed === false);
}

function PendingCardsSection({ items, handleSelectPendingReward }) {
  const filteredItems = filterNotRedeemed(items);
  return (
    <div id="available-rewards-section">
      <Container>
        {filteredItems.length > 0 && (
          <h3 className="title mb-5">User's Claimable Rewards (Select One)</h3>
        )}
        <PendingCardGrid
          items={filteredItems}
          handleSelectPendingReward={handleSelectPendingReward}
        />
      </Container>
    </div>
  );
}

export default PendingCardsSection;
