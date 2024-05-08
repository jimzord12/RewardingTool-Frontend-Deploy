import { getPlayerByWallet } from "api";
import { updateCardData } from "api";
import { mgsContractDetails } from "constants/mgsContractDetails";
import { ethers } from "ethers";
import { toast } from "react-toastify";

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

const RarityUpgradeHandler = async ({
  userData,
  MGSCost,
  selectedCard,
  desiredRarity,
  usingLocalWallet,
  setIsTransactionLoading,
  initializeLWContract,
  initializeMetamaskContract,
  setUserData,
  showToast,
}) => {
  if (MGSCost === null) {
    showToast("Error", "Missing Parameters", "error");
    return null;
  }

  if (selectedCard === null) {
    showToast("Error", "You have to select a Card", "error");
    return null;
  }

  if (desiredRarity === null) {
    showToast("Error", "You have to select the Rarity to Upgrade to", "error");
    return null;
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
    console.log("RarityUpgradeHandler: ⛔ You must be logged in to proceed");
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
    console.log(
      "RarityUpgradeHandler: ⛔ You do not possess enough MGS Tokens"
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

      console.log("The UserData: ", userData);
      const newCardData = {
        id: selectedCard.id,
        rarity: desiredRarity,
      };

      // 3. Update the Card's Rarity in the Database
      const wasSuccess = await updateCardData(newCardData);
      if (!wasSuccess) {
        showToast("Error", "Failed to update the Card's Rarity in DB", "error");
        setIsTransactionLoading(false);
        return;
      }

      // 4. Grab the Fresh Player's Cards
      const playerData = await getPlayerByWallet(userData.localWallet.account);

      // 5. Update the Client's Resource Amount
      setUserData((prev) => ({
        ...prev,
        mgsTokens: parseFloat(prev.mgsTokens - MGSCost).toPrecision(4),
        cards: playerData.cards,
      }));

      setIsTransactionLoading(false);
      showToast("Success", "The Transaction was successful", "success");
    } catch (error) {
      console.log(
        "⛔ RarityUpgradeHandler (LW): MGS to Resources Error: ",
        error
      );
      showToast("Redeem Error (LW)", "Something went wrong", "error");
      setIsTransactionLoading(false);
    }
  } else {
    // --- METAMSASK WALLET ---
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

      console.log("The UserData: ", userData);
      const newCardData = {
        id: selectedCard.id,
        rarity: desiredRarity,
      };

      // 3. Update the Card's Rarity in the Database
      const wasSuccess = await updateCardData(newCardData);
      if (!wasSuccess) {
        showToast("Error", "Failed to update the Card's Rarity in DB", "error");
        setIsTransactionLoading(false);
        return;
      }

      // 4. Grab the Fresh Player's Cards
      const playerData = await getPlayerByWallet(
        userData.metamaskWallet.accounts[0]
      );

      // 5. Update the Client's Resource Amount
      setUserData((prev) => ({
        ...prev,
        mgsTokens: parseFloat(prev.mgsTokens - MGSCost).toPrecision(4),
        cards: playerData.cards,
      }));

      setIsTransactionLoading(false);
      showToast("Success", "The Transaction was successful", "success");
    } catch (error) {
      console.log(
        "⛔ RarityUpgradeHandler (MM): MGS to Resources Error: ",
        error
      );
      showToast("Redeem Error (MM)", "Something went wrong", "error");
      setIsTransactionLoading(false);
    }
  }
};

export default RarityUpgradeHandler;
