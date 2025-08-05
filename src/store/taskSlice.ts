import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { TaskMetrics } from '../contracts/types';
import { getTaskMetrics } from '../services/taskService';

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

export const fetchTaskMetrics = createAsyncThunk(
  'task/fetchMetrics',
  async (taskId: number) => {
    const metrics = await getTaskMetrics(taskId);
    return { taskId, metrics };
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaskMetrics.fulfilled, (state, action) => {
      const { taskId, metrics } = action.payload;
      state.metrics[taskId] = metrics;
    });
  },
});

export const { setTasks, setCurrentTask } = taskSlice.actions;
export default taskSlice.reducer;
