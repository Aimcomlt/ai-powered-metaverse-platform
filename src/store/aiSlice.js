import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recommendations: [],
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setRecommendations(state, action) {
      state.recommendations = action.payload;
    },
  },
});

export const { setRecommendations } = aiSlice.actions;
export default aiSlice.reducer;
