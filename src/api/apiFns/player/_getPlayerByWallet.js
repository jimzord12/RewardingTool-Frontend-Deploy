import axiosPublic from "../../apiConfig";

function isValidWalletAddress(address) {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
}

// #1 - Gets the Player's Data
const getPlayerByWallet = async (walletAddress) => {
  console.log("🚀 Trying to: [GET] -> (Player) with Wallet: ", walletAddress);

  if (
    walletAddress === null ||
    walletAddress === "" ||
    walletAddress === undefined
  ) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is null, empty, or undefined \n Origin: getPlayer() \n File: apiFns.ts"
    );
  }

  // Using the Player Address to get the Player's Data

  if (isValidWalletAddress(walletAddress) === false) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is invalid \n Origin: getPlayer() \n File: apiFns.ts"
    );
  }
  const response = await axiosPublic.get(`/players/${walletAddress}`);
  console.log("🚀 [GET] ✅ -> (Player): ", response.data);

  return response.data;
};

export default getPlayerByWallet;
