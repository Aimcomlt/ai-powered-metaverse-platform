import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recommendations: [],
  proposals: [],
  taskObservations: [],
  status: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setRecommendations(state, action) {
      state.recommendations = action.payload;
    },
    setProposals(state, action) {
      state.proposals = action.payload;
    },
    setTaskObservations(state, action) {
      state.taskObservations = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  setRecommendations,
  setProposals,
  setTaskObservations,
  setStatus,
} = aiSlice.actions;
export default aiSlice.reducer;
