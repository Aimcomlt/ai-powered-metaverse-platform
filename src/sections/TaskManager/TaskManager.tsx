import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import aiService from '../../services/aiService';
import { GTStaking } from '../../contracts';
import type { TaskMetrics } from '../../contracts/types';
import { updateMetrics } from '../../store/taskSlice';
import './TaskManager.css';

const STAKING_ADDRESS = '0x0000000000000000000000000000000000000000';

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
    const fetchMetrics = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
        const staking = new GTStaking(STAKING_ADDRESS, provider);
        const metrics = await staking.taskMetrics(1n) as TaskMetrics;
        dispatch(updateMetrics({ taskId: 1, metrics }));
      } catch (error) {
        console.error('Error fetching task metrics:', error);
      }
    };

    fetchMetrics();
  }, [dispatch]);

  const handleTaskCompletion = (task: string) => {
    // Handle task completion logic here
    console.log(`Task completed: ${task}`);
  };

  if (loading) {
    return <div>Loading tasks...</div>;
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

