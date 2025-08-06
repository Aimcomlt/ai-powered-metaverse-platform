import React from 'react';

interface TaskMetricsCardProps {
  progress: number;
  reward: number | string;
}

const TaskMetricsCard: React.FC<TaskMetricsCardProps> = ({ progress, reward }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  return (
    <div className="p-2 border rounded bg-white shadow-sm">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-semibold">Progress</span>
        <span className="text-xs">{clampedProgress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-2 mb-2">
        <div
          className="bg-green-500 h-2 rounded"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold">Reward</span>
        <span>{reward}</span>
      </div>
    </div>
  );
};

export default TaskMetricsCard;
