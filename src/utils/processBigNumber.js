export function processBigNumber(bn) {
  console.log("1. (RAW) BigNumber: ", bn);
  const bnString = bn.toString();
  console.log("2. (toString) BigNumber: ", bnString);

  const bnStrReduced = bnString === "0" ? 0 : bnString.slice(0, -15);
  console.log("3. (Step #3) BigNumber: ", bnStrReduced);

  const bnFinal = bnStrReduced === 0 ? 0 : (parseInt(bnStrReduced) / 1000).toFixed(2);
  console.log("4. (Step #4) BigNumber: ", bnFinal);

  return bnFinal;
}
