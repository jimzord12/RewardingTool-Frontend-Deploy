import React, { useState } from "react";
import { Row, Col } from "reactstrap";

import PendingMyCard from "./PendingCard.js";

function PendingCardGridGrid({ items, handleSelectPendingReward }) {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <Row className="my-grid">
      {console.log("🧪 Items: ", items)}
      {items.length > 0 ? (
        items.map((item, index) => {
          if (item.isRedeemed) {
            return null; // or return whatever you want when isRedeemed is true
          }
          return (
            <Col
              sm="4"
              key={item?.id ? item.id : index}
              onClick={() => {
                setSelectedCard(item); // This stores the selected card LOCALLY
                handleSelectPendingReward(item); // This stores the selected card at "ValidatePage.js"
              }}
            >
              <PendingMyCard item={item} selectedCard={selectedCard} />
            </Col>
          );
        })
      ) : (
        <h3
          style={{
            marginTop: 36,
            textAlign: "center",
            fontSize: 28,
            color: "red",
          }}
        >
          The User does not have any rewards to claim.
        </h3>
      )}
    </Row>
  );
}

export default PendingCardGridGrid;
