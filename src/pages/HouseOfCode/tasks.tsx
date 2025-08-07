import React, { useEffect, useState } from 'react';
import useMpns from '../../hooks/useMpns';

interface Task {
  title?: string;
  [key: string]: any;
}

const HouseOfCodeTasks: React.FC = () => {
  const { result } = useMpns('houseOfCode.tasks.level1.mpns');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const load = async () => {
      if (result.type === 'ipfs' && result.value) {
        let url = result.value;
        if (url.startsWith('ipfs://')) {
          url = `https://ipfs.io/ipfs/${url.slice(7)}`;
        }
        try {
          const resp = await fetch(url);
          const data = await resp.json();
          if (Array.isArray(data)) {
            setTasks(data);
          } else if (Array.isArray(data.tasks)) {
            setTasks(data.tasks);
          }
        } catch (err) {
          console.error('Failed to load tasks', err);
        }
      }
    };
    load();
  }, [result]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">House of Code Tasks</h1>
      {tasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {tasks.map((task, idx) => (
            <li key={idx}>{task.title || `Task ${idx + 1}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HouseOfCodeTasks;

