import BSCLock from "../abi/BSCLock.json";
import BSCToken from "../abi/BSCToken.json";
import PolyDeposit from "../abi/PolyDeposit.json";
import PolyToken from "../abi/PolyToken.json";

export const contractAddresses = {
  BSCLock: BSCLock.address,
  BSCToken: BSCToken.address,
  PolyDeposit: PolyDeposit.address,
  PolyToken: PolyToken.address,
};

export const contracts = [
  {
    name: "BSCLock",
    address: contractAddresses.BSCLock,
    abi: BSCLock.abi,
  },
  {
    name: "BSCToken",
    address: contractAddresses.BSCToken,
    abi: BSCToken.abi,
  },

  {
    name: "PolyDeposit",
    address: contractAddresses.PolyDeposit,
    abi: PolyDeposit.abi,
  },

  {
    name: "PolyToken",
    address: contractAddresses.PolyToken,
    abi: PolyToken.abi,
  },
];
