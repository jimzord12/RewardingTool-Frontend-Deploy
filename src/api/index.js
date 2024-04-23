// Gasless
import { gaslessNewPlayer } from "./gasless/gaslessNewPlayer";
import { gaslessOldPlayer } from "./gasless/gaslessOldPlayer";

// Web3 Login (Wallet Ownership Validation)
import { getRandomNum } from "./web3Login/getRandomNum";
import { validateSignedMsg } from "./web3Login/validateSignedMsg";

// Regarding Player
import getPlayerByWallet from "./player/_getPlayerByWallet";
// import loginWithWallet from "./player/_loginWithWallet";
import { createPlayer } from "./player/_createPlayer";
import { updatePlayerData } from "./player/_updatePlayerData";

// Regarding Cards
import { getAllCards } from "./cards/_getAllCards";
import { getCardById } from "./cards/_getCardById";
import { updateCardData } from "./cards/_updateCardData";
// import { deleteCard } from "./cards/_deleteCard";

// Smart Contract Functions
import { getMGSBalance } from "./smartContractFns/_getMGSBalance";

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
