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

const setupAdminSigner = () => {
  const provider = setupProvider();
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY,
    provider
  );
  return signer;
};

export const getContractInstance = (name) => {
  const signer = setupSigner();
  const contract = contracts.find((c) => c.name === name);
  return new ethers.Contract(contract.address, contract.abi, signer);
};

export const getAdminContractInstance = (name) => {
  const signer = setupAdminSigner();
  const contract = contracts.find((c) => c.name === name);
  return new ethers.Contract(contract.address, contract.abi, signer);
};
