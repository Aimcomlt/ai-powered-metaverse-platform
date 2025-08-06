import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSigner } from '../../services/provider';
import { setAddress } from '../../store/walletSlice';

const ConnectWalletButton: React.FC = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.wallet.address);

  const connectWallet = async () => {
    try {
      const signer = await getSigner();
      const addr = await signer.getAddress();
      dispatch(setAddress(addr));
    } catch (err) {
      console.error('Failed to connect wallet', err);
    }
  };

  if (address) {
    const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <button className="px-4 py-2 bg-green-500 text-white rounded" title={address}>
        {short}
      </button>
    );
  }

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
