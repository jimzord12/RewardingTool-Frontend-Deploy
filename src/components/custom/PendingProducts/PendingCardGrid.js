import React from "react";
import { Row, Col } from "reactstrap";

import PendingMyCard from "./PendingCard.js";

function PendingCardGridGrid({ items, handleSelectPendingReward }) {
  return (
    <Row className="my-grid">
      {items.map((item, index) => (
        <Col sm="4" key={index} onClick={() => handleSelectPendingReward(item)}>
          <PendingMyCard item={item} />
        </Col>
      ))}
    </Row>
  );
}

export default PendingCardGridGrid;
