import React, { useEffect, useState } from 'react';
import useMpns from '../../hooks/useMpns';
import useGptRecommendation from '../../hooks/useGptRecommendation';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import AlertMessage from '../../components/shared/AlertMessage';

interface Task {
  title?: string;
  [key: string]: any;
}

const HouseOfCodeTasks: React.FC = () => {
  const { result, status: mpnsStatus, resolve } = useMpns(
    'houseOfCode.tasks.level1.mpns',
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksStatus, setTasksStatus] = useState<
    'idle' | 'loading' | 'ready' | 'error'
  >('idle');
  const [tasksError, setTasksError] = useState('');
  const { suggestions, status: suggestionStatus, refresh } = useGptRecommendation(
    'houseOfCode.rules.mpns',
    'user.level.mpns',
  );

  const loadTasks = async () => {
    if (result.type === 'ipfs' && result.value) {
      let url = result.value;
      if (url.startsWith('ipfs://')) {
        url = `https://ipfs.io/ipfs/${url.slice(7)}`;
      }
      setTasksStatus('loading');
      setTasksError('');
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }
        setTasksStatus('ready');
      } catch (err) {
        console.error('Failed to load tasks', err);
        setTasksStatus('error');
        setTasksError('Failed to load tasks.');
      }
    }
  };

  useEffect(() => {
    if (result.type === 'ipfs') {
      loadTasks();
    }
  }, [result]);

  return (
    <div className="flex p-4">
      <div className="flex-1 pr-4">
        <h1 className="text-2xl font-bold mb-4">House of Code Tasks</h1>
        {(mpnsStatus === 'loading' || tasksStatus === 'loading') && (
          <LoadingSpinner size="md" text="Loading tasks..." />
        )}
        {mpnsStatus === 'error' && (
          <AlertMessage
            type="error"
            message="Failed to resolve tasks location."
            onRetry={() => resolve('houseOfCode.tasks.level1.mpns')}
          />
        )}
        {tasksStatus === 'error' && (
          <AlertMessage
            type="error"
            message={tasksError || 'Failed to load tasks.'}
            onRetry={loadTasks}
          />
        )}
        {tasksStatus === 'ready' && tasks.length === 0 && (
          <div>No tasks found.</div>
        )}
        {tasksStatus === 'ready' && tasks.length > 0 && (
          <ul className="list-disc pl-5 space-y-2">
            {tasks.map((task, idx) => (
              <li key={idx}>{task.title || `Task ${idx + 1}`}</li>
            ))}
          </ul>
        )}
      </div>
      <aside className="w-64 border-l pl-4">
        <h2 className="text-xl font-bold mb-2">AI Suggestions</h2>
        {suggestionStatus === 'loading' && (
          <LoadingSpinner size="sm" text="Loading suggestions..." />
        )}
        {suggestionStatus === 'error' && (
          <AlertMessage
            type="error"
            message="Failed to load suggestions."
            onRetry={refresh}
          />
        )}
        {suggestionStatus === 'ready' && suggestions.length === 0 && (
          <div>No suggestions available.</div>
        )}
        {suggestions.length > 0 && (
          <ul className="list-disc pl-5 space-y-2">
            {suggestions.map((s, i) => (
              <li key={i}>{s.title || JSON.stringify(s)}</li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default HouseOfCodeTasks;

