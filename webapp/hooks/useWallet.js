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

  const addNewChain = async (to) => {
    if (typeof window?.ethereum !== "undefined") {
      const chainParams = {
        PoL: {
          chainId: "0x13881",
          chainName: "Mumbai",
          rpcUrls: [
            "https://rpc-mumbai.maticvigil.com/v1/f79235594e1c3bda499c75b6f0338cc703995047",
          ],
        },
        BSC: {
          chainId: "0x61",
          chainName: "BSC testnet",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        },
      };

      await window?.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [chainParams[to]],
      });
    }
  };

  const switchNetwork = useCallback(async (to) => {
    if (typeof window?.ethereum !== "undefined") {
      const chainIds = {
        PoL: "0x13881",
        BSC: "0x61",
      };

      try {
        await window?.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIds[to] }],
        });
      } catch (error) {
        if (error.code === 4902) {
          await addNewChain(to);
        }
      }
    }
  }, []);

  return { account, connectWallet, switchNetwork };
};

export default useWallet;
