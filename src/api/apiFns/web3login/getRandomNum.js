import axios from "../../apiConfig";

const GET_RANDOM_NUM = "randomNum";

export const getRandomNum = async () => {
  const response = await axios.get(GET_RANDOM_NUM);

  return { nonce: response.data.randNum };
};
