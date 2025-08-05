import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import aiService from '../../services/aiService';
import { fetchTaskMetrics } from '../../store/taskSlice';
import Loader from '../../components/Loader';
import { useToast } from '../../components/ToastProvider';
import './TaskManager.css';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { showError } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const factionData = { factionId: '12345' }; // Replace with actual faction data
        const response = await aiService.proposeTasks(factionData);
        setTasks(response.choices[0].message.content.split('\n').filter(task => task));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        showError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    dispatch(fetchTaskMetrics(1));
  }, [dispatch]);

  const handleTaskCompletion = (task: string) => {
    // Handle task completion logic here
    console.log(`Task completed: ${task}`);
  };

  if (loading) {
    return <Loader message="Loading tasks..." />;
  }

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleTaskCompletion(task)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;

