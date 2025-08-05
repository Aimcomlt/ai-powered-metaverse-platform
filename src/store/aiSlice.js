import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recommendations: [],
  proposals: [],
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
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setRecommendations, setProposals, setStatus } = aiSlice.actions;
export default aiSlice.reducer;
