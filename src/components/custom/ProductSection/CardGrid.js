import React from "react";
import { Row, Col } from "reactstrap";

import MyCard from "./Card.js";

function CardGrid({ items, setModal, setSelectedReward }) {
  return (
    <Row className="my-grid">
      {items.map((item, index) => (
        <Col
          className={`${item.isDisabled ? "disabled-card" : ""}`}
          sm="4"
          key={item.id}
          onClick={() => {
            setSelectedReward(item);
            setModal((prev) => !prev);
          }}
        >
          <MyCard item={item} />
        </Col>
      ))}
    </Row>
  );
}

export default CardGrid;
