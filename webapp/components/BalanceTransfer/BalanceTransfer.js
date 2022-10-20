import { useState, useEffect, useCallback } from "react";
import styles from "./BalanceTransfer.module.css";

import useWallet from "../../hooks/useWallet";
import { getContractInstance } from "../../utils/ethers";
import { BigNumber, ethers } from "ethers";

function BalanceTransfer(props) {
  const [balance, setBalance] = useState(0);
  const { account, connectWallet } = useWallet();

  const getBalance = useCallback(async () => {
    try {
      await connectWallet();
      if (!account) return;
      const BSCToken = getContractInstance("BSCToken");
      console.log(BSCToken);
      const balance = await BSCToken.balanceOf(`${account}`);
      const balanceInWei = BigNumber.from(balance).toString();
      setBalance(ethers.utils.formatEther(balanceInWei));
    } catch (err) {
      console.log(err);
    }
  }, [account]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <div className={styles.balanceTransferContainer}>
      <div className={styles.balanceTransfer}>
        <p className={styles.p}>{balance} $DUO Balance</p>
        <input
          type={"number"}
          value={props.transferAmount}
          onChange={(e) => props.onTransferAmountChange(e.target.value)}
          placeholder="Amount to Transfer"
          className={styles.transferInput}
        />
        <div
          className={styles.tranferBtnContainer}
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <button onClick={props.onClick} className={styles.transferBtn}>
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default BalanceTransfer;
