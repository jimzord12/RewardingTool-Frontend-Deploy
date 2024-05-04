import React from "react";
import { Button, ModalHeader } from "reactstrap";

const RedeemModalTitle = ({ title, toggle }) => {
  return (
    <ModalHeader
      //   toggle={toggle}
      style={{ textShadow: "1px 2px 2px black", border: "none" }}
    >
      Reward: "<strong>{title}</strong>"
      <Button close onClick={toggle} />
    </ModalHeader>
  );
};

export default RedeemModalTitle;
