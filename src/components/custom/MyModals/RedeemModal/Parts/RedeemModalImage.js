import React from "react";

const RedeemModalImage = ({ imageSrc, altText }) => {
  return (
    <div style={{ borderRadius: "10px" }}>
      <img
        src={
          imageSrc !== undefined
            ? imageSrc
            : "https://static.vecteezy.com/system/resources/previews/004/968/590/original/no-result-data-not-found-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-landing-page-empty-state-ui-infographic-etc-vector.jpg"
        }
        style={{
          borderRadius: "10px",
          display: "block",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
        }}
        alt={altText}
        width="100%"
      />
    </div>
  );
};

export default RedeemModalImage;
