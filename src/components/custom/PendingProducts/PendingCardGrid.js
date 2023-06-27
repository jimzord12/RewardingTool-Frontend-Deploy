import React, { useState } from "react";
import { Row, Col } from "reactstrap";

import PendingMyCard from "./PendingCard.js";

function PendingCardGridGrid({ items, handleSelectPendingReward }) {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <Row className="my-grid">
      {items.map((item, index) => (
        <Col
          sm="4"
          key={index}
          onClick={() => {
            setSelectedCard(item); // This stores the selected card LOCALLY
            handleSelectPendingReward(item); // This stores the selected card at "ValidatePage.js"
          }}
        >
          <PendingMyCard item={item} selectedCard={selectedCard} />
        </Col>
      ))}
    </Row>
  );
}

export default PendingCardGridGrid;
