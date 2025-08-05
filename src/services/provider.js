import { ethers } from 'ethers';

let provider;

export const getProvider = () => {
  if (provider) return provider;

  const { ethereum } = typeof window !== 'undefined' ? window : {};

  if (ethereum) {
    // the 'any' network allows the dapp to handle network changes on the fly
    provider = new ethers.providers.Web3Provider(ethereum, 'any');
  } else {
    const rpcUrl = process.env.RPC_URL || 'http://localhost:8545';
    const chainId = process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID, 10) : undefined;
    provider = new ethers.providers.JsonRpcProvider(rpcUrl, chainId);
  }

  return provider;
};

export const getSigner = async (account) => {
  const prov = getProvider();
  if (typeof window !== 'undefined' && window.ethereum) {
    await prov.send('eth_requestAccounts', []);
  }
  return prov.getSigner(account);
};

export default {
  getProvider,
  getSigner,
};
