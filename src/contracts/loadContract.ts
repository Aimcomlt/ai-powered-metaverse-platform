import { Contract, Signer, providers, ethers } from 'ethers';
import addresses from './metadata/addresses.json';
import GovernanceToken from './metadata/GovernanceToken.json';

type AddressBook = Record<string, Record<string, string>>;
const abis: Record<string, any> = {
  GovernanceToken: GovernanceToken.abi
};

export async function loadContract(
  name: keyof typeof abis,
  signerOrProvider: Signer | providers.Provider
): Promise<Contract> {
  const network = await (signerOrProvider instanceof Signer
    ? signerOrProvider.provider!.getNetwork()
    : signerOrProvider.getNetwork());

  const address = (addresses as AddressBook)[network.name]?.[name as string];
  if (!address) {
    throw new Error(`Address for ${String(name)} on network ${network.name} not found`);
  }

  const abi = abis[name as string];
  return new ethers.Contract(address, abi, signerOrProvider);
}

export default loadContract;
