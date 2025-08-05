import aiService from '../services/aiService';
import { setRecommendations, setProposals, setStatus } from './aiSlice';
import { setTasks, setCurrentTask, fetchTaskMetrics } from './taskSlice';

const aiMiddleware = (store) => (next) => async (action) => {
  const result = next(action);

  if (
    setTasks.match(action) ||
    setCurrentTask.match(action) ||
    fetchTaskMetrics.fulfilled.match(action)
  ) {
    const { tasks, currentTask, metrics } = store.getState().task;

    try {
      const response = await aiService.proposeTasks({ tasks, currentTask, metrics });

      if (response?.recommendations) {
        store.dispatch(setRecommendations(response.recommendations));
      }
      if (response?.proposals) {
        store.dispatch(setProposals(response.proposals));
      }
      if (response?.status) {
        store.dispatch(setStatus(response.status));
      }
    } catch (err) {
      console.error('AI service call failed', err);
    }
  }

  return result;
};

export default aiMiddleware;
