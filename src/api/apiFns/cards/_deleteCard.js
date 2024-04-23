import axios from "../../apiConfig";

const DLETE_CARD_ENDPOINT = "cards";

export const deleteCard = async (cardId) => {
  console.log("🚀 PUT - (Updating Cards Stats), Sending Request...");

  const response = await axios.delete(`${DLETE_CARD_ENDPOINT}/${cardId}`);

  console.log("🚀 DELETE ✅ - (Deleting Card): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
