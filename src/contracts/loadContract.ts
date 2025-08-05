import { Signer, providers } from 'ethers';
import addressesJson from './metadata/addresses.json';
import {
  GovernanceToken,
  FunctionalToken,
  MpNSRegistry,
  CrossFactionHub,
  GTStaking,
  HouseOfTheLaw,
  ProofOfObservation,
  PoO_TaskFlow,
  GenesisBlockFaction,
  GenesisBlockFactory,
} from './metaverse';
import { getProvider } from '../services/provider';

type AddressBook = Record<string, Record<string, string>>;
const addressBook: AddressBook = addressesJson as AddressBook;

const contracts = {
  GovernanceToken,
  FunctionalToken,
  MpNSRegistry,
  CrossFactionHub,
  GTStaking,
  HouseOfTheLaw,
  ProofOfObservation,
  PoO_TaskFlow,
  GenesisBlockFaction,
  GenesisBlockFactory,
};

export type ContractName = keyof typeof contracts;
const envKeys: Record<ContractName, string> = {
  GovernanceToken: 'GOVERNANCE_TOKEN',
  FunctionalToken: 'FUNCTIONAL_TOKEN',
  MpNSRegistry: 'MPNS_REGISTRY',
  CrossFactionHub: 'CROSS_FACTION_HUB',
  GTStaking: 'GT_STAKING',
  HouseOfTheLaw: 'HOUSE_OF_THE_LAW',
  ProofOfObservation: 'PROOF_OF_OBSERVATION',
  PoO_TaskFlow: 'POO_TASK_FLOW',
  GenesisBlockFaction: 'GENESIS_BLOCK_FACTION',
  GenesisBlockFactory: 'GENESIS_BLOCK_FACTORY',
};

const registerAddress = (network: string, name: string, address: string) => {
  addressBook[network] ??= {};
  addressBook[network][name] = address;
};

async function resolveAddress(
  name: ContractName,
  provider: providers.Provider,
): Promise<string> {
  const network = await provider.getNetwork();
  const cached = addressBook[network.name]?.[name];
  if (cached) return cached;

  const key = envKeys[name];
  const fromEnv =
    process.env[`REACT_APP_${key}_ADDRESS`] || process.env[`${key}_ADDRESS`];
  if (fromEnv) {
    registerAddress(network.name, name, fromEnv);
    return fromEnv;
  }

  const mpnsAddr =
    process.env.REACT_APP_MPNS_REGISTRY_ADDRESS ||
    process.env.MPNS_REGISTRY_ADDRESS;
  if (mpnsAddr) {
    const mpns = new MpNSRegistry(mpnsAddr, provider);
    try {
      const uri = await mpns.nameToUri(name);
      const match = uri.match(/0x[a-fA-F0-9]{40}/);
      if (match) {
        registerAddress(network.name, name, match[0]);
        return match[0];
      }
    } catch {
      /* ignore lookup errors */
    }
  }

  throw new Error(
    `Address for ${String(name)} on network ${network.name} not found`,
  );
}

export async function loadContract(
  name: ContractName,
  signer?: Signer,
): Promise<any> {
  const provider = signer?.provider ?? getProvider();
  const address = await resolveAddress(name, provider);
  const ContractCtor = contracts[name];
  return new ContractCtor(address, signer ?? provider);
}

export default loadContract;
