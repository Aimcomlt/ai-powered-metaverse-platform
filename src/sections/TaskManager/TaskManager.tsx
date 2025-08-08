import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import aiService from '../../services/ai';
import { fetchTaskMetrics } from '../../store/taskSlice';
import './TaskManager.css';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const factionData = { factionId: '12345' }; // Replace with actual faction data
        const response = await aiService.proposeTasks(factionData);
        setTasks(response.choices[0].message.content.split('\n').filter(task => task));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
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
      return <div>Loading tasks...</div>;
    }

    return (
      <main id="main-content" tabIndex={-1} className="task-manager">
        <h1>Task Manager</h1>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button type="button" onClick={() => handleTaskCompletion(task)}>Complete</button>
            </li>
          ))}
        </ul>
      </main>
    );
};

export default TaskManager;

