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

export const initEventListeners = (dispatch: Dispatch) => {
  const provider = getProvider();

  const governanceToken = new GovernanceToken(
    process.env.REACT_APP_GOVERNANCE_TOKEN_ADDRESS ||
      process.env.GOVERNANCE_TOKEN_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const functionalToken = new FunctionalToken(
    process.env.REACT_APP_FUNCTIONAL_TOKEN_ADDRESS ||
      process.env.FUNCTIONAL_TOKEN_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const mpnsRegistry = new MpNSRegistry(
    process.env.REACT_APP_MPNS_REGISTRY_ADDRESS ||
      process.env.MPNS_REGISTRY_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const crossFactionHub = new CrossFactionHub(
    process.env.REACT_APP_CROSS_FACTION_HUB_ADDRESS ||
      process.env.CROSS_FACTION_HUB_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const gtStaking = new GTStaking(
    process.env.REACT_APP_GT_STAKING_ADDRESS ||
      process.env.GT_STAKING_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const houseOfTheLaw = new HouseOfTheLaw(
    process.env.REACT_APP_HOUSE_OF_THE_LAW_ADDRESS ||
      process.env.HOUSE_OF_THE_LAW_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const proofOfObservation = new ProofOfObservation(
    process.env.REACT_APP_PROOF_OF_OBSERVATION_ADDRESS ||
      process.env.PROOF_OF_OBSERVATION_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const pooTaskFlow = new PoO_TaskFlow(
    process.env.REACT_APP_POO_TASK_FLOW_ADDRESS ||
      process.env.POO_TASK_FLOW_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const genesisBlockFaction = new GenesisBlockFaction(
    process.env.REACT_APP_GENESIS_BLOCK_FACTION_ADDRESS ||
      process.env.GENESIS_BLOCK_FACTION_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
    provider,
  );
  const genesisBlockFactory = new GenesisBlockFactory(
    process.env.REACT_APP_GENESIS_BLOCK_FACTORY_ADDRESS ||
      process.env.GENESIS_BLOCK_FACTORY_ADDRESS ||
      '0x0000000000000000000000000000000000000000',
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
