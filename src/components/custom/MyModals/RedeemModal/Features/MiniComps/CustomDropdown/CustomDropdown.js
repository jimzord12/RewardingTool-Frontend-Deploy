import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { rarityConverter } from "../../featuresUtils";

const CustomDropdown = ({
  currentCardRarity,
  desiredRarity,
  setDesiredRarity,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //   const clickHandler = (selectedRarity) => {
  //     setDesiredRarity(selectedRarity);
  //   };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={currentCardRarity ? toggle : null}>
      <DropdownToggle caret color="success">
        {desiredRarity ? rarityConverter(desiredRarity) : "Select Rarity"}
      </DropdownToggle>
      <DropdownMenu>
        {currentCardRarity <= 1 && (
          <DropdownItem
            style={{ borderBottom: "1px solid rgba(0, 0, 175, 0.5)" }}
            onClick={() => setDesiredRarity(2)}
          >
            Special
          </DropdownItem>
        )}
        {currentCardRarity <= 2 && (
          <DropdownItem
            style={{ borderBottom: "1px solid rgba(0, 0, 175, 0.5)" }}
            onClick={() => setDesiredRarity(3)}
          >
            Rare
          </DropdownItem>
        )}
        {currentCardRarity <= 3 && (
          <DropdownItem
            style={{ borderBottom: "1px solid rgba(0, 0, 175, 0.5)" }}
            onClick={() => setDesiredRarity(4)}
          >
            Mythic
          </DropdownItem>
        )}
        {currentCardRarity <= 4 && (
          <DropdownItem onClick={() => setDesiredRarity(5)}>
            Legendary
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropdown;
