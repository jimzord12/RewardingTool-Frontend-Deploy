import React, { useState } from "react";
import "./SwitchButton.css"; // Make sure to create this CSS file in your project

const SwitchButton = ({ state, onClick }) => {
  const [toggle, setToggle] = useState(state);

  const circleColor = "darkorange";

  const toggleSwitch = () => {
    onClick((prev) => {
      console.log("SW BTN | Using Local Wallet: ", !prev);
      return !prev;
    });
    setToggle((prev) => !prev);
  };

  return (
    <div className="switch-button" onClick={toggleSwitch}>
      <p className="switch-inside-text-local">L</p>
      <p className="switch-inside-text-metamask">M</p>
      <div
        className={`switch-circle ${toggle ? "" : "active"}`}
        style={{ backgroundColor: toggle ? undefined : circleColor }}
      ></div>
    </div>
  );
};

export default SwitchButton;
