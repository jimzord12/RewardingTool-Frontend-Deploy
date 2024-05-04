import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import "./ValidationModal.styles.css"; // Assuming styles.css is in the same folder
// import { ThreeCircles } from "react-loader-spinner";
function getFromLS(key) {
  try {
    const value = window.localStorage.getItem(key);
    if (value) {
      console.log(`A value exists for key "${key}" in Local Storage.`);
      return value;
    } else {
      console.log(`😓 No value exists for key "${key}" in Local Storage.`);
    }
  } catch (error) {
    console.log(`⛔ An error occurred while checking Local Storage: ${error}`);
  }
}

const UserRewardsCodesModal = (props) => {
  const { isOpen, setModal, selectedReward } = props;

  // const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setModal(false);
    // reset();
    // setIsLoading(true);
    console.log("The Modal is closed!!!");
  };

  // const toggle = () => setModal(!isOpen);
  // React.useEffect(() => {
  //   if (status.state === "completed") {
  //     setIsLoading(false);
  //   }
  // }, [status]);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* {console.log("From Modal: State: ", isOpen)} */}
      <Modal
        isOpen={isOpen}
        // toggle={toggle}
        // className={className}
        centered
        // backdrop="static"
        backdropClassName="backdrop"
        style={{ transform: "translate(0, 0px)" }}
        onClose={() => {
          console.log("The Modal is closed!!!");
        }}
        modalTransition={{ timeout: 700 }} // customize the transition duration here
      >
        <ModalBody style={{ border: "none", paddingBottom: 0 }}>
          <div
            style={{
              borderRadius: "10px",
              color: "#49e80d",
              fontSize: 28,
              textShadow: "1px 1px 1px black",
            }}
          >
            The Redeem Codes
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {selectedReward &&
              selectedReward?.pendindRewardID.map((pendindRewardID) => {
                const code = getFromLS(pendindRewardID);
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#e80db7",
                      marginBottom: 16,
                      borderRadius: 8,
                      boxShadow: "0px 0px 3px 0px black",
                    }}
                  >
                    <div
                      className="mobile-font-custom"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxHeight: "50px",
                      }}
                    >
                      <h3>ID:</h3>
                      <h3
                        style={{
                          color: "#49e80d",
                          textShadow: "1px 1px 1px black",
                        }}
                      >
                        {pendindRewardID}
                      </h3>
                    </div>
                    <div
                      className="mobile-font-custom"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxHeight: "50px",
                      }}
                    >
                      <h3>Name:</h3>
                      <h3
                        style={{
                          color: "#49e80d",
                          textShadow: "1px 1px 1px black",
                        }}
                      >
                        {selectedReward.name}
                      </h3>
                    </div>
                    <div
                      className="mobile-font-custom"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxHeight: "50px",
                      }}
                    >
                      <h3>Code:</h3>
                      <h3
                        style={{
                          color: "#49e80d",
                          textShadow: "1px 1px 1px black",
                        }}
                      >
                        {code ? code : "undefined"}
                      </h3>
                    </div>
                  </div>
                );
              })}
          </div>
        </ModalBody>
        <ModalFooter style={{ border: "none" }}>
          <Button
            color="warning"
            style={{ fontSize: "16px" }}
            onClick={handleClose}
            // disabled={isLoading}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserRewardsCodesModal;
