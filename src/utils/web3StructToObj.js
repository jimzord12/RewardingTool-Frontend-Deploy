// import { ethers } from "ethers";
export function web3StructToObj(struct) {
  // spread struct into a new object
  const plainObject = { ...struct };

  // convert each BigInt property to a string
  for (const key in plainObject) {
    if (typeof plainObject[key] === "bigint") {
      plainObject[key] = plainObject[key].toString();
    }
  }

  return plainObject;
}
