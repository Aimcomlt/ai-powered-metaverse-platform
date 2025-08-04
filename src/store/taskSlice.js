import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  currentTask: null,
  metrics: {},
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
    updateMetrics(state, action) {
      const { taskId, demand, supply } = action.payload;
      state.metrics[taskId] = { demand, supply };
    },
  },
});

export const { setTasks, setCurrentTask, updateMetrics } = taskSlice.actions;
export default taskSlice.reducer;
