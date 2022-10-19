
import {useState} from "react";
import Header from "../components/Header/Header";
import SwitchChain from "../components/SwitchChain/SwitchChain";
import BalanceTransfer from "../components/BalanceTransfer/BalanceTransfer";

export default function Home() {
  const [balance, setBalance] = useState(100);
  const [transferAmount, setTransferAmount] = useState(100);
  const [from, setFrom] = useState("BSC");
  const [to, setTo] = useState("PoL");

  const toggleChain = () => {
    setFrom(to);
    setTo(from);
  };

  return (
      <div className="App">
        <Header name="Duo Bridge" />
        <SwitchChain from={from} to={to} toggle={toggleChain} />
        <BalanceTransfer
            transferValue={transferAmount}
            onTransferAmountChange={setTransferAmount}
            onClick={() => {
              console.log({
                from,
                to,
                transferAmount,
                balance,
              });
            }}
            balance={balance}
        />
      </div>
  )
}
