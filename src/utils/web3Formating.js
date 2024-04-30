export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr) => {
  return `${addr.substring(0, 8)}...`;
};

export const remove_Ox = (addr) => {
  if (addr.substring(0, 2) !== "0x") {
    return addr;
  }
  return addr.substring(2);
};
