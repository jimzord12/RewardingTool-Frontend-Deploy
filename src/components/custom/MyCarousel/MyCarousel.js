import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  // CarouselCaption,
} from "reactstrap";

import CarouselText from "./CarouselText";

const buttonLinks = [
  "https://genera-game-v3-new-graphics.vercel.app/",
  "https://discord.gg/Wv8nzm4KW6",
  "https://life-genera.eu/",
];

export default function MyCarousel({ carouselItems }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = carouselItems.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="carousel-img" src={item.src} alt={item.altText} />
        {/* <CarouselCaption
          className="carousel-caption-text"
          captionText={item.caption}
          captionHeader={item.altText}
        /> */}
      </CarouselItem>
    );
  });

  return (
    <div>
      <Row
        className="justify-content-between
      "
      >
        <Col className="mb-5 mb-lg-0" lg="6">
          {
            <CarouselText
              text={carouselItems[activeIndex].desc}
              title={carouselItems[activeIndex].title}
            />
          }
          <Button
            className="mt-4"
            color="warning"
            href={buttonLinks[activeIndex]}
          >
            Check it out
          </Button>
        </Col>
        <Col className="mb-5 mb-lg-0 carousel-container" lg="6">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators
              items={carouselItems}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
          <p>Current slide is: {activeIndex + 1}</p>
        </Col>
      </Row>
    </div>
  );
}
