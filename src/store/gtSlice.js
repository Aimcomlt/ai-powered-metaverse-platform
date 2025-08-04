import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  factionId: null,
  level: null,
  balance: 0,
  staked: {},
};

const gtSlice = createSlice({
  name: 'gt',
  initialState,
  reducers: {
    setProfile(state, action) {
      const { factionId, level } = action.payload;
      state.factionId = factionId;
      state.level = level;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    },
    stakeGT(state, action) {
      const { id, amount } = action.payload;
      state.balance -= amount;
      state.staked[id] = (state.staked[id] || 0) + amount;
    },
    unstakeGT(state, action) {
      const { id, amount } = action.payload;
      state.staked[id] = Math.max((state.staked[id] || 0) - amount, 0);
      state.balance += amount;
    },
  },
});

export const { setProfile, setBalance, stakeGT, unstakeGT } = gtSlice.actions;
export default gtSlice.reducer;
