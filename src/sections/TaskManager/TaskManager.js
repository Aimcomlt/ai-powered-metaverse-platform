import React, { useEffect, useState } from 'react';
import aiService from '../../services/aiService';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleTaskCompletion = (task) => {
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
