import { createPlayer, gaslessNewPlayer, updatePlayerData } from "api/index.js";
import { initNewPlayer } from "../forGame/initNewPlayer.js";
import { waitForTx } from "utils/waitForTx.js";

export const handlePlayerCreate = async (
  username,
  address,
  ethBlanace,
  setSuccessMessage,
  setHasErrors,
  setIsLoading,
  provider
) => {
  try {
    const { success, userId } = await createPlayer(username, address);
    // Initialze the Player in DB
    const startingStats = initNewPlayer(userId);
    const wasPlayerInitSuccess = await updatePlayerData(userId, startingStats);

    if (!wasPlayerInitSuccess) {
      console.error("⛔ Custom: HandlePlayerCreate, Player Init Failed");
      setHasErrors([
        {
          name: "Player Creation Failed",
          message: "An Error Occured. Please try again later.",
        },
      ]);
      return false;
    }

    if (success) {
      setSuccessMessage("Account created successfully!");
      setHasErrors([]);
      if (Number(ethBlanace) < 0.2) {
        console.log("🐱‍🏍 Starting the Gasless Mechanism...");
        const { message, tx } = await gaslessNewPlayer(address);
        if (message === "User sufficient ETH balance") {
          setIsLoading({
            playerCreation: false,
            sentEth: false,
          });
        } else {
          setIsLoading({
            playerCreation: false,
            sentEth: true,
          });
          console.log("🐱‍🏍 Starting Waiting for Transaction...");
          await waitForTx(provider, tx);
        }
      }
      return true;
    }
  } catch (error) {
    console.error("Response Error from Server: ", error);
    setHasErrors([
      {
        name: "Server Error",
        message: error.response.data.message,
      },
    ]);

    if (error?.response?.data?.errno === 1062) {
      console.error("DUPLICATES!!");
      setHasErrors([
        {
          name: "Duplicate",
          message: "Username or Wallet already exists",
        },
      ]);
    } else if (error?.response?.status === 400) {
      setHasErrors([
        {
          name: "Invalid Input",
          message: "Missing Username or Wallet",
        },
      ]);
    } else if (error?.response?.status === 401) {
      setHasErrors([
        {
          name: "Unauthorized",
          message: "Please create an account first.",
        },
      ]);
    } else {
      setHasErrors([
        {
          name: "Login Failed",
          message: error.response.data.message,
        },
      ]);
    }
    return false;
  }
};
