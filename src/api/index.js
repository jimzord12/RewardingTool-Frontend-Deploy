// Gasless
import { gaslessNewPlayer } from "./apiFns/gasless/gaslessNewPlayer";
import { gaslessOldPlayer } from "./apiFns/gasless/gaslessOldPlayer";

// Web3 Login (Wallet Ownership Validation)
import { getRandomNum } from "./apiFns/web3login/getRandomNum";
import { validateSignedMsg } from "./apiFns/web3login/validateSignedMsg";

// Regarding Player
import getPlayerByWallet from "./apiFns/player/_getPlayerByWallet";
// import loginWithWallet from "./player/_loginWithWallet";
import { createPlayer } from "./apiFns/player/_createPlayer";
import { updatePlayerData } from "./apiFns/player/_updatePlayerData";

// Regarding Cards
import { getAllCards } from "./apiFns/cards/_getAllCards";
import { getCardById } from "./apiFns/cards/_getCardById";
import { updateCardData } from "./apiFns/cards/_updateCardData";
// import { deleteCard } from "./apiFns/cards/_deleteCard";

// Smart Contract Functions
import { getMGSBalance } from "./apiFns/smartContractFns/_getMGSBalance";

export {
  getPlayerByWallet,
  // loginWithWallet,
  gaslessNewPlayer,
  gaslessOldPlayer,
  getRandomNum,
  validateSignedMsg,
  createPlayer,
  updatePlayerData,
  getAllCards,
  getCardById,
  updateCardData,
  getMGSBalance,
};
