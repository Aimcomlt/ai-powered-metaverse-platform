import { Dispatch } from '@reduxjs/toolkit';
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
} from '../contracts';
import { getProvider } from './provider';
import { resolveMpnsName } from './mpns';
import {
  addGovernanceTokenEvent,
  addFunctionalTokenEvent,
  addMpnsRegistryEvent,
  addCrossFactionHubEvent,
  addGtStakingEvent,
  addHouseOfTheLawEvent,
  addProofOfObservationEvent,
  addPooTaskFlowEvent,
  addGenesisBlockFactionEvent,
  addGenesisBlockFactoryEvent,
} from '../store/eventSlices';

// Utility to serialize BigNumber/BigInt for Redux state
const serialize = (value: any): any => {
  if (typeof value === 'bigint') return value.toString();
  if (value && typeof value === 'object' && 'toString' in value) {
    try {
      return (value as any).toString();
    } catch {
      return value;
    }
  }
  return value;
};

const attachListeners = (
  contract: any,
  dispatch: Dispatch,
  adder: (payload: any) => any,
) => {
  Object.keys(contract.interface.events).forEach((eventName) => {
    contract.on(eventName, (...args: any[]) => {
      const event = args[args.length - 1];
      const parsedArgs = (event.args || []).map(serialize);
      dispatch(
        adder({
          name: event.event || eventName,
          args: parsedArgs,
          transactionHash: event.transactionHash,
        }),
      );
    });
  });
};

export const initEventListeners = async (dispatch: Dispatch) => {
  const provider = getProvider();

  const getAddress = async (mpns: string, envKey: string) => {
    const env =
      process.env[`REACT_APP_${envKey}_ADDRESS`] ||
      process.env[`${envKey}_ADDRESS`];
    if (env) return env;
    const res = await resolveMpnsName(mpns, provider);
    return res.value || '0x0000000000000000000000000000000000000000';
  };

  const governanceToken = new GovernanceToken(
    await getAddress('governance-token.mpns', 'GOVERNANCE_TOKEN'),
    provider,
  );
  const functionalToken = new FunctionalToken(
    await getAddress('functional-token.mpns', 'FUNCTIONAL_TOKEN'),
    provider,
  );
  const mpnsRegistry = new MpNSRegistry(
    await getAddress('mpns-registry.mpns', 'MPNS_REGISTRY'),
    provider,
  );
  const crossFactionHub = new CrossFactionHub(
    await getAddress('cross-faction-hub.mpns', 'CROSS_FACTION_HUB'),
    provider,
  );
  const gtStaking = new GTStaking(
    await getAddress('gt-staking.mpns', 'GT_STAKING'),
    provider,
  );
  const houseOfTheLaw = new HouseOfTheLaw(
    await getAddress('house-of-the-law.mpns', 'HOUSE_OF_THE_LAW'),
    provider,
  );
  const proofOfObservation = new ProofOfObservation(
    await getAddress('proof-of-observation.mpns', 'PROOF_OF_OBSERVATION'),
    provider,
  );
  const pooTaskFlow = new PoO_TaskFlow(
    await getAddress('poo-task-flow.mpns', 'POO_TASK_FLOW'),
    provider,
  );
  const genesisBlockFaction = new GenesisBlockFaction(
    await getAddress('genesis-block-faction.mpns', 'GENESIS_BLOCK_FACTION'),
    provider,
  );
  const genesisBlockFactory = new GenesisBlockFactory(
    await getAddress('genesis-block-factory.mpns', 'GENESIS_BLOCK_FACTORY'),
    provider,
  );

  attachListeners(governanceToken, dispatch, addGovernanceTokenEvent);
  attachListeners(functionalToken, dispatch, addFunctionalTokenEvent);
  attachListeners(mpnsRegistry, dispatch, addMpnsRegistryEvent);
  attachListeners(crossFactionHub, dispatch, addCrossFactionHubEvent);
  attachListeners(gtStaking, dispatch, addGtStakingEvent);
  attachListeners(houseOfTheLaw, dispatch, addHouseOfTheLawEvent);
  attachListeners(proofOfObservation, dispatch, addProofOfObservationEvent);
  attachListeners(pooTaskFlow, dispatch, addPooTaskFlowEvent);
  attachListeners(genesisBlockFaction, dispatch, addGenesisBlockFactionEvent);
  attachListeners(genesisBlockFactory, dispatch, addGenesisBlockFactoryEvent);
};

export default { initEventListeners };
