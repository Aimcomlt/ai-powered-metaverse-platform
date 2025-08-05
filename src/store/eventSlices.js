import { createSlice } from '@reduxjs/toolkit';

const createEventSlice = (name) =>
  createSlice({
    name,
    initialState: [],
    reducers: {
      addEvent(state, action) {
        state.push(action.payload);
      },
      clearEvents() {
        return [];
      },
    },
  });

const governanceTokenEvents = createEventSlice('governanceTokenEvents');
const functionalTokenEvents = createEventSlice('functionalTokenEvents');
const mpnsRegistryEvents = createEventSlice('mpnsRegistryEvents');
const crossFactionHubEvents = createEventSlice('crossFactionHubEvents');
const gtStakingEvents = createEventSlice('gtStakingEvents');
const houseOfTheLawEvents = createEventSlice('houseOfTheLawEvents');
const proofOfObservationEvents = createEventSlice('proofOfObservationEvents');
const pooTaskFlowEvents = createEventSlice('pooTaskFlowEvents');
const genesisBlockFactionEvents = createEventSlice('genesisBlockFactionEvents');
const genesisBlockFactoryEvents = createEventSlice('genesisBlockFactoryEvents');

export const {
  addEvent: addGovernanceTokenEvent,
  clearEvents: clearGovernanceTokenEvents,
} = governanceTokenEvents.actions;
export const {
  addEvent: addFunctionalTokenEvent,
  clearEvents: clearFunctionalTokenEvents,
} = functionalTokenEvents.actions;
export const {
  addEvent: addMpnsRegistryEvent,
  clearEvents: clearMpnsRegistryEvents,
} = mpnsRegistryEvents.actions;
export const {
  addEvent: addCrossFactionHubEvent,
  clearEvents: clearCrossFactionHubEvents,
} = crossFactionHubEvents.actions;
export const {
  addEvent: addGtStakingEvent,
  clearEvents: clearGtStakingEvents,
} = gtStakingEvents.actions;
export const {
  addEvent: addHouseOfTheLawEvent,
  clearEvents: clearHouseOfTheLawEvents,
} = houseOfTheLawEvents.actions;
export const {
  addEvent: addProofOfObservationEvent,
  clearEvents: clearProofOfObservationEvents,
} = proofOfObservationEvents.actions;
export const {
  addEvent: addPooTaskFlowEvent,
  clearEvents: clearPooTaskFlowEvents,
} = pooTaskFlowEvents.actions;
export const {
  addEvent: addGenesisBlockFactionEvent,
  clearEvents: clearGenesisBlockFactionEvents,
} = genesisBlockFactionEvents.actions;
export const {
  addEvent: addGenesisBlockFactoryEvent,
  clearEvents: clearGenesisBlockFactoryEvents,
} = genesisBlockFactoryEvents.actions;

export const governanceTokenEventsReducer = governanceTokenEvents.reducer;
export const functionalTokenEventsReducer = functionalTokenEvents.reducer;
export const mpnsRegistryEventsReducer = mpnsRegistryEvents.reducer;
export const crossFactionHubEventsReducer = crossFactionHubEvents.reducer;
export const gtStakingEventsReducer = gtStakingEvents.reducer;
export const houseOfTheLawEventsReducer = houseOfTheLawEvents.reducer;
export const proofOfObservationEventsReducer = proofOfObservationEvents.reducer;
export const pooTaskFlowEventsReducer = pooTaskFlowEvents.reducer;
export const genesisBlockFactionEventsReducer = genesisBlockFactionEvents.reducer;
export const genesisBlockFactoryEventsReducer = genesisBlockFactoryEvents.reducer;
