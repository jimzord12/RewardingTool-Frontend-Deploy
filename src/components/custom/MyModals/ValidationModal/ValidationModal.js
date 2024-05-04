import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import "./ValidationModal.styles.css"; // Assuming styles.css is in the same folder
import { ThreeCircles } from "react-loader-spinner";

const ValidationModal = (props) => {
  const { isOpen, setModal, className, status, reset } = props;

  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => {
    setModal(false);
    reset();
    setIsLoading(true);
    console.log("The Modal is closed!!!");
  };

  const toggle = () => setModal(!isOpen);
  React.useEffect(() => {
    if (status.state === "completed") {
      setIsLoading(false);
    }
  }, [status]);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* {console.log("From Modal: State: ", isOpen)} */}
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={className}
        centered
        backdrop="static"
        backdropClassName="backdrop"
        style={{ transform: "translate(0, -50px)" }}
        onClose={() => {
          reset();
          console.log("The Modal is closed!!!");
        }}
        modalTransition={{ timeout: 700 }} // customize the transition duration here
      >
        <ModalBody style={{ border: "none", paddingBottom: 0 }}>
          {/* <img src={imageSrc} alt={title} width="100%" /> */}
          <div style={{ borderRadius: "10px" }}>
            {isLoading ? (
              <ThreeCircles
                height="150"
                width="150"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="white"
                innerCircleColor="white"
                middleCircleColor="white"
              />
            ) : status.success ? (
              <img
                src={
                  "https://www.pngkit.com/png/full/47-479765_best-free-checkmark-check-mark-transparent-background-free.png"
                }
                style={{
                  borderRadius: "10px",
                  display: "block",
                  // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                }}
                alt={"Checkmark"}
                width="100%"
              />
            ) : (
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/001/194/357/non_2x/no-sign-cross-png.png"
                }
                style={{
                  borderRadius: "10px",
                  display: "block",
                  // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                }}
                alt={"Checkmark"}
                width="100%"
              />
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <h4>
                Status:{" "}
                <b>
                  {status.state === "waiting"
                    ? "Waiting for Confirmation..."
                    : status.state === "completed" && status.success
                    ? "User is illegible to claim the Reward"
                    : "User is NOT allowed to claim the Reward"}
                </b>
              </h4>
            </div>
          </div>
        </ModalBody>
        <ModalFooter style={{ border: "none" }}>
          <Button
            color="warning"
            style={{ fontSize: "16px" }}
            onClick={handleClose}
            disabled={isLoading}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ValidationModal;
