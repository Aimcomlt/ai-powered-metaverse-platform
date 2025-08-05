import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TaskMetrics } from '../contracts/types';

interface TaskState {
  tasks: any[];
  currentTask: any;
  metrics: Record<number, TaskMetrics>;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  metrics: {},
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<any[]>) {
      state.tasks = action.payload;
    },
    setCurrentTask(state, action: PayloadAction<any>) {
      state.currentTask = action.payload;
    },
    updateMetrics(state, action: PayloadAction<{ taskId: number; metrics: TaskMetrics }>) {
      const { taskId, metrics } = action.payload;
      state.metrics[taskId] = metrics;
    },
  },
});

export const { setTasks, setCurrentTask, updateMetrics } = taskSlice.actions;
export default taskSlice.reducer;

