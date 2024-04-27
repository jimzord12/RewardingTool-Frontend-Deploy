import React from "react";
import { useGlobalContext } from "contexts/GlobalContextProvider.js";

import "./SwitchButton.css"; // Make sure to create this CSS file in your project

const SwitchButton = React.memo(() => {
  const { usingLocalWallet, setUsingLocalWallet } = useGlobalContext();
  // const [toggle, setToggle] = useState(state);

  const circleColor = "darkorange";
  console.log("SW BTN | UsingLocalWallet: ", usingLocalWallet);

  const toggleSwitch = () => {
    setUsingLocalWallet((prev) => {
      console.log("SW BTN | Using Local Wallet: ", !prev);
      return !prev;
    });
  };

  return (
    <div className="switch-button" onClick={toggleSwitch}>
      <p className="switch-inside-text-local">L</p>
      <p className="switch-inside-text-metamask">M</p>
      <div
        className={`switch-circle ${usingLocalWallet ? "" : "active"}`}
        style={{ backgroundColor: usingLocalWallet ? undefined : circleColor }}
      ></div>
    </div>
  );
});

export default SwitchButton;
