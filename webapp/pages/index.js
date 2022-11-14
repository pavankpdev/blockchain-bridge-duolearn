import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SwitchChain from "../components/SwitchChain/SwitchChain";
import BalanceTransfer from "../components/BalanceTransfer/BalanceTransfer";
import useWallet from "../hooks/useWallet";
import { getAdminContractInstance, getContractInstance } from "../utils/ethers";
import { ethers } from "ethers";
import { signature } from "../utils/signature";
import { toast } from "react-toastify";

export default function Home() {
  const [balance, setBalance] = useState(100);
  const [transferAmount, setTransferAmount] = useState(0);
  const [from, setFrom] = useState("BSC");
  const [to, setTo] = useState("PoL");
  const [status, setStatus] = useState("TRANSFER");

  const { connectWallet, switchNetwork, account } = useWallet();

  const toggleChain = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    connectWallet().then(() => switchNetwork(from));
  }, [from]);

  const lockTokens = async () => {
    try {
      await connectWallet();

      // Contract instances
      const BSCToken = getContractInstance("BSCToken");
      const BSCLock = getContractInstance("BSCLock");

      // convert transfer amount to Wei
      const amount = ethers.utils.parseEther(transferAmount);

      // Lock tokens in BSC chain
      await switchNetwork("BSC");
      const approveCall = await BSCToken.approve(BSCLock.address, amount);
      await approveCall.wait();
      const lockTokensCall = await BSCLock.lockTokens(amount);
      await lockTokensCall.wait();

      setStatus("DEPOSIT");
    } catch (err) {
      console.log(err);
    }
  };

  const depositTokens = async () => {
    await connectWallet();

    // Deposit Tokens in Polygon chain

    await switchNetwork("PoL");

    // convert transfer amount to Wei
    const amount = ethers.utils.parseEther(transferAmount);
    const PolyToken = getAdminContractInstance("PolyToken");

    const depositCall = await PolyToken.deposit(
      account,
      ethers.utils.defaultAbiCoder.encode(["uint256"], [amount])
    );

    await depositCall.wait();
    setStatus("TRANSFER");
  };

  const burnTokens = async () => {
    await connectWallet();
    await switchNetwork("PoL");

    const PolyToken = getContractInstance("PolyToken");

    const amount = ethers.utils.parseEther(transferAmount);
    const burnCall = await PolyToken.burn(amount);
    return burnCall.wait();
  };

  const releaseToken = async (hash) => {
    await connectWallet();
    await switchNetwork("BSC");

    const BSCLock = getAdminContractInstance("BSCLock");
    const amount = ethers.utils.parseEther(transferAmount);

    const adminSignature = await signature(account, amount, hash);

    const releaseTokensCall = await BSCLock.releaseTokens(
      account,
      amount,
      hash,
      adminSignature
    );

    await releaseTokensCall.wait();
  };

  const FromBscToPoly = async () => {
    try {
      toast.loading("Transferring Assets", {
        toastId: "LOADING",
      });
      await lockTokens();
      await depositTokens();
      toast.dismiss("LOADING");
    } catch (err) {
      toast.dismiss("LOADING");
    }
  };

  const FromPolyToBSC = async () => {
    try {
      toast.loading("Transferring Assets", {
        toastId: "LOADING",
      });
      const burn = await burnTokens();
      await releaseToken(burn.transactionHash);
      toast.dismiss("LOADING");
    } catch (err) {
      toast.dismiss("LOADING");
    }
  };

  return (
    <div className="App">
      <Header name="Duo Bridge" />
      <SwitchChain from={from} to={to} toggle={toggleChain} />
      <BalanceTransfer
        transferValue={transferAmount}
        onTransferAmountChange={setTransferAmount}
        primaryChain={from}
        onClick={from === "BSC" ? FromBscToPoly : FromPolyToBSC}
        balance={balance}
        status={status}
      />
    </div>
  );
}
