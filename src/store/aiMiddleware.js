import aiService from '../services/aiService';
import {
  setRecommendations,
  setProposals,
  setTaskObservations,
  setStatus,
} from './aiSlice';
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
      const proposals = await aiService.recommendProposals({
        tasks,
        currentTask,
        metrics,
      });
      if (proposals?.proposals) {
        store.dispatch(setProposals(proposals.proposals));
      }

      const status = await aiService.observeTaskStatus({ currentTask, metrics });
      if (status?.observations) {
        store.dispatch(setTaskObservations(status.observations));
      }
      if (status?.status) {
        store.dispatch(setStatus(status.status));
      }

      const recommendations = await aiService.proposeTasks({
        tasks,
        currentTask,
        metrics,
      });
      if (recommendations?.recommendations) {
        store.dispatch(setRecommendations(recommendations.recommendations));
      }
    } catch (err) {
      console.error('AI service call failed', err);
    }
  }

  return result;
};

export default aiMiddleware;
