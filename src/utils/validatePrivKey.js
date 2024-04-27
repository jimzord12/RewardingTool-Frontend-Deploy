import { ethers } from "ethers";

/**
 * Validates an Ethereum private key.
 * @param {string} privateKey The private key in hexadecimal format.
 * @returns {boolean} True if the private key is valid, otherwise false.
 */
export function isValidEthereumPrivateKey(privateKey) {
  try {
    // Check if the privateKey is a valid string
    if (typeof privateKey !== "string") {
      console.error("Invalid input: privateKey must be a string.");
      return false;
    }

    // Ensure the private key is strictly 64 characters long and only contains hex digits
    if (!/^[0-9a-fA-F]{64}$/.test(privateKey)) {
      console.error("Invalid private key: Must be 64 hex characters.");
      return false;
    }

    // Use ethers to create a Wallet, which will throw an error if the private key is invalid
    new ethers.Wallet(privateKey);

    // If no error is thrown, the private key is valid
    return true;
  } catch (error) {
    console.error("Invalid private key:", error.message);
    return false;
  }
}
