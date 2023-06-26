import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./RedeemModal.styles.css"; // Assuming styles.css is in the same folder

// function scrollElementDown(element, amount) {
//   const parentNode = element.parentNode;
//   console.log("1. Scroll: ", parentNode.scrollTop);
//   //   element.scrollTop += amount;
//   parentNode.scrollTop += amount;
//   console.log("2. Scroll: ", parentNode.scrollTop);
// }

// const scrollElementDown2 = (element) => {
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// };

const SubWindow = (props) => {
  const { setIsRedeemClicked, onRedeem, didTxFinish } = props;

  return (
    <div>
      <p>
        You will have to confirm 2 transactions using your crypto wallet.
        <br />
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;1. To allow the MGS Token transfer
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;2. To obtain the Reward
      </p>

      {didTxFinish && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "64px",
            marginTop: "24px",
          }}
        >
          <Button color="primary" onClick={onRedeem}>
            OK
          </Button>
          <Button color="secondary" onClick={() => setIsRedeemClicked(false)}>
            No
          </Button>
        </div>
      )}
    </div>
  );
};

const RedeemModal = (props) => {
  const {
    isOpen,
    setModal,
    className,
    title,
    imageSrc,
    price,
    status,
    location,
    shopName,
    description,
    isDescriptionVisible,
    onRedeem,
    didTxFinish,
    gmapsLink,
  } = props;
  console.log("FROM MODAL: ", isOpen);

  //   const [modal, setModal] = useState(isOpen);
  const [isRedeemClicked, setIsRedeemClicked] = useState(false);

  //   const modalRef = useRef(null);

  // Define a function to handle when the "Redeem" button is clicked
  const handleRedeemClick = () => {
    setIsRedeemClicked(true);
  };

  const toggle = () => setModal(!isOpen);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={className}
        backdropClassName="backdrop"
        onClosed={() => setIsRedeemClicked(false)}
        // modalTransition={{ timeout: 700 }} // customize the transition duration here
      >
        <ModalHeader
          toggle={toggle}
          style={{ textShadow: "1px 2px 2px black", border: "none" }}
        >
          Reward: "<strong>{title}</strong>"
          <Button close onClick={toggle} />
        </ModalHeader>
        <ModalBody style={{ border: "none" }}>
          {/* <img src={imageSrc} alt={title} width="100%" /> */}
          <div style={{ borderRadius: "10px" }}>
            {console.log("The Modals Image: ", imageSrc)}
            {console.log("The Modals Image: ", imageSrc === undefined)}
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
              alt={title}
              width="100%"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h5>
                Price: <b>{price}</b> MGS
              </h5>
              <h5>
                Status: <b>{status}</b>
              </h5>
            </div>
            <div>
              <h5>
                Location: <b>{location}</b>
              </h5>
              <h5>
                Shop:{" "}
                <a href={gmapsLink}>
                  <b>{shopName}</b>
                </a>
              </h5>
            </div>
          </div>
          {/* {isDescriptionVisible && <p>{description}</p>} */}
          {isDescriptionVisible && (
            <p style={{ wordWrap: "break-word" }}>{description}</p>
          )}
        </ModalBody>
        <ModalFooter style={{ border: "none" }}>
          {!isRedeemClicked ? (
            <Button
              color="warning"
              style={{ fontSize: "16px" }}
              onClick={() => {
                // const modal = document.querySelector(".modal.fade.show");
                handleRedeemClick();
                // console.log("This the Modal's Ref: ", modal);
                // scrollElementDown(modal, 2000);
                return;
              }}
            >
              Redeem
            </Button>
          ) : (
            <SubWindow
              isRedeemClicked={isRedeemClicked}
              setIsRedeemClicked={setIsRedeemClicked}
              cb={onRedeem}
              didTxFinish={didTxFinish}
            />
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RedeemModal;
