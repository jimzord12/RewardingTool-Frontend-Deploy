export const waitForTx = async (ethersProvider, tx) => {
  console.log("⚡ 1. Received Tx: ", tx);
  console.log("⚡ 2. Provider Tx: ", ethersProvider);
  const receipt = await ethersProvider.waitForTransaction(tx.hash);
  // You can also check the receipt status if needed:
  console.log("⚡ 3. Receipt: ", receipt);
  if (receipt?.status === 1) {
    return true;
  } else {
    throw new Error("Transaction failed");
  }
};
