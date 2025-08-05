import { useCallback } from 'react';
import loadContract, { ContractName } from '../contracts/loadContract';
import { getSigner } from '../services/provider';

export const useContract = (name: ContractName, account?: string) =>
  useCallback(async () => {
    const signer = account ? await getSigner(account) : undefined;
    return loadContract(name, signer);
  }, [name, account]);

export default useContract;
