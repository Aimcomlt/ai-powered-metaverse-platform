import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskMetrics, setCurrentTask } from '../../store/taskSlice';
import taskService from '../../services/taskService';
import usePoOFlow from '../../hooks/usePoOFlow';
import useGtValidation from '../../hooks/useGtValidation';
import TaskMetricsCard from './TaskMetricsCard';

interface Task {
  id: number;
  title?: string;
  [key: string]: any;
}

interface TaskBrowserProps {
  userAddress: string;
}

const TaskBrowser: React.FC<TaskBrowserProps> = ({ userAddress }) => {
  const hasGt = useGtValidation(1);
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector((state: any) => state.task.tasks);
  const metrics = useSelector((state: any) => state.task.metrics);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const { rewardAfterTask, loading: rewarding } = usePoOFlow(userAddress);

  useEffect(() => {
    if (!hasGt) return;
    tasks.forEach((task) => {
      if (!metrics[task.id]) {
        dispatch(fetchTaskMetrics(task.id));
      }
    });
  }, [tasks, metrics, dispatch, hasGt]);

  useEffect(() => {
    if (!hasGt) return;
    // Example placeholder to show how a service could fetch tasks
    // Real implementation would call an API or contract here
    if (!tasks || tasks.length === 0) {
      (async () => {
        try {
          await taskService.getGTStaking();
        } catch (err) {
          console.error('Failed to initialize task service', err);
        }
      })();
    }
  }, [tasks, hasGt]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return completed.has(task.id);
    if (filter === 'pending') return !completed.has(task.id);
    return true;
  });

  const handleComplete = async (task: Task) => {
    try {
      dispatch(setCurrentTask(task));
      await rewardAfterTask({
        user: userAddress,
        tokenId: 0n,
        taskId: BigInt(task.id),
        ftId: 0n,
        ftAmount: 1n,
        moderationPassed: true,
        uniqueSubmission: true,
      });
      setCompleted((prev) => new Set(prev).add(task.id));
    } catch (err) {
      console.error('Reward failed', err);
    }
  };

  if (!hasGt) {
    return (
      <div className="p-4 text-gray-500">
        Governance token balance required to access tasks.
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>
      {filteredTasks.length === 0 ? (
        <div className="text-gray-500">No tasks available.</div>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <div className="flex-1 mr-4">
                <h3 className="font-semibold mb-2">
                  {task.title || `Task #${task.id}`}
                </h3>
                {metrics[task.id] && (
                  <TaskMetricsCard
                    progress={Number((metrics[task.id] as any).progress ?? (metrics[task.id] as any).demand ?? 0)}
                    reward={Number((metrics[task.id] as any).reward ?? (metrics[task.id] as any).supply ?? 0)}
                  />
                )}
              </div>
              {!completed.has(task.id) && (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleComplete(task)}
                  disabled={rewarding}
                >
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskBrowser;

