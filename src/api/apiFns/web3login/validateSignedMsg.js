import axios from "../../apiConfig";

const SIGN_MESSAGE = "authNoPwd/web3Auth";

export const validateSignedMsg = async (
  message,
  walletAddress,
  signedMessage
) => {
  const response = await axios.post(SIGN_MESSAGE, {
    message,
    userAddress: walletAddress,
    signedMessage,
  });

  return { verified: response.data.verified };
};
