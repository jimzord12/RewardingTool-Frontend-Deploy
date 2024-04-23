import axios from "../../apiConfig";

const GIVE_ETH_NEW_PLAYER = "gasless/register";

export const gaslessNewPlayer = async (walletAddress) => {
  const gaslessResponse = await axios.post(
    GIVE_ETH_NEW_PLAYER,
    JSON.stringify({ address: walletAddress }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return { message: gaslessResponse.data.message, tx: gaslessResponse.data.tx };
};
