import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";

import "./RedeemModal.styles.css"; // Assuming styles.css is in the same folder
// import { ThreeCircles } from "react-loader-spinner";
import { useMetaMask } from "contexts/web3/MetaMaskContextProvider";
import { useGlobalContext } from "contexts/GlobalContextProvider";

import { getMGSBalance } from "api";
import ResourceButton from "../ResourceButton/ResourceButton";
import classNames from "classnames";
import useContractLocalWallet from "hooks/useContractLocalWallet";
import useContractMetamask from "hooks/useContractMetamask";
import { mgsContractDetails } from "constants/mgsContractDetails";
import { ethers } from "ethers";
import useToastMsg from "hooks/useToastMsg";
import { updatePlayerData } from "api";
import SimpleSpinner from "../SimpleSpinner/SimpleSpinner";

const CustomErrorToast = ({ text1, text2, text3 }) => (
  <div>
    {text1}
    {text2 && (
      <>
        <br />
        <br />
        {text2}
      </>
    )}
    {text3 && (
      <>
        <br />
        <br />
        {text3}
      </>
    )}
  </div>
);

// const SubWindow = (props) => {
//   const { setIsRedeemClicked, cb, txStatus, toggleModal } = props;
//   const [secretCode, setSecretCode] = useState(null);

//   return (
//     <div style={{ width: "100%" }}>
//       {txStatus.status === "completed" ? (
//         <>
//           <p
//             style={{
//               textAlign: "center",
//               fontSize: 20,
//               fontWeight: "500",
//               color: txStatus.success ? "#24e00c" : "#e63d5b",
//               textShadow: "1px 1px 2px black",
//             }}
//           >
//             {txStatus.success ? (
//               <>
//                 {"The transactions were confirmed!"}
//                 <br />
//                 {/* 254084 */}
//                 {`Here is your code: `}
//                 <br />
//                 <span style={{ color: "#E955E2" }}>{secretCode}</span>
//                 <br />

//                 <div
//                   style={{
//                     backgroundColor: "red",
//                     borderRadius: 15,
//                     padding: 12,
//                     marginTop: 8,
//                   }}
//                 >
//                   <span
//                     style={{
//                       color: "#fff",
//                       fontSize: 24,
//                       textDecoration: "underline",
//                     }}
//                   >
//                     {"Your must store this code somewhere secure!"}
//                   </span>
//                   <br />
//                   <br />

//                   <span
//                     style={{
//                       color: "#fff",
//                       fontSize: 24,
//                       textDecoration: "underline",
//                     }}
//                   >
//                     {"It can not be recovered!"}
//                   </span>
//                 </div>
//                 <br />
//               </>
//             ) : (
//               "The transactions were rejected 😓"
//             )}
//           </p>
//           <p style={{ marginBottom: 36 }}>
//             By pressing the "OK button again, you will reinitialze the process.
//           </p>
//         </>
//       ) : (
//         <p>
//           You will have to confirm 2 transactions using your crypto wallet.
//           <br />
//           Each Transaction can take up to 45 seconds to get confirmed.
//           <br />
//           <br />
//           &nbsp;&nbsp;&nbsp;&nbsp;
//           <span
//             style={{
//               fontSize: 18,
//               textShadow: "1px 1px 2px black",
//               color: txStatus.isTx1_Done ? "#0ce016" : "",
//               textDecoration: txStatus.isTx1_Done ? "line-through" : "",
//             }}
//           >
//             1. To allow the MGS Token transfer
//           </span>
//           <br />
//           &nbsp;&nbsp;&nbsp;&nbsp;
//           <span
//             style={{
//               fontSize: 18,
//               textShadow: "1px 1px 2px black",
//               color: txStatus.isTx1_Done ? "#E8670D" : "",
//             }}
//           >
//             2. To obtain the Reward
//           </span>
//         </p>
//       )}

//       {txStatus.status !== "waiting confirmation" && (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-evenly",
//             gap: "64px",
//             marginTop: "24px",
//           }}
//         >
//           <Button
//             color="primary"
//             onClick={async () => {
//               console.log('The "OK" Btn was clicked!');
//               const code = await cb();
//               console.log("********************************************");
//               console.log("(SubWindow): The Secret Code: ", code);
//               console.log("********************************************");

//               setSecretCode(code);
//             }}
//             disabled={txStatus === "waiting confirmation"}
//           >
//             OK
//           </Button>
//           <Button
//             color="secondary"
//             onClick={() => {
//               setIsRedeemClicked(false);
//               toggleModal();
//             }}
//           >
//             No
//           </Button>
//         </div>
//       )}

//       {txStatus.status === "waiting confirmation" && (
//         <div style={{ marginTop: 32 }}>
//           <h4>Check your Crypto Wallet for incoming Transactions...</h4>
//           <ThreeCircles
//             height="100"
//             width="100"
//             color="#4fa94d"
//             wrapperStyle={{}}
//             wrapperClass=""
//             visible={true}
//             ariaLabel="three-circles-rotating"
//             outerCircleColor="yellow"
//             innerCircleColor="orange"
//             middleCircleColor="red"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

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
    // userData,
  } = props;
  // console.log("FROM MODAL: ", isOpen);

  //   const [modal, setModal] = useState(isOpen);
  const [isRedeemClicked, setIsRedeemClicked] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const [resourceAmountFocus, setResourceAmountFocus] = React.useState(false);
  const [resourceAmountField, setResourceAmountField] = React.useState({
    type: "ResourceAmountField",
    value: "",
  });

  const [resourceType, setResourceType] = React.useState(null);
  const [MGSCost, setMGSCost] = React.useState(null);

  // Hooks
  const { hasMetamask, wallet } = useMetaMask();
  const { setUserData, userData, usingLocalWallet } = useGlobalContext();
  const { initializeLWContract, isLoadingLWContract } = useContractLocalWallet(
    mgsContractDetails.address,
    mgsContractDetails.abi
  );
  const { initializeMetamaskContract, isLoadingMetamaskContract } =
    useContractMetamask(mgsContractDetails.address, mgsContractDetails.abi);

  const { showToast } = useToastMsg();
  const modalRef = useRef(null);

  const calcMGSCost = (amount, type) => {
    let result = 0;
    switch (type) {
      case "concrete":
        result = amount * (0.1 / 1000);
        return parseFloat(result);
      case "metals":
        result = amount * (0.15 / 1000);
        return parseFloat(result);
      case "crystals":
        result = amount * (0.2 / 1000);
        return parseFloat(result);
      case "diesel":
        result = amount * (0.1 / 1000);
        return parseFloat(result);
      default:
        return 0;
    }
  };

  useEffect(() => {
    console.log("The Resource Type: ", resourceType);
    setMGSCost(calcMGSCost(resourceAmountField.value, resourceType));
  }, [resourceType]);

  // Define a function to handle when the "Redeem" button is clicked
  const handleRedeemClick = async () => {
    const isUserLoggedIn = userData.isLoggedIn;
    if (!isUserLoggedIn) {
      toast.error(
        <CustomErrorToast text1={`You must be logged in to proceed`} />,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      console.log("RedeemModal: ⛔ You must be logged in to proceed");
      return;
    }

    if (userData.mgsTokens < MGSCost) {
      toast.error(
        <CustomErrorToast text1={`You do not possess enough MGS Tokens`} />,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      console.log("RedeemModal: ⛔ You do not possess enough MGS Tokens");
      return;
    }

    if (resourceAmountField.value < 1000) {
      toast.error(
        <CustomErrorToast text1={`The minimum amount of resources is 1000`} />,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }

    if (usingLocalWallet) {
      setIsTransactionLoading(true);
      try {
        // 0. Create the Contract Instance
        const contract = await initializeLWContract();

        // 1. Perform the blockchain transaction: UserWallet -> Contract
        const operationWeiCost = ethers.utils.parseUnits(
          String(MGSCost),
          "ether"
        );
        console.log("The Contract Instance: ", contract);
        const transferTx = await contract.transfer(
          mgsContractDetails.address,
          operationWeiCost
        );
        await transferTx.wait();

        // 3. Update the Resources in the Database
        console.log("The UserData: ", userData);
        const newResourceAmount =
          userData.player[resourceType] + resourceAmountField.value;
        await updatePlayerData(userData.player.id, {
          [resourceType]: newResourceAmount,
        });

        // 4. Update the Client's Resource Amount
        setUserData((prev) => ({
          ...prev,
          mgsTokens: parseFloat(prev.mgsTokens - MGSCost).toPrecision(4),
          player: { ...prev.player, [resourceType]: newResourceAmount },
        }));

        setIsTransactionLoading(false);
        showToast("Success", "The Transaction was successful", "success");
      } catch (error) {
        console.log("⛔ RedeemModal (LW): MGS to Resources Error: ", error);
        showToast("Redeem Error (LW)", "Something went wrong", "error");
        setIsTransactionLoading(false);
      }
    } else {
      setIsTransactionLoading(true);
      try {
        // 0. Create the Contract Instance
        const contract = await initializeMetamaskContract();
        console.log("The Contract Instance: ", contract);

        // 1. Perform the blockchain transaction: UserWallet -> Contract
        const operationWeiCost = ethers.utils.parseUnits(
          String(MGSCost),
          "ether"
        );
        const transferTx = await contract.transfer(
          mgsContractDetails.address,
          operationWeiCost
        );
        await transferTx.wait();

        // 3. Update the Resources in the Database
        console.log("The UserData: ", userData);
        const newResourceAmount =
          userData.player[resourceType] + resourceAmountField.value;
        await updatePlayerData(userData.player.id, {
          [resourceType]: newResourceAmount,
        });

        // 4. Update the Client's Resource Amount
        setUserData((prev) => ({
          ...prev,
          mgsTokens: parseFloat(prev.mgsTokens - MGSCost).toPrecision(4),
          player: { ...prev.player, [resourceType]: newResourceAmount },
        }));
        setIsTransactionLoading(false);
        showToast("Success", "The Transaction was successful", "success");
      } catch (error) {
        console.log("⛔ RedeemModal (MM): MGS to Resources Error: ", error);
        showToast("Redeem Error (MM)", "Something went wrong", "error");
        setIsTransactionLoading(false);
      }
    }
  };

  const toggle = () => setModal(!isOpen);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={className}
        backdropClassName="backdrop"
        backdrop="static"
        onClosed={async () => {
          // resetRedeem();
          // setIsRedeemClicked(false);
          // TODO: Update User Balance
          const walletAddress = usingLocalWallet
            ? userData.localWallet.account
            : userData.metamaskWallet.accounts[0];
          const { success, balance } = await getMGSBalance(walletAddress);
          if (success) {
            setUserData((prev) => ({
              ...prev,
              mgsTokens: balance,
            }));
          }
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
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                <a href={gmapsLink} target="_blank" rel="noreferrer">
                  <b>{shopName}</b>
                </a>
              </h5>
            </div>
          </div> */}

          {isDescriptionVisible && (
            <p style={{ wordWrap: "break-word" }}>{description}</p>
          )}

          <div>
            <h5>Instructions:</h5>
            <ol>
              <li>Select a Resource</li>
              <li>Enter the desired amount (min: 1000)</li>
              <li>Press the "Redeem" button</li>
            </ol>
            <div className="mgs-to-resources-grid">
              {/* <div className="mgs-to-resources-grid-item-1">#1</div> */}
              <ResourceButton
                type="concrete"
                isSelected={resourceType === "concrete"}
                onClick={() => setResourceType("concrete")}
              />
              <ResourceButton
                type="metals"
                isSelected={resourceType === "metals"}
                onClick={() => setResourceType("metals")}
              />
              <ResourceButton
                type="crystals"
                isSelected={resourceType === "crystals"}
                onClick={() => setResourceType("crystals")}
              />
              <ResourceButton
                type="diesel"
                isSelected={resourceType === "diesel"}
                onClick={() => setResourceType("diesel")}
              />
            </div>
            <div
              style={{
                marginTop: 16,
                color: "whitesmoke",
              }}
            >
              {/* DESIRED RESOURCE AMOUNT */}
              <InputGroup
                style={{
                  backgroundColor: "lightblue",
                  borderRadius: 10,
                }}
                className={classNames({
                  "input-group-focus": resourceAmountFocus,
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText style={{ fontSize: "11px", color: "black" }}>
                    {/* <i
                      className="tim-icons icon-single-02"
                      style={{ color: "black" }}
                    /> */}
                    {"Amount | "}&nbsp;&nbsp;
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder={
                    resourceType === null
                      ? "Select a Resource First"
                      : "Enter the desired amount..."
                  }
                  type="text"
                  name="name"
                  value={resourceAmountField.value}
                  disabled={resourceType === null}
                  onChange={(e) => {
                    console.log("The value: ", e.target.value);
                    const value = Number(e.target.value);
                    console.log("The type: ", typeof value);
                    if (typeof value !== "number" || isNaN(value)) return;
                    setMGSCost(calcMGSCost(value, resourceType));
                    setResourceAmountField((prev) => {
                      return { ...prev, value: value };
                    });
                  }}
                  onFocus={(e) => setResourceAmountFocus(true)}
                  onBlur={(e) => setResourceAmountFocus(false)}
                  style={{
                    color: "black",
                    fontSize: "16px",
                    backgroundColor: "lightblue",
                  }}
                />
              </InputGroup>

              {/* MGS COST AMOUNT */}
              <InputGroup
                style={{
                  backgroundColor: "lightblue",
                  borderRadius: 10,
                  // border: "1px solid black",
                }}
                className={classNames({
                  "input-group-focus": false,
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText style={{ fontSize: "11px", color: "black" }}>
                    {"MGS Cost |"}
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Is calculated here..."
                  type="text"
                  name="name"
                  value={MGSCost}
                  readOnly
                  onFocus={(e) => true}
                  onBlur={(e) => false}
                  style={{
                    color: "black",
                    fontSize: "16px",
                    backgroundColor: "lightblue",
                  }}
                />
              </InputGroup>
            </div>
          </div>
        </ModalBody>
        <ModalFooter style={{ border: "none", paddingTop: 0 }}>
          <Button
            color="warning"
            style={{ fontSize: "16px" }}
            onClick={handleRedeemClick}
            disabled={isTransactionLoading}
          >
            {isTransactionLoading ? <SimpleSpinner /> : "Redeem"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RedeemModal;
