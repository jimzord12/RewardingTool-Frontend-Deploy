import classNames from "classnames";
import ResourceButton from "components/custom/ResourceButton/ResourceButton";
import React, { useEffect } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ModalFooter,
} from "reactstrap";
import MGSToResourceHandler from "../FeaturesClickHandlers/MGSToResourceHandler";
import { useGlobalContext } from "contexts/GlobalContextProvider";
import useContractLocalWallet from "hooks/useContractLocalWallet";
import { mgsContractDetails } from "constants/mgsContractDetails";
import useContractMetamask from "hooks/useContractMetamask";
import SimpleSpinner from "components/custom/SimpleSpinner/SimpleSpinner";
import useToastMsg from "hooks/useToastMsg";

const MGSToResources = () => {
  const [resourceAmountField, setResourceAmountField] = React.useState({
    value: "",
  });
  const [resourceAmountFocus, setResourceAmountFocus] = React.useState(false);

  const [resourceType, setResourceType] = React.useState(null);
  const [MGSCost, setMGSCost] = React.useState(0);

  const [isTransactionLoading, setIsTransactionLoading] = React.useState(false);

  const { setUserData, userData, usingLocalWallet } = useGlobalContext();
  const { initializeLWContract, isLoadingLWContract } = useContractLocalWallet(
    mgsContractDetails.address,
    mgsContractDetails.abi
  );
  const { initializeMetamaskContract, isLoadingMetamaskContract } =
    useContractMetamask(mgsContractDetails.address, mgsContractDetails.abi);

  const { showToast } = useToastMsg();

  useEffect(() => {
    console.log("The Resource Type: ", resourceType);
    setMGSCost(calcMGSCost(resourceAmountField.value, resourceType));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceType]);

  return (
    <div>
      <div className="mgs-to-resources-grid">
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

      <ModalFooter style={{ border: "none", paddingTop: 16, paddingBottom: 0 }}>
        <Button
          color="warning"
          style={{ fontSize: "16px" }}
          onClick={async () =>
            await MGSToResourceHandler({
              userData,
              MGSCost,
              resourceAmountField,
              usingLocalWallet,
              setIsTransactionLoading,
              initializeLWContract,
              initializeMetamaskContract,
              resourceType,
              setUserData,
              showToast,
            })
          }
          disabled={isTransactionLoading}
        >
          {isTransactionLoading ? <SimpleSpinner /> : "Redeem"}
        </Button>
      </ModalFooter>
    </div>
  );
};

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

export default MGSToResources;
