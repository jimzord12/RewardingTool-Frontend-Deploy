import axios, { axiosOracle } from "./config.js";

export async function handleAccountCreation(data) {
  console.log("handleAccountCreation: ", data);
  // try {
  const response = await axios.post("/register", data);
  return response.data;
  // } catch (error) {
  //   console.log("💎 API: Error: ", error);
  //   throw new Error("💎 Server Error: " + error.message);
  // }
}

export async function userAuth(data) {
  console.log(data);
  try {
    const response = await axios.post("/auth", data);
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("💎 API: Error: ", error);
    throw error;
  }
}

// export async function getNonce() {
//   try {
//     const response = await axiosOracle.get("/big-random-number");
//     const nonce = response.data.randomBigNumber;
//     return nonce;
//   } catch (error) {
//     console.error("⛔ (Express Oracle)Failed to fetch nonce:", error);
//     return null;
//   }
// }
