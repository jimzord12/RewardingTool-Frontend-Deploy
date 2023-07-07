import React from "react";
import { Row, Col } from "reactstrap";

import MyCard from "./Card.js";

function CardGrid({ items, setModal, setSelectedReward }) {
  return (
    <Row className="my-grid">
      {console.log("(CardGrid): Items: ", items)}
      {items.map((item) => (
        <Col
          className={`${
            item?.isDisabled
              ? "disabled-card"
              : item?.isRedeemed
              ? "disabled-card"
              : ""
          }`}
          sm="4"
          key={item.id}
          onClick={() => {
            if (setModal !== undefined) setModal((prev) => !prev);
            if (setSelectedReward !== undefined) setSelectedReward(item);
          }}
        >
          <MyCard item={item} setSelectedReward={setSelectedReward} />
        </Col>
      ))}
    </Row>
  );
}

export default CardGrid;
