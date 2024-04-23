// ✨ Frontend Game - Version
import axios from "axios";

const isProduction = import.meta.env.VITE_IS_PRODUCTION == "yes";
const isWSLocal = !isProduction && import.meta.env.VITE_IS_LOCAL_WS == "yes";

console.log("🧪 - Api Config: isProduction: ", isProduction);
console.log("🧪 - Api Config: isWSLocal: ", isWSLocal);
// const isWSLocal = false;

// const PORT = 3333; // Local port
console.log(
  `💎🎉😓 You are in [${isWSLocal ? "DEV MODE" : "PRODUCTION MODE"}] 💎🎉😓`
);
// const PORT = 29352;
const HOST = isWSLocal
  ? "http://localhost:3333/"
  : //  : 'https://genera-game-backend-v2.herokuapp.com/';
    "https://genera-game-express-server.onrender.com/";

export const axiosPublic = axios.create({
  baseURL: HOST,
  // baseURL: `http://localhost:${PORT}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axios.create({
  baseURL: HOST,
  // baseURL: `http://localhost:${PORT}`,
  headers: { "Content-Type": "application/json", Authorization: "" },
  withCredentials: true,
});
