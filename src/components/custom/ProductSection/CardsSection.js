import React from "react";
import { Container } from "reactstrap";

import CardGrid from "./CardGrid.js";

function CardsSection({ items }) {
  return (
    <div id="available-rewards-section" className="section">
      <Container>
        <h3 className="title mb-5">Available Rewards</h3>
        <h4 className=" mb-5">
          You can obtain the following products/services by using our platform's
          tokens
        </h4>
        <CardGrid items={items} />
      </Container>
    </div>
  );
}

export default CardsSection;
