import React from "react";

import { Container } from "reactstrap";
import MyCarousel from "./MyCarousel";
import { carouselItems } from "./constants";

function CarouselSection() {
  return (
    <Container className="carousel-container">
      <div id="my-carousel-section" className="title">
        <h3>Genera's Web Apps</h3>
      </div>
      <MyCarousel carouselItems={carouselItems} />
    </Container>
  );
}

export default CarouselSection;
