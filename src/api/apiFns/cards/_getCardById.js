import axios from "../../apiConfig";

const GET_SPECIFIC_CARD_URL = "cards";

export const getCardById = async (cardId) => {
  console.log(`🚀 GET - (Specific Card) [${cardId}], Sending Request...`);

  const response = await axios.get(`${GET_SPECIFIC_CARD_URL}/${cardId}}`);

  console.log(`🚀 GET ✅ - (Specific Card) [${cardId}]: `, response.data);

  return response.data;
};
