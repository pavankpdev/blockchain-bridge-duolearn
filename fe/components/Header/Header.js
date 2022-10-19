import styles from "./Header.module.css";
import useWallet from "../../hooks/useWallet";

function Header(props) {
  const { account, connectWallet } = useWallet();
  return (
    <div className={styles.headerContainer}>
      <h1>{props.name}</h1>
      {account ? (
        <p>{account}</p>
      ) : (
        <button className={styles.connectBtn} onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default Header;
