import axios from "../../apiConfig";

const CREATE_PL_URL = "register/player";

export const createPlayer = async (playerName, walletAddress) => {
  const response = await axios.post(
    CREATE_PL_URL,
    JSON.stringify({
      name: playerName,
      wallet: walletAddress,
    }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  const wasSuccessful = response.data.affectedRows === 1 ? true : false;

  return { userId: response.data.insertId, success: wasSuccessful };
};
