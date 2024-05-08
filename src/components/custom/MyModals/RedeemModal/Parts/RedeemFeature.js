import React from "react";
import MGSToResources from "../Features/MGSToResources";
import RarityUpgrade from "../Features/RarityUpgrade";
import SPReactivation from "../Features/SPReactivation";

const RedeemFeature = ({ rewardId, setModal }) => {
  if (rewardId === 1) return <MGSToResources />;
  if (rewardId === 2) return <RarityUpgrade setModal={setModal} />;
  if (rewardId === 3) return <SPReactivation setModal={setModal} />;
  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          color: "crimson",
          fontWeight: "bold",
          textShadow: "2px 2px 5px black",
        }}
      >
        You Forgot to Implement this RedeemFeature!
      </h3>
    </div>
  );
};

export default RedeemFeature;
