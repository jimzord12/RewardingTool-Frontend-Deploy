const { updatePlayerData } = require("api");
const { mgsContractDetails } = require("constants/mgsContractDetails");
const { ethers } = require("ethers");
const { toast } = require("react-toastify");

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

const MGSToResourceHandler = async ({
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
}) => {
  if (
    MGSCost === null ||
    resourceAmountField === null ||
    resourceType === null
  ) {
    showToast("Error", "Missing Parameters", "error");
  }

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
    console.log("MGSToResourcesModal: ⛔ You must be logged in to proceed");
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
    console.log("MGSToResourcesModal: ⛔ You do not possess enough MGS Tokens");
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
      console.log(
        "⛔ MGSToResourcesModal (LW): MGS to Resources Error: ",
        error
      );
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
      console.log(
        "⛔ MGSToResourcesModal (MM): MGS to Resources Error: ",
        error
      );
      showToast("Redeem Error (MM)", "Something went wrong", "error");
      setIsTransactionLoading(false);
    }
  }
};

export default MGSToResourceHandler;
