// ✨ Frontend Game - Version
import axios from "axios";

const PORT = 3500; // Local port
const PORT_2 = 3033; // Local port
// const PORT = 29352;
// const HOST = 'https://genera-game-backend-v2.herokuapp.com/';

export default axios.create({
  // baseURL: HOST,
  baseURL: `http://localhost:${PORT}`,
});

export const axiosPrivate = axios.create({
  // baseURL: HOST,
  baseURL: `http://localhost:${PORT}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosOracle = axios.create({
  // baseURL: HOST,
  baseURL: `http://localhost:${PORT_2}`,
  // headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
});
