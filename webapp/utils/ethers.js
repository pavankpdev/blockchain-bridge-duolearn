import { ethers } from "ethers";
import { contracts } from "../configs/contracts";

const setupProvider = () => {
  if (typeof window?.ethereum !== "undefined") {
    return new ethers.providers.Web3Provider(window?.ethereum);
  }
};

const setupSigner = () => {
  const provider = setupProvider();
  return provider.getSigner();
};

export const getContractInstance = (name) => {
  const signer = setupSigner();
  const contract = contracts.find((c) => c.name === name);
  return new ethers.Contract(contract.address, contract.abi, signer);
};
