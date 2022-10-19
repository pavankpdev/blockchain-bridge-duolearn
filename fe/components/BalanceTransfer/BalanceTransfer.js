import styles from "./BalanceTransfer.module.css";
function BalanceTransfer(props) {
  return (
    <div className={styles.balanceTransferContainer}>
      <div className={styles.balanceTransfer}>
        <p className={styles.p}>$DUO Balance</p>
        <p>{props.balance}</p>
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
