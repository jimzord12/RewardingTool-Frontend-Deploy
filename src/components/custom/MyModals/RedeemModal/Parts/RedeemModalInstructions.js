import React from "react";

const RedeemModalInstructions = ({ arrayOfInstructions }) => {
  return (
    <div>
      <h5>Instructions:</h5>
      <ol>
        {arrayOfInstructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
};

export default RedeemModalInstructions;
