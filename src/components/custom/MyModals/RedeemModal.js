import React, { useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

import "./RedeemModal.styles.css"; // Assuming styles.css is in the same folder
import { ThreeCircles } from "react-loader-spinner";

const CustomErrorToast = ({ text, closeToast, toastProps }) => (
  <div style={{ background: "#yourColor", color: "#otherColor" }}>
    {text}
    {/* <button onClick={closeToast}>Close</button> */}
  </div>
);

const SubWindow = (props) => {
  const { setIsRedeemClicked, cb, txStatus, toggleModal } = props;

  return (
    <div style={{ width: "100%" }}>
      {txStatus.status === "completed" ? (
        <>
          <p
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
              color: txStatus.success ? "#24e00c" : "#e63d5b",
              textShadow: "1px 1px 2px black",
            }}
          >
            {txStatus.success
              ? "The transactions were confirmed!"
              : "The transactions were rejected 😓"}
          </p>
          <p style={{ marginBottom: 36 }}>
            By pressing the "OK button again, you will reinitialze the process.
          </p>
        </>
      ) : (
        <p>
          You will have to confirm 2 transactions using your crypto wallet.
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;1. To allow the MGS Token transfer
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;2. To obtain the Reward
        </p>
      )}

      {txStatus.status !== "waiting confirmation" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "64px",
            marginTop: "24px",
          }}
        >
          <Button
            color="primary"
            onClick={() => {
              console.log('The "OK" Btn was clicked!');
              cb();
            }}
            disabled={txStatus === "waiting confirmation"}
          >
            OK
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setIsRedeemClicked(false);
              toggleModal();
            }}
          >
            No
          </Button>
        </div>
      )}

      {txStatus.status === "waiting confirmation" && (
        <div style={{ marginTop: 32 }}>
          <h4>Check your Crypto Wallet for incoming Transactions...</h4>
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="yellow"
            innerCircleColor="orange"
            middleCircleColor="red"
          />
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
    txStatus,
    gmapsLink,
    resetRedeem,
    userData,
  } = props;
  // console.log("FROM MODAL: ", isOpen);

  //   const [modal, setModal] = useState(isOpen);
  const [isRedeemClicked, setIsRedeemClicked] = useState(false);

  const modalRef = useRef(null);

  // Define a function to handle when the "Redeem" button is clicked
  const handleRedeemClick = () => {
    // TODO: Remove this after TESTING!
    const userData = {
      name: "Giannis",
      tokens: 13.5,
      wallet: "0x3a227614427df0da881CCCf3912795735f95Fb50",
      accessLevel: "manager",
      isLoggedIn: true,
      pendingRewards: [],
    };

    if (
      userData.wallet === undefined ||
      userData.wallet?.length < 20 ||
      userData.isLoggedIn === false
    ) {
      toast.error(
        <CustomErrorToast
          text={"You must Connect your Wallet, to continue."}
        />,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return console.log("⛔ Error: You must Connect your Wallet.");
    }

    if (userData.tokens < price) {
      toast.error(
        <CustomErrorToast text={"You need more MGS Tokens for this Reward."} />,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return console.log("⛔ Error: You need more MGS Tokens for this Reward.");
    }

    setIsRedeemClicked(true);
    const modal = document.querySelector(".modal.fade.show");
    modal.style.overflow = "auto";

    setTimeout(() => {
      modal.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }, 500);
    return;
  };

  const toggle = () => setModal(!isOpen);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={className}
        backdropClassName="backdrop"
        onClosed={() => {
          resetRedeem();
          setIsRedeemClicked(false);
        }}
        ref={modalRef}
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

          {isDescriptionVisible && (
            <p style={{ wordWrap: "break-word" }}>{description}</p>
          )}
        </ModalBody>
        <ModalFooter style={{ border: "none", paddingTop: 0 }}>
          {!isRedeemClicked ? (
            <Button
              color="warning"
              style={{ fontSize: "16px" }}
              onClick={handleRedeemClick}
            >
              Redeem
            </Button>
          ) : (
            <SubWindow
              isRedeemClicked={isRedeemClicked}
              setIsRedeemClicked={setIsRedeemClicked}
              cb={onRedeem}
              txStatus={txStatus}
              toggleModal={toggle}
            />
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RedeemModal;
