import axios from "../../apiConfig";

const PUT_UPDATE_CARD_DATA_URL = "cards";

// interface ICardDataToUpdate {
//   id: number; // Card's ID
//   disabled?: boolean;
//   state?: number | boolean;
//   endDate?: number | string;
//   level?: number;
//   on_map_spot?: number | null;
// }
export const updateCardData = async (cardData) => {
  console.log("🚀 PUT - (Updating Cards Stats), Sending Request...");

  const response = await axios.put(
    `${PUT_UPDATE_CARD_DATA_URL}/${cardData.id}`,
    cardData
  );

  console.log("🚀 PUT ✅ - (Updating Cards Stats): ", response.data);

  return response.data.affectedRows === 1 ? true : false;
};
