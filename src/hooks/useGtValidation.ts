import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import useMpns from './useMpns';
import { getProvider } from '../services/provider';

/**
 * Hook to validate that the connected wallet holds a minimum amount of
 * governance tokens. The governance token contract address is resolved via
 * MpNS using the name `houseOfCode.token.governance.mpns`.
 *
 * @param minGtBalance Minimum governance token balance required
 * @returns boolean indicating whether the wallet satisfies the requirement
 */
export const useGtValidation = (minGtBalance: number | bigint = 1) => {
  const address = useSelector((state: any) => state.wallet?.address);
  const { result } = useMpns('houseOfCode.token.governance.mpns');
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkBalance = async () => {
      if (!address || result.type !== 'contract') {
        setAllowed(false);
        return;
      }
      try {
        const provider = getProvider();
        const contract = new ethers.Contract(
          result.value,
          ['function balanceOf(address owner) view returns (uint256)'],
          provider,
        );
        const balance: ethers.BigNumber = await contract.balanceOf(address);
        const required = ethers.BigNumber.from(minGtBalance);
        setAllowed(balance.gte(required));
      } catch (err) {
        console.error('GT validation failed', err);
        setAllowed(false);
      }
    };
    checkBalance();
  }, [address, result, minGtBalance]);

  return allowed;
};

export default useGtValidation;
