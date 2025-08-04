import { configureStore } from '@reduxjs/toolkit';
import gtReducer from './gtSlice';
import taskReducer from './taskSlice';
import aiReducer from './aiSlice';

export const store = configureStore({
  reducer: {
    gt: gtReducer,
    task: taskReducer,
    ai: aiReducer,
  },
});
