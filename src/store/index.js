import { configureStore } from '@reduxjs/toolkit';
import gtReducer from './gtSlice';
import taskReducer from './taskSlice';
import aiReducer from './aiSlice';
import {
  governanceTokenEventsReducer,
  functionalTokenEventsReducer,
  mpnsRegistryEventsReducer,
  crossFactionHubEventsReducer,
  gtStakingEventsReducer,
  houseOfTheLawEventsReducer,
  proofOfObservationEventsReducer,
  pooTaskFlowEventsReducer,
  genesisBlockFactionEventsReducer,
  genesisBlockFactoryEventsReducer,
} from './eventSlices';

export const store = configureStore({
  reducer: {
    gt: gtReducer,
    task: taskReducer,
    ai: aiReducer,
    governanceTokenEvents: governanceTokenEventsReducer,
    functionalTokenEvents: functionalTokenEventsReducer,
    mpnsRegistryEvents: mpnsRegistryEventsReducer,
    crossFactionHubEvents: crossFactionHubEventsReducer,
    gtStakingEvents: gtStakingEventsReducer,
    houseOfTheLawEvents: houseOfTheLawEventsReducer,
    proofOfObservationEvents: proofOfObservationEventsReducer,
    pooTaskFlowEvents: pooTaskFlowEventsReducer,
    genesisBlockFactionEvents: genesisBlockFactionEventsReducer,
    genesisBlockFactoryEvents: genesisBlockFactoryEventsReducer,
  },
});
