import axiosPublic from "../../apiConfig";

const LOGIN_URL = "authNoPwd";

function isValidWalletAddress(address) {
  const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
  return addressRegex.test(address);
}

export const loginWithWallet = async (walletAddress) => {
  console.log("🚀 Trying to: [POST] -> (Login) with Wallet: ", walletAddress);

  if (
    walletAddress === null ||
    walletAddress === "" ||
    walletAddress === undefined
  ) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is null, empty, or undefined \n Origin: loginWithWallet() \n File: apiFns.ts"
    );
  }

  if (isValidWalletAddress(walletAddress) === false) {
    throw new Error(
      "⛔ - Customer Error: walletAddress is invalid \n Origin: loginWithWallet() \n File: apiFns.ts"
    );
  }

  const response = await axiosPublic.post(LOGIN_URL, {
    walletAddress: walletAddress,
  });

  console.log(
    "🚀+✅ Successfully Retrieved Data for User:",
    response.data.username
  );

  return response.data;
};

export default loginWithWallet;
