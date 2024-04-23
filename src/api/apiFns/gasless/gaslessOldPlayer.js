import axios from "../../apiConfig";

const GIVE_ETH_OLD_PLAYER = "gasless/login";

export const gaslessOldPlayer = async (walletAddress) => {
  const gaslessResponse = await axios.post(
    GIVE_ETH_OLD_PLAYER,
    JSON.stringify({ address: walletAddress }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return { message: gaslessResponse.data.message, tx: gaslessResponse.data.tx };
};
