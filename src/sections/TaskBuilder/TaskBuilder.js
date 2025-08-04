import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stakeGT } from '../../store/gtSlice';
import './TaskBuilder.css';

const TaskBuilder = () => {
  const staked = useSelector((state) => state.gt.staked[0] || 0);
  const dispatch = useDispatch();

  const handleStake = () => {
    dispatch(stakeGT({ id: 0, amount: 1 }));
  };

  if (staked > 0) {
    return (
      <div className="task-builder">
        <h2>Task Builder</h2>
        <p>Builder unlocked. This is a placeholder for the AI-powered UI.</p>
      </div>
    );
  }

  return (
    <div className="task-builder">
      <h2>Stake GT to Build a Task</h2>
      <button onClick={handleStake}>Stake 1 GT</button>
    </div>
  );
};

export default TaskBuilder;
