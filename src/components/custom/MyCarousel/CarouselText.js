import React from "react";

function CarouselText({ text, title }) {
  return (
    <div style={{ maxWidth: "94%" }}>
      <h1 className="text-white font-weight-light">{title}</h1>
      <p className="text-white mt-4">{text}</p>
    </div>
  );
}

export default CarouselText;
