import axios from "../../apiConfig";

const PUT_PLAYER_STATS_URL = "players";

export const updatePlayerData = async (playerId, playerData) => {
  console.log("🚀 PUT - (Updating Player Stats), Sending Request...");

  const response = await axios.put(
    `${PUT_PLAYER_STATS_URL}/${playerId}`,
    playerData
  );

  console.log(
    "🚀 PUT ✅ - (Updated Player Stats): ",
    response.data.affectedRows === 1 ? true : false
  );

  return response.data.affectedRows === 1 ? true : false;
};
