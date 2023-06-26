import React from "react";
import { Row, Col } from "reactstrap";

import MyCard from "./Card.js";

function MyGrid({ items, setModal, setSelectedReward }) {
  return (
    <Row className="my-grid">
      {items.map((item, index) => (
        <Col
          sm="4"
          key={index}
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

export default MyGrid;
