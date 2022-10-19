import { useCallback, useState } from "react";

const useWallet = () => {
  const [account, setAccount] = useState("");

  const connectWallet = useCallback(async () => {
    if (typeof window?.ethereum !== "undefined") {
      const accounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      return true;
    }

    return false;
  }, []);

  return { account, connectWallet };
};

export default useWallet;
